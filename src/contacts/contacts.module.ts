import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { info } from './info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact,info])],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports:[ContactsService]
})
export class ContactsModule {}
