import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor( @InjectModel(Contact.name) private contactModel: Model<Contact> ){}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const { name, phone } = createContactDto; 
    const contact = await this.contactModel.create({name, phone});
    return contact;
  }

  async findAll(): Promise<Contact[]> {
    const contacts = await this.contactModel.find({});
    return contacts;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id);
    if(!contact){
      throw new NotFoundException("Contact not found");
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const updateObj = {...updateContactDto};
    const updatedUser = await this.contactModel.findByIdAndUpdate(id, updateObj);
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
