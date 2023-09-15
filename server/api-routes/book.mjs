import express from 'express';
import { body } from 'express-validator'; // リクエストのJSONの情報が妥当かどうかをチェック
import { 
  getAllBooks, 
  getBookById, 
  registBook, 
  updateBook, 
  deleteBook 
} from '../controllers/book.mjs';
import { requestErrorHandler } from '../helpers/hepler.mjs';

const router = express.Router();

/* ----- すべてのアイテムを取得するメソッド ----- */
router.get('/',requestErrorHandler(getAllBooks));

/* ----- 個別のアイテムをIDで取得するメソッド ----- */
router.get('/:id',requestErrorHandler(getBookById));

/* ----- アイテムを登録するメソッド ----- */
router.post(
  '/',
  body('title').notEmpty().withMessage('Please enter the title.'),
  body('rating').notEmpty().isInt(),
  body('description').notEmpty(),
  body('comment').notEmpty(),
  requestErrorHandler(registBook),
);

/* ----- アイテムを更新するメソッド ----- */
router.patch(
  '/:id',
  body('title').optional().notEmpty(),
  body('rating').optional().notEmpty().isInt(),
  body('description').optional().notEmpty(),
  body('comment').optional().notEmpty(),
  requestErrorHandler(updateBook),
);

/* ----- アイテムを削除するメソッド ----- */
router.delete('/:id',requestErrorHandler(deleteBook));

export default router;