// src/kafka.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'], // Altere conforme necessário
  });

  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({ groupId: 'test-group' });

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage() {
    await this.producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello Kafka from NestJS!' }],
    });
  }
}
