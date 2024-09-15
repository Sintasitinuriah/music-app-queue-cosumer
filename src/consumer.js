require('dotenv').config();
const amqp = require('amqplib');
const MusicService = require('./MusicService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  try {
    const musicService = new MusicService();
    const mailSender = new MailSender();
    const listener = new Listener(musicService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    console.log('Connected to RabbitMQ');
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlist', {
      durable: true,
    });

    channel.consume('export:playlist', listener.listen, { noAck: true });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
  }
};

init();
