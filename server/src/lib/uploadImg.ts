import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

import stream from 'stream';

const pump = promisify(pipeline);

const uploadImg = async (req: Request, res: Response) => {
  if (req.file) {
    const { originalname, mimetype, buffer } = req.file!;

    const mimeTypeRegex = /^image\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(mimetype);

    if (isValidFileFormat) {
      try {
        const fileId = randomUUID();
        const fileName = fileId.concat(`-${originalname}`);

        const directory = req.path.includes('games') ? 'covers/' : 'avatars/';

        const readStream = stream.Readable.from(buffer);
        const writeStream = createWriteStream(
          resolve(__dirname, '../../public/uploads/', directory, fileName),
        );

        await pump(readStream, writeStream);

        return `/uploads/${directory}${fileName}`;
      } catch (error) {
        return 'error';
      }
    } else return 'error';
  } else return undefined;
};

export { uploadImg };
