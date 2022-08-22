const amqp = require('amqplib')

module.exports = async (req, res) => {
  async function connect() {
    try {
      const connection = await amqp.connect('amqp://localhost:5672');
      const channel = await connection.createChannel();
      await channel.assertQueue("antrian");
      channel.consume("antrian", message => {
        const input = JSON.parse(message.content.toString());
        console.log(`Data yang diterima:`, input.message);
        channel.ack(message);
      });
      console.log(`Menunggu pesan baru...`);

    } catch (err) {
        console.log(err)
    }
   }
   connect();
};
