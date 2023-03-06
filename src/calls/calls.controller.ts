import { Controller, Get, Post, Body } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';

@Controller('calls')
export class CallsController {
  constructor(private callsService: CallsService) {}

  @Post()
  createCall(@Body() call: CreateCallDto) {
    return this.callsService.createCall(call);
  }
  @Get()
  getCalls() {
    return this.callsService.getCalls();
  }
}
