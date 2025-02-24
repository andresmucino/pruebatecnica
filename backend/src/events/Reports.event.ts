import amqp from 'amqplib';
import { generateReport } from '../services/reports.service';

const eventsService = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'Reports';

    await channel.assertQueue(queue);
    channel.consume(queue, async (message) => {
        if (message) {
            console.log('message recibed', message.content.toString());
            await generateReport()
            channel.ack(message
            )
        }
    })
}

eventsService()