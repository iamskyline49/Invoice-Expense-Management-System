import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ManagerService } from './manager.service';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { ProfileDetailsDto } from '../dto/profile_details.dto';

import { ManageEmployeeDto } from '../dto/create-employee.dto';

import { AssignTaskDto } from '../dto/assign-task.dto';

import { UpdateTaskDto } from '../dto/update-task.dto';

import { SalaryDto } from '../dto/salary.dto';

import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('public/employee/:username')
  publicEmployee(@Param('username') username: string) {
    return this.managerService.findEmployeeByUsername(username);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return this.managerService.getProfile();
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Body() dto: ProfileDetailsDto) {
    return this.managerService.updateProfile(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('employees')
  viewAllEmployees() {
    return this.managerService.viewAllEmployees();
  }

  @UseGuards(JwtAuthGuard)
  @Post('employee')
  createEmployee(@Body() dto: ManageEmployeeDto) {
    return this.managerService.createEmployee(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/search')
  searchEmployees(@Query('name') name: string) {
    return this.managerService.searchEmployees(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/:username')
  findEmployee(@Param('username') username: string) {
    return this.managerService.findEmployeeByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('employee/:username')
  deleteEmployee(@Param('username') username: string) {
    return this.managerService.removeEmployeeByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:username')
  updateEmployee(
    @Param('username') username: string,

    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.managerService.updateEmployee(username, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('employee/:username/task')
  assignTask(
    @Param('username') username: string,

    @Body() dto: AssignTaskDto,
  ) {
    return this.managerService.assignTask(username, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/:username/tasks')
  viewEmployeeTasks(@Param('username') username: string) {
    return this.managerService.viewEmployeeTasks(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('task/:taskId')
  updateTask(
    @Param('taskId', ParseIntPipe)
    taskId: number,

    @Body() dto: UpdateTaskDto,
  ) {
    return this.managerService.updateTask(taskId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/:username/activity')
  viewEmployeeActivity(@Param('username') username: string) {
    return this.managerService.viewEmployeeActivity(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:username/salary/increment')
  incrementSalary(
    @Param('username') username: string,

    @Body() dto: SalaryDto,
  ) {
    return this.managerService.incrementSalary(username, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:username/salary/deduct')
  deductSalary(
    @Param('username') username: string,

    @Body() dto: SalaryDto,
  ) {
    return this.managerService.deductSalary(username, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:username/bonus')
  addBonus(
    @Param('username') username: string,

    @Body() dto: SalaryDto,
  ) {
    return this.managerService.addBonus(username, dto);
  }
}
