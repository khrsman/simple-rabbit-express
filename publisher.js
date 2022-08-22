const amqp = require('amqplib')

module.exports = async (req, res) => {
  const message = req.body;
  const messageBuffer = Buffer.from(JSON.stringify({message}));
  try {

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue("antrian");
    await channel.sendToQueue("antrian", messageBuffer);
    await channel.close();
    await connection.close();

    return res.json({
      success: true,
      message: "Data telah di publish",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: 'Terjadi kesalahan',
    });
  }
};
