import { PartialType } from '@nestjs/mapped-types';
import { CreatedUserDTO } from './created-user.dto';

export class UpdatedUserDTO extends PartialType(CreatedUserDTO) {}
