import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class ManageEmployeeDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumberString()
  salary: string;
}
