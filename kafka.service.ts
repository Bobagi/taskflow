// kafka.service.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

// Exemplo de função para enviar mensagem
async function sendMessage() {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello Kafka' }],
  });

  await producer.disconnect();
}

// Exemplo de função para consumir mensagem
async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}
