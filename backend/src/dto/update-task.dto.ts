import {
  IsString,
  IsOptional,
  Length,
  IsDateString,
  IsIn,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @Length(1, 200, { message: 'Title must be between 1 and 200 characters' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'], {
    message: 'Status must be: pending, in-progress, or completed',
  })
  status: string;

  @IsDateString({}, { message: 'Deadline must be a valid date (YYYY-MM-DD)' })
  @IsOptional()
  deadline: string;
}
