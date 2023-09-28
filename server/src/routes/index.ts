import { errors } from 'celebrate';
import { Router } from 'express';
const router = Router();

import cartRouter from './cartRouter';
import gameRouter from './gameRouter';
import genreRouter from './genreRouter';
import userRouter from './userRouter';

router.use(errors());

router.use('/api/v1', genreRouter);
router.use('/api/v1', userRouter);
router.use('/api/v1', gameRouter);
router.use('/api/v1', cartRouter);

export default router;
