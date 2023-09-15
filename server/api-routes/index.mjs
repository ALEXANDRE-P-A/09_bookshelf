import express from 'express';
import bookRouter from './book.mjs';

const router = express.Router();
router.use('/books',bookRouter);

export default router;