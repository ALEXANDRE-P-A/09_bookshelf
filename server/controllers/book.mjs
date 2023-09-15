import { validationResult } from 'express-validator';
import Book from '../models/book.mjs';

/* ----- すべてのアイテムを取得する関数 ----- */
const getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ updatedAt: -1 }); // 降順で一覧を取得
  res.json(books);
}

/* ----- 個別のアイテムをIDで取得する関数 ----- */
const getBookById = async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findById(_id);
  if(book === null)
    return res.status(404).json({ msg: "Book Not Found." }); // ここでIDに合致するデータがなければメッセージを返して終了
  res.json(book);
}

/* ----- アイテムを登録する関数 ----- */
const registBook = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const err = errors.array();
    return res.status(400).json(err); // エラーがあった場合にここで終了
  }
  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook); // DBに登録があれば通常は201を返す
}

/* ----- アイテムを更新する関数 ----- */
const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const err = errors.array();
    return res.status(400).json(err);
  }
  const { title, description, comment, rating } = req.body; // 分割代入で飛んできた各々の値を取得
  const _id = req.params.id; // パラメータを取得
  const book = await Book.findById(_id); // IDに合致するデータを取得
  if(book === null)
    return res.status(404).json({ msg: "ID Not Found." }); // ここでIDに合致するデータがなければメッセージを返して終了
  if(title !== undefined) //　このデータのリクエストが有れば更新する
    book.title = title;
  if(description !== undefined) //　このデータのリクエストが有れば更新する
    book.description = description;
  if(comment !== undefined) //　このデータのリクエストが有れば更新する
    book.comment = comment;
  if(rating !== undefined) //　このデータのリクエストが有れば更新する
    book.rating = rating;
  await book.save(); // 更新箇所を保存
  res.status(201).json(book);
}

/* ----- アイテムを削除する関数 ----- */
const deleteBook = async (req, res) => {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id }); // deletedCountはdeleteOneの返り値オブジェクトの中身
  if(deletedCount === 0)
    return res.status(404).json({ msg: "Target Not Found." }); //　deletedCountが0の場合、メッセージを返して終了する
  res.json({ msg: "Delete Succeeded" });
}

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };