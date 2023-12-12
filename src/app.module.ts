import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

const DB_URI = 'mongodb://127.0.0.1:27017/phonebook-fullstack';

@Module({
  imports: [ContactModule, MongooseModule.forRoot(DB_URI), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
