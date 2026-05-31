import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('employees')
export class Employee {
  private static counter = 1;

  @PrimaryColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  fullName: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  salary: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  bonus: number;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @BeforeInsert()
  generateId() {
    const number = Employee.counter++;

    if (number < 10) {
      this.id = `emp00${number}`;
    } else if (number < 100) {
      this.id = `emp0${number}`;
    } else {
      this.id = `emp${number}`;
    }
  }
}
