import dotenv from 'dotenv';
import 'reflect-metadata';
import ExpressApplication from './bootstrapper';
import express from 'express';
import logger from './libs/logger';
import UsersController from './api/users/users.controller';
import { container } from 'tsyringe';
import UsersService from './api/users/users.service';

dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5001;

container.register('IUsersService', {
  useClass: UsersService,
});

const app = new ExpressApplication(
  PORT,
  [
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
  ],
  [UsersController],
  []
);

const server = app.start();

process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECIEVED!');
  server?.close(() => {
    logger.warn('Proces terminated');
  });
});
