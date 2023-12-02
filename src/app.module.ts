import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_URI = 'mongodb://127.0.0.1:27017/phonebook-fullstack';

@Module({
  imports: [ContactModule, MongooseModule.forRoot(DB_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
