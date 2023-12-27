import { Module } from '@nestjs/common';
import { PhoneEntryService } from './phone-entry.service';
import { PhoneEntryController } from './phone-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneEntrySchema } from './entities/phone-entry.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: 'PhoneEntry', schema: PhoneEntrySchema}])],
  controllers: [PhoneEntryController],
  providers: [PhoneEntryService],
})
export class PhoneEntryModule {}
