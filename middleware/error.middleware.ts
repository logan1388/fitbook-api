// Copyright FitBook

import express from 'express';
import HttpException from '../models/httpException';

function errorMiddleware(
  error: HttpException,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong. Please try again later.';
  response.status(status).json({
    status,
    message,
  });
}

export default errorMiddleware;
