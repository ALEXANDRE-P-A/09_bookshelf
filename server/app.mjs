import path from 'path';
import express from 'express';
import env from 'dotenv';
env.config();

import apiRoutes from './api-routes/index.mjs';
import './helpers/mongodb.mjs'; // このインポート法でDBへの接続が行われる

const PORT = process.env.PORT || 8080; // もし.envファイルにPORTが設定されていなければ8080を使用する
const app = express();

app.use(express.static('build')); // build内のコードをサーバーから取得できるようになる
app.use(express.json()); // JSONを使用する為のミドルウェア

// import cors from 'cors';
// app.use(cors({
//   origin: '*',
// }));

// API
app.use('/api',apiRoutes); // api/books/

app.get('*', (req,res)=>{ // どののパスにリクエストが来ても、index.htmlを返す
  const indexHtml = path.resolve('build','index.html');
  res.sendFile(indexHtml); // sendFileはexpressのメソッド
});

app.use((req, res)=>{ // パスが見つからない場合に適用するミドルウェア
  res.status(404).json({ msg: 'Page Not Found.' });
});

app.use((err, req, res, next) => { // エラーハンドラーの定義
  if(res.headerSent)
    return next(err);
  res.status(500).json({ msg: "Unexpected error has occurred." });
});

app.listen(PORT,_=>{
  console.log(`Server start: http://localhost:${PORT}`);
});