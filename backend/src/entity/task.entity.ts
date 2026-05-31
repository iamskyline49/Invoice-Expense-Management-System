import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Manager } from './manager.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  deadline: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Manager, (manager) => manager.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manager_id' })
  manager: Manager;

  @ManyToOne(() => Employee, (employee) => employee.tasks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
