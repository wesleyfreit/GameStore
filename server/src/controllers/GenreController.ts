import { Request, Response } from 'express';
import { Genre } from '../models/Genre';

export class GenreController {
  read = async (req: Request, res: Response) => {
    try {
      const genres = await Genre.findMany();
      return res.status(200).json({ genres });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (name !== '') {
        const genre = await Genre.findFirst({
          where: { name: { equals: name, mode: 'insensitive' } },
        });
        if (genre) {
          return res.status(409).json({
            error:
              'O gênero que está tentando cadastrar já existe, por favor tente outro.',
          });
        } else {
          await Genre.create({ data: { name } });
          return res.status(201).json({ info: 'O gênero foi criado com sucesso' });
        }
      } else {
        return res.status(401).json({
          error:
            'Ocorreu um erro ao validar os dados, verifique se preencheu corretamente e tente novamente.',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      if (name != '') {
        const genreName = await Genre.findFirst({
          where: { name: { equals: name, mode: 'insensitive' } },
        });
        const genreId = await Genre.findUnique({ where: { id } });
        if (genreId) {
          if (genreName && genreId.id != genreName.id) {
            return res.status(409).json({
              error:
                'O novo nome que você quer salvar como nome do gênero atual já existe, tente outro nome.',
            });
          }
          await Genre.update({ where: { id }, data: { name } });
          return res.status(204).json({ info: 'O gênero foi atualizado com sucesso.' });
        } else {
          return res.status(404).json({
            error:
              'O gênero que você tentou acessar para alterar provavelmente não existe.',
          });
        }
      } else {
        return res.status(401).json({
          error:
            'Ocorreu um erro ao validar os dados, verifique se preencheu corretamente e tente novamente.',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const genre = await Genre.findUnique({ where: { id } });
      if (genre) {
        const destroy = await Genre.delete({ where: { id } });
        if (destroy) {
          return res.status(204).json({ info: 'O gênero foi removido com sucesso.' });
        } else {
          return res.status(401).json({
            error:
              'Ocorreu um erro ao validar os dados, verifique se estão corretos e tente novamente.',
          });
        }
      } else {
        return res.status(404).json({
          error:
            'O gênero que você tentou acessar para remover provavelmente não existe.',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}
