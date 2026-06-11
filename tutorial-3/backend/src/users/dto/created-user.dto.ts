import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatedUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name length should be higher than 3' })
  @MaxLength(40, { message: 'Name length should be lower than 40' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password length should be higher than 8' })
  @MaxLength(40, { message: 'Password length should be lower than 40' })
  password: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsOptional()
  @IsEnum([Role.ADMIN, Role.USER], { message: 'Role must be admin or user' })
  role?: Role;
}
