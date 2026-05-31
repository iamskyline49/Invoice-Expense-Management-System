import {
  IsNotEmpty,
  Matches,
  IsUrl,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class ProfileDetailsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[^0-9]*$/, {
    message: 'Name should not contain numbers',
  })
  @MaxLength(96)
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(32)
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {},
    {
      message: 'Must be a valid email address',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Current password is required',
  })
  currentPassword: string;

  @IsOptional()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(14, {
    message: 'Password must be at most 14 characters long',
  })
  @Matches(/[@#$&]/, {
    message:
      'Password must contain at least one special character (@, #, $, &)',
  })
  newPassword?: string;

  @IsNotEmpty({
    message: 'Social link is required',
  })
  @IsUrl(
    {},
    {
      message: 'Must be a valid URL like https://example.com',
    },
  )
  socialLink: string;
}
