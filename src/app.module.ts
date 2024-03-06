// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaService } from './kafka.service';

@Module({
  imports: [],
  controllers: [AppController], // Registrar o AppController aqui
  providers: [KafkaService],
})
export class AppModule {}
