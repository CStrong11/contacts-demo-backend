import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactsService } from 'src/contacts/contacts.service';
import { Repository } from 'typeorm';
import { CreateCallDto } from './dto/create-call.dto';
import { Call } from './entities/call.entity';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call) private callRepository: Repository<Call>,
    private contactsService: ContactsService,
  ) {}

  async createCall(createCall: CreateCallDto) {
    const contactFound = await this.contactsService.getContact(
      createCall.contact_call,
    );

    if (!contactFound) {
      return new HttpException(
        '¡Contacto no encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    const newCall = this.callRepository.create(createCall);
    return this.callRepository.save(newCall);
  }
  getCalls() {
    return this.callRepository.find({
      relations: ['contact_call'],
    });
  }
}
