import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneEntryDto } from './create-phone-entry.dto';

export class UpdatePhoneEntryDto extends PartialType(CreatePhoneEntryDto) {}
