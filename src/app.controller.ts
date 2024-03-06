// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('/send-message')
  async sendMessage(): Promise<string> {
    await this.kafkaService.sendMessage();
    return 'Mensagem enviada para o Kafka com sucesso!';
  }
}
