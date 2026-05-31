import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SalaryDto {
  @IsNotEmpty({ message: 'Amount is required' })
  @Type(() => Number)             
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;
}
