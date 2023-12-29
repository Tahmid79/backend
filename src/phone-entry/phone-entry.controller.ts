import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PhoneEntryService } from './phone-entry.service';
import { CreatePhoneEntryDto } from './dto/create-phone-entry.dto';
import { UpdatePhoneEntryDto } from './dto/update-phone-entry.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';

@Controller('phone-entry')
export class PhoneEntryController {
  constructor(private readonly phoneEntryService: PhoneEntryService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req: Request, @Body() createPhoneEntryDto: CreatePhoneEntryDto) {
    const userId = req.user['sub'] ;
    return this.phoneEntryService.create(createPhoneEntryDto, userId);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user['sub'] ;
    return this.phoneEntryService.findAll(userId);
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
