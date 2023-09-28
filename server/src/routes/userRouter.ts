import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';

import UserController from '../controllers/UserController';
import adminAuth from '../middlewares/adminAuth';
import userAuth from '../middlewares/userAuth';

const user = new UserController();
const router = Router();

router.post(
  '/users/signup',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string()
          .pattern(/[A-Za-z0-9_]+/)
          .min(5)
          .max(40)
          .required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().min(8).required(),
      }),
    },
    {
      messages: messages,
    },
  ),
  user.create,
);
router.post(
  '/users/signin',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string()
          .pattern(/[A-Za-z0-9_]+/)
          .min(5)
          .max(40)
          .required(),
        password: Joi.string().min(8).required(),
      }),
    },
    {
      messages: messages,
    },
  ),
  user.login,
);
router.get('/users/signout', user.signout);
router.get(
  '/users/account/:username',
  celebrate(
    {
      [Segments.PARAMS]: {
        username: Joi.string()
          .pattern(/[A-Za-z0-9_]+/)
          .min(5)
          .max(40)
          .required(),
      },
    },
    {
      messages: messages,
    },
  ),
  userAuth,
  user.account,
);

router.get('/users', adminAuth, user.read);
router.patch(
  '/users/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    {
      messages: messages,
    },
  ),
  adminAuth,
  user.alter,
);
router.put(
  '/users/:id',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        username: Joi.string()
          .pattern(/[A-Za-z0-9_]+/)
          .min(5)
          .max(40)
          .required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string().min(8).required(),
        password: Joi.string().min(8).required(),
      }),
    },
    {
      messages: messages,
    },
  ),
  userAuth,
  user.edit,
);
router.delete(
  '/users/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    {
      messages: messages,
    },
  ),
  userAuth,
  user.delete,
);

export default router;
