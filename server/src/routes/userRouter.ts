import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';

import { UserAccountController } from '../controllers/UserAccountController';
import { UserAdminController } from '../controllers/UserAdminController';
import { UserAuthController } from '../controllers/UserAuthController';

import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';

const uAuth = new UserAuthController();
const uAccount = new UserAccountController();
const uAdmin = new UserAdminController();

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
        address: Joi.string().min(1).required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required(),
      }),
    },
    { messages },
  ),
  uAuth.signUp,
);

router.post(
  '/users/signin',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    },
    { messages },
  ),
  uAuth.signIn,
);

router.post(
  '/users/getaddress',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        lat: Joi.number().required(),
        lng: Joi.number().required(),
      }),
    },
    { messages },
  ),
  uAuth.getAddress,
);

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
    { messages },
  ),
  uAccount.account,
);

router.get('/users', adminAuth, uAdmin.read);

router.patch(
  '/users/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    { messages },
  ),
  adminAuth,
  uAdmin.alter,
);

// router.put(
//   '/users/:id/avatar',
//   celebrate(
//     {
//       [Segments.BODY]: Joi.object().keys({
//         // username: Joi.string()
//         //   .pattern(/[A-Za-z0-9_]+/)
//         //   .min(5)
//         //   .max(40)
//         //   .required(),
//         // email: Joi.string().email().required(),
//         // oldPassword: Joi.string().min(8).required(),
//         password: Joi.string().min(6).required(),
//       }),
//     },
//     { messages },
//   ),
//   userAuth,
//   uAccount.edit,
// );

router.delete(
  '/users/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    { messages },
  ),
  userAuth,
  uAccount.delete,
);

export { router };