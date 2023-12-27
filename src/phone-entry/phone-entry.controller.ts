import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhoneEntryService } from './phone-entry.service';
import { CreatePhoneEntryDto } from './dto/create-phone-entry.dto';
import { UpdatePhoneEntryDto } from './dto/update-phone-entry.dto';

@Controller('phone-entry')
export class PhoneEntryController {
  constructor(private readonly phoneEntryService: PhoneEntryService) {}

  @Post()
  create(@Body() createPhoneEntryDto: CreatePhoneEntryDto) {
    return this.phoneEntryService.create(createPhoneEntryDto);
  }

  @Get()
  findAll() {
    return this.phoneEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneEntryDto: UpdatePhoneEntryDto) {
    return this.phoneEntryService.update(+id, updatePhoneEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneEntryService.remove(+id);
  }
}
