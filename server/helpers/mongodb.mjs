import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

await mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once('error', function (err) {
  console.error('connection error: ', err);
});

db.once('open', function () {
  console.log('Connected successfully');
});

if(mongoose.connection.readyState === 1)
  console.log('DBへの接続を完了しました。'); // 接続の確認