import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDTO } from '../dto/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(userPayload: CreateUserDTO) {
    const parseAgeToInt = parseInt(userPayload.age.toString());

    if (isNaN(parseAgeToInt)) {
      console.log(`${userPayload.age} is not a number`);
      throw new BadRequestException(
        'Invalid Data Type for property age. Expected Number',
      );
    }

    return { ...userPayload, age: parseAgeToInt };
  }
}
