import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { ProfileDetailsDto } from '../dto/profile_details.dto';
import { ManageEmployeeDto } from '../dto/create-employee.dto';
import { AssignTaskDto } from '../dto/assign-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { SalaryDto } from '../dto/salary.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entity/employee.entity';
import { Task } from '../entity/task.entity';
import { Manager } from '../entity/manager.entity';
import { PusherService } from '../pusher/pusher.service';

const MANAGER_ID = 1;

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,

    private readonly pusherService: PusherService,
  ) {}

  async getProfile() {
    const manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    if (!manager) {
      return {
        message: 'No profile found. Please update your profile first.',
      };
    }

    const { password, ...safeData } = manager;

    return {
      message: 'Manager profile',
      data: safeData,
    };
  }

  async updateProfile(dto: ProfileDetailsDto) {
    let manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    // CREATE PROFILE IF NOT EXISTS
    if (!manager) {
      const hashedPassword = await bcrypt.hash(dto.currentPassword, 10);

      manager = this.managerRepository.create({
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        socialLink: dto.socialLink,
      });
    } else {
      // VERIFY CURRENT PASSWORD
      const passwordMatch = await bcrypt.compare(
        dto.currentPassword,
        manager.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // UPDATE BASIC INFO
      manager.name = dto.name;
      manager.username = dto.username;
      manager.email = dto.email;
      manager.socialLink = dto.socialLink;

      // ONLY UPDATE PASSWORD IF NEW PASSWORD EXISTS
      if (dto.newPassword) {
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

        manager.password = hashedPassword;
      }
    }

    const saved = await this.managerRepository.save(manager);

    const { password, ...safeData } = saved;

    return {
      message: 'Profile updated successfully',
      data: safeData,
    };
  }

  async createEmployee(dto: ManageEmployeeDto) {
    const existingEmployee = await this.employeeRepository.findOne({
      where: {
        username: dto.username,
      },
    });

    if (existingEmployee) {
      throw new BadRequestException(
        `Employee "${dto.username}" already exists`,
      );
    }

    const employee = new Employee();

    employee.username = dto.username;

    employee.fullName = dto.fullName;

    employee.salary = Number(dto.salary);

    employee.bonus = 0;

    employee.isActive = true;

    const savedEmployee = await this.employeeRepository.save(employee);

    return {
      message: `Employee "${savedEmployee.username}" created successfully`,

      data: savedEmployee,
    };
  }

  async viewAllEmployees() {
    const employees = await this.employeeRepository.find({
      relations: ['tasks'],
    });

    return {
      message: 'All employees',
      total: employees.length,
      data: employees,
    };
  }

  async searchEmployees(name: string) {
    if (!name) {
      throw new BadRequestException('Please provide a name to search');
    }

    const employees = await this.employeeRepository.find({
      where: {
        fullName: Like(`%${name}%`),
      },
    });

    return {
      message: `Search results for "${name}"`,
      total: employees.length,
      data: employees,
    };
  }

  async findEmployeeByUsername(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
      relations: ['tasks'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    return {
      message: 'Employee found',
      data: employee,
    };
  }
  async updateEmployee(username: string, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    employee.fullName = dto.fullName;

    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Employee "${username}" updated successfully`,
      data: updated,
    };
  }

  async removeEmployeeByUsername(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    await this.employeeRepository.remove(employee);

    return {
      message: `Employee "${username}" has been deleted`,
    };
  }

  async assignTask(username: string, dto: AssignTaskDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    const manager = await this.managerRepository.findOne({
      where: { id: MANAGER_ID },
    });

    if (!manager) {
      throw new NotFoundException(
        'Manager profile not found. Please update your profile first.',
      );
    }

    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      deadline: dto.deadline,
      employee: employee,
      manager: manager,
    });

    const saved = await this.taskRepository.save(task);
    await this.pusherService.triggerTaskAssigned(username, dto.title);

    return {
      message: `Task "${saved.title}" assigned to ${employee.fullName}`,
      data: {
        ...saved,
        manager: {
          id: manager.id,
          name: manager.name,
        },
        employee: {
          id: employee.id,
          username: employee.username,
          fullName: employee.fullName,
        },
      },
    };
  }
  async viewEmployeeTasks(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
      relations: ['tasks'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    return {
      message: 'Employee tasks',
      total: employee.tasks.length,
      data: employee.tasks,
    };
  }

  async updateTask(taskId: number, dto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['employee'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (dto.title) task.title = dto.title;
    if (dto.description) task.description = dto.description;
    if (dto.status) task.status = dto.status;
    if (dto.deadline) task.deadline = dto.deadline;

    const updated = await this.taskRepository.save(task);

    return {
      message: 'Task updated successfully',
      data: {
        ...updated,
        employee: {
          id: updated.employee.id,
          username: updated.employee.username,
          fullName: updated.employee.fullName,
        },
      },
    };
  }

  async viewEmployeeActivity(username: string) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
      relations: ['tasks'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    const total = employee.tasks.length;

    const completed = employee.tasks.filter(
      (t) => t.status === 'completed',
    ).length;

    const inProgress = employee.tasks.filter(
      (t) => t.status === 'in-progress',
    ).length;

    const pending = employee.tasks.filter((t) => t.status === 'pending').length;

    return {
      message: `Activity report for ${employee.fullName}`,
      data: {
        employee: {
          id: employee.id,
        },
        taskSummary: {
          total,
          completed,
          inProgress,
          pending,
        },
        tasks: employee.tasks,
      },
    };
  }

  async incrementSalary(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    employee.salary = Number(employee.salary) + dto.amount;

    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Salary incremented by ${dto.amount} for ${employee.fullName}`,
      data: {
        username: updated.username,
        newSalary: updated.salary,
      },
    };
  }

  async deductSalary(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    if (Number(employee.salary) < dto.amount) {
      throw new BadRequestException(
        `Cannot deduct ${dto.amount}. Current salary is only ${employee.salary}`,
      );
    }

    employee.salary = Number(employee.salary) - dto.amount;

    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Salary deducted by ${dto.amount} for ${employee.fullName}`,
      data: {
        username: updated.username,
        newSalary: updated.salary,
      },
    };
  }

  async addBonus(username: string, dto: SalaryDto) {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!employee) {
      throw new NotFoundException(`Employee "${username}" not found`);
    }

    employee.bonus = Number(employee.bonus) + dto.amount;

    const updated = await this.employeeRepository.save(employee);

    return {
      message: `Bonus of ${dto.amount} added to ${employee.fullName}`,
      data: {
        username: updated.username,
        totalBonus: updated.bonus,
      },
    };
  }
}
