import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { Game } from '../models/Game';
import { User } from '../models/User';
import { UserGames } from '../models/UserGames';

export class CartController {
  private secret;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  view = (req: Request, res: Response) => {
    const cart_items = req.cart_items;
    if (cart_items) {
      try {
        const decoded = jwt.decode(cart_items) as JwtPayload;
        if (decoded.cartItems.length > 0) {
          return res.status(200).json({ cartItems: decoded.cartItems });
        } else return res.status(200).json({ info: 'Carrinho vazio.' });
      } catch (error) {
        return res.sendStatus(500);
      }
    } else return res.status(200).json({ info: 'Carrinho vazio.' });
  };
  add = async (req: Request, res: Response) => {
    const cart_items = req.cart_items;
    const { id } = req.params;
    try {
      const game = await Game.findUnique({ where: { id } });
      if (game) {
        const cartItems: ICart[] = [];
        if (cart_items) {
          const decoded = jwt.decode(cart_items) as JwtPayload;
          decoded.cartItems.map((item: ICart) => cartItems.push(item));
        }
        const check = cartItems.some((item) => item.id === game.id);
        if (!check) {
          cartItems.push({
            id: game.id,
            title: game.title,
            slug: game.slug,
            imageUrl: game.imageUrl,
            price: game.price,
          });
        }
        let message = check ? 'O item já está no carrinho' : 'Item adicionado no carrinho.';

        const token = check
          ? cart_items
          : jwt.sign({ id: randomUUID(), cartItems: cartItems }, this.secret);
        return res.status(check ? 401 : 201).json({
          info: !check ? message : undefined,
          error: check ? message : undefined,
          cart_items: token,
        });
      } else {
        return res.status(404).json({
          error: 'Impossível adicionar este jogo no carrinho pois ele não está cadastrado.',
        });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const cart_items = req.cart_items;
      const { id } = req.params;
      if (cart_items) {
        const decoded = jwt.decode(cart_items) as JwtPayload;
        const check = decoded.cartItems.some((item: ICart) => item.id == id);
        if (check) {
          const cartItems = decoded.cartItems.filter((item: ICart) => item.id != id);
          const token = jwt.sign({ id: randomUUID(), cartItems: cartItems }, this.secret);
          return res.status(200).json({
            info: 'O item foi removido do carrinho',
            cart_items: token,
          });
        } else {
          return res
            .status(404)
            .json({ error: 'O item que você está tentando remover não existe no carrinho.' });
        }
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  buy = async (req: Request, res: Response) => {
    const cart_items = req.cart_items as string;
    try {
      let errorTitles = '';
      const userBuying = await User.findUnique({ where: { id: req.id } });
      if (cart_items && userBuying) {
        const userGames = await UserGames.findMany({ where: { userId: userBuying.id } });
        const decoded = jwt.decode(cart_items) as JwtPayload;
        await Promise.all(
          decoded.cartItems.map(async (item: ICart) => {
            const game = await Game.findUnique({ where: { id: item.id } });
            if (game) {
              const check = userGames.some((find) => find.gameId === game.id);
              !check
                ? await UserGames.create({ data: { userId: userBuying.id, gameId: game.id } })
                : (errorTitles = errorTitles.concat(` ${game.title},`));
            }
          }),
        );
      }
      if (errorTitles !== '') {
        return res.json({
          info: `Os títulos foram adicionados a sua conta, com exceção de ${errorTitles} pois esse(s) já existia(m) na sua conta.`,
        });
      } else {
        return res.status(201).json({ info: 'Os títulos que foram comprados estão na sua conta!' });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  clean = async (req: Request, res: Response) => {
    const token = jwt.sign({ id: randomUUID(), cartItems: [] }, this.secret);
    res.status(200).json({
      info: 'O carrinho foi apagado, use o novo token para o carrinho.',
      cart_items: token,
    });
  };
}
