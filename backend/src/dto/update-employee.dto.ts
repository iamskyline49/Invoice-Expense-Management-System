import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty({
    message: 'Full name is required',
  })
  @Matches(/^[^0-9]*$/, {
    message: 'Full name should not contain numbers',
  })
  fullName: string;
}
