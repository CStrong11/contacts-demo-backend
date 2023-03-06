import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './dto/index';
import { addInfoDto } from './dto/add-info.dto';
import { info } from './info.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(info) private infoRepository: Repository<info>,
  ) {}

  //Método el cual crea el contacto y verifica si se encuentran los datos de "cell_phone" ya creados
  async createUser(contact: CreateContactDto) {
    const phoneFound = await this.contactRepository.findOne({
      where: {
        cell_phone: contact.cell_phone,
      },
    });

    if (phoneFound) {
      return new HttpException(
        '¡El número de teléfono ya existe!',
        HttpStatus.CONFLICT,
      );
    }

    const newContact = this.contactRepository.create(contact);
    return this.contactRepository.save(newContact);
  }

  //Método que enlista todos los contactos en la base de datos
  getContacts() {
    return this.contactRepository.find();
  }

  //Método que accede a un contacto en específico por medio de su ID
  async getContact(id: number) {
    const contactFound = await this.contactRepository.findOne({
      where: {
        id,
      },
    });

    if (!contactFound) {
      return new HttpException('¡El contacto no existe!', HttpStatus.NOT_FOUND);
    }
    return contactFound;
  }

  //Método que verifica la existencia de un contacto para eliminarlo
  async deleteContact(id: number) {
    const result = await this.contactRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('¡El contacto no existe!', HttpStatus.NOT_FOUND);
    } else {
      return new HttpException(
        '¡El contacto ha sido Eliminado!',
        HttpStatus.OK,
      );
    }
  }

  //Método que verifica la existencia de un contacto para actualizar sus datos
  async updateContact(id: number, contact: UpdateContactDto) {
    const contactFound = await this.contactRepository.findOne({
      where: {
        id,
      },
    });
    if (!contactFound) {
      return new HttpException('¡El contacto no existe!', HttpStatus.NOT_FOUND);
    }

    const uptdatedContact = Object.assign(contactFound, contact);
    return this.contactRepository.save(uptdatedContact);
  }

  async addInfoContact(id: number, info: addInfoDto) {
    const contactFound = await this.contactRepository.findOne({
      where: {
        id,
      },
    });
    if (!contactFound) {
      return new HttpException('¡El contacto no existe!', HttpStatus.NOT_FOUND);
    }

    const newInfo = this.infoRepository.create(info);
    const saveInfo = await this.infoRepository.save(newInfo);
    contactFound.info = saveInfo;

    return this.contactRepository.save(contactFound);
  }
}
