import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class AssignTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @Length(1, 200, { message: 'Title must be between 1 and 200 characters' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString({}, { message: 'Deadline must be a valid date (YYYY-MM-DD)' })
  @IsOptional()
  deadline: string;
}
