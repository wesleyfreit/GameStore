import { NextFunction, Request, Response } from 'express';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { storage } from '../db/firebase';

const uploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({
    limits: {
      fileSize: 5_242_880, //5mb
    },
  });
  upload.single('image')(req, res, async (err) => {
    if (req.file) {
      if (err) return res.status(400).send();
      const { originalname, mimetype, buffer } = req.file;
      const mimeTypeRegex = /^image\/[a-zA-Z]+/;
      const isValidFileFormat = mimeTypeRegex.test(mimetype);
      if (isValidFileFormat) {
        try {
          const fileId = randomUUID();
          const fileName = fileId.concat(`-${originalname}`);

          const storageRef = ref(storage, `uploads/${fileName}`);
          await uploadBytesResumable(storageRef, await buffer);
          const fileUrl = await getDownloadURL(storageRef);

          req.imgUrl = fileUrl;
          next();
        } catch (error) {
          console.log(error);
          return res.sendStatus(400);
        }
      } else return res.sendStatus(400);
    } else return next();
  });
};

export default uploadMiddleware;
