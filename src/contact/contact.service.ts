import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

@Injectable()
export class ContactService {
  constructor( @InjectModel(Contact.name) private contactModel: Model<Contact> ){}

  async create(createContactDto: CreateContactDto, hashPassword = false): Promise<Contact> {
    const createObj = {...createContactDto} ;
    if(createObj.password && hashPassword){
      const hashedPassword = await this.hashData(createObj.password);
      createObj['password'] = hashedPassword;
    }
    const contact = await this.contactModel.create(createObj);
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

  async findByEmail(emailDto: { email: string }): Promise<Contact> {
    const contact = this.contactModel.findOne({ email: emailDto.email });
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const updateObj = {...updateContactDto};
    if('password' in updateObj){
      const hashedPassword = await this.hashData(updateObj['password']);
      updateObj['password'] = hashedPassword;
    }
    const updatedUser = await this.contactModel.findByIdAndUpdate(id, updateObj);
    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.contactModel.findByIdAndDelete(id);
    return removedUser;
  }

  async hashData(data: string){
    return argon2.hash(data);
}
}
