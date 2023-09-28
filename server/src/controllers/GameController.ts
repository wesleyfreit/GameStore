import { Request, Response } from 'express';
import slugify from 'slugify';
import deleteImg from '../lib/deleteImg';
import Game from '../models/Game';
import { IGame } from '../@types/game';

class GameController {

  index = async (req: Request, res: Response) => {
    try {
      const games = await Game.findMany({ where: { disponibility: true } });
      return res.status(200).json({ games });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  read = async (req: Request, res: Response) => {
    try {
      const games = await Game.findMany({ include: { genre: true } });
      return res.status(200).json({ games });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  find = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const game = await Game.findFirst({
        where: {
          slug: {
            equals: slug,
            mode: 'insensitive',
          },
        },
        include: { genre: true },
      });
      if (game) {
        return res.status(200).json({ game });
      } else return res.status(404).send('Content not found');
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { title, year, price, description, disponibility, genre } = <IGame>req.body;
      const imageUrl = `${req.imgUrl}`;
      if (title != '' && year >= 1950 && price >= 0 && imageUrl != '' && genre) {
        const game = await Game.findFirst({
          where: { title: { equals: title, mode: 'insensitive' } },
        });
        if (game) {
          const deletedImg = await deleteImg(imageUrl);
          if (deletedImg) {
            return res.sendStatus(500);
          }
          res.status(409).json({
            error:
              'O título que está tentando cadastrar já existe, por favor tente outro título diferente.',
          });
        } else {
          const newGame = {
            title,
            slug: slugify(title),
            year,
            price,
            imageUrl,
            description,
            disponibility: disponibility ? true : false,
            genreId: genre,
          };
          const game = await Game.create({ data: newGame });
          res.status(201).json({ gameId: game.id });
        }
      } else {
        res.status(401).json({ error: 'O formato dos dados atuais não parece estar correto.' });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  };

  search = async (req: Request, res: Response) => {
    try {
      const { name, genre } = req.query;
      if (name && name != '') {
        const games = await Game.findMany({
          where: {
            title: {
              contains: `${name}`,
            },
          },
          include: { genre: true },
        });
        return res.status(200).json({
          games: genre ? games.filter((game) => game.genre.id == genre) : games,
        });
      } else {
        const games = await Game.findMany({ include: { genre: true } });
        return res.status(200).json({
          games: genre ? games.filter((game) => game.genre.id == genre) : games,
        });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { title, year, price, description, disponibility, originalImageUrl, genre } = <
        IGame
      >req.body;
      const imageUrl = req.file ? req.imgUrl : originalImageUrl;
      const { id } = req.params;
      if (title != '' && year >= 1950 && price >= 0 && imageUrl) {
        const gameName = await Game.findFirst({
          where: { title: { equals: title, mode: 'insensitive' } },
        });
        const gameId = await Game.findUnique({ where: { id } });
        if (gameId) {
          if (gameName && gameId.id != gameName.id) {
            if (req.file) {
              const deletedImg = await deleteImg(imageUrl);
              if (deletedImg) {
                return res.sendStatus(500);
              }
            }
            return res.status(409).json({
              error:
                'O novo nome que você quer salvar para o título do jogo atual já existe, tente outro nome.',
            });
          }
          if (req.file) {
            const deletedImg = await deleteImg(originalImageUrl);
            if (deletedImg) {
              return res.sendStatus(500);
            }
          }
          const updateGame = {
            title,
            slug: slugify(title),
            year,
            price,
            imageUrl,
            description,
            disponibility,
            genreId: genre,
          };
          await Game.update({ where: { id }, data: { ...updateGame } });
          return res.status(204).json({ info: 'O jogo foi atualizado com sucesso.' });
        } else {
          return res.status(404).json({
            error: 'O jogo que você tentou acessar para atualizar provalvelmente não existe.',
          });
        }
      } else {
        return res.status(401).json({
          error:
            'Ocorreu um erro ao validar os dados, verifique se preencheu tudo corretamente e tente novamente.',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const game = await Game.findUnique({ where: { id } });
      if (game) {
        const deletedImg = await deleteImg(game.imageUrl);
        if (deletedImg) {
          return res.sendStatus(500);
        }
        const destroy = await Game.delete({ where: { id } });
        if (destroy) {
          return res.status(204).json({ info: 'O jogo foi deletado.' });
        } else {
          return res.status(401).json({ error: 'Ocorreu um erro ao validar os dados.' });
        }
      } else {
        return res.status(404).json({ error: 'O jogo que tentou deletar não existe.' });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}

export default GameController;
