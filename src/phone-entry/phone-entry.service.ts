import { Injectable } from '@nestjs/common';
import { CreatePhoneEntryDto } from './dto/create-phone-entry.dto';
import { UpdatePhoneEntryDto } from './dto/update-phone-entry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneEntry } from './entities/phone-entry.entity';

@Injectable()
export class PhoneEntryService {

  constructor(@InjectModel(PhoneEntry.name) private phoneEntryModel: Model<PhoneEntry>){}

  async create(createPhoneEntryDto: CreatePhoneEntryDto, userId: string): Promise<PhoneEntry> {
    const newEntryObj = {...createPhoneEntryDto, user : userId};
    const newEntry = await this.phoneEntryModel.create(newEntryObj);
    return newEntry;
  }

  async findAll(userId: string): Promise<PhoneEntry[]> {
    const results: PhoneEntry[]  = await this.phoneEntryModel.find({ user: userId });
    return results;
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
