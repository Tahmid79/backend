import { Injectable } from '@nestjs/common';
import { CreatePhoneEntryDto } from './dto/create-phone-entry.dto';
import { UpdatePhoneEntryDto } from './dto/update-phone-entry.dto';

@Injectable()
export class PhoneEntryService {
  create(createPhoneEntryDto: CreatePhoneEntryDto) {
    return 'This action adds a new phoneEntry';
  }

  findAll() {
    return `This action returns all phoneEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phoneEntry`;
  }

  update(id: number, updatePhoneEntryDto: UpdatePhoneEntryDto) {
    return `This action updates a #${id} phoneEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} phoneEntry`;
  }
}
