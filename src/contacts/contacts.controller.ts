import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto/index';
import { Contact } from './contact.entity';
import { addInfoDto } from './dto/add-info.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  //Controlador que enlista los contactos
  @Get()
  getContacts(): Promise<Contact[]> {
    return this.contactService.getContacts();
  }

  //Controlador que accede a un contacto
  @Get(':id')
  getContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.getContact(id);
  }

  //Controlador que crea el contacto
  @Post()
  createContact(@Body() newContact: CreateContactDto) {
    return this.contactService.createUser(newContact);
  }

  //Controlador que elimina el contacto
  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id);
  }

  //Controlador que actualiza la información del contacto
  @Patch(':id')
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contact: UpdateContactDto,
  ) {
    return this.contactService.updateContact(id, contact);
  }

  @Post(':id/info')
  updateInfo(@Param('id', ParseIntPipe) id: number, @Body() info: addInfoDto) {
    return this.contactService.addInfoContact(id, info);
  }
}
