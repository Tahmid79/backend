import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PhoneEntryModule } from './phone-entry/phone-entry.module';
import { ConfigModule } from '@nestjs/config';

// const DB_URI = 'mongodb://127.0.0.1:27017/phonebook-fullstack';

@Module({
  imports: [ConfigModule.forRoot(),ContactModule, MongooseModule.forRoot(process.env.DB_URI), AuthModule, PhoneEntryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
