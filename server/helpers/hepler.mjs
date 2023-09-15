const requestErrorHandler = controller => {
  return async (req, res, next) => {
    try {
      return await controller(req, res);
    } catch(err) {
      next(err.stack);// expressのエラーハンドラーに処理が移ることのなる // app.mjsのエラーハンドラーに処理が移る
    }
  }
}

export { requestErrorHandler }; 