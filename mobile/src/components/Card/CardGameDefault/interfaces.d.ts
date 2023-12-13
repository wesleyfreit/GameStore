interface CardDefaultComponentProps {
  game: IGame;
  toGame: () => void;
  addToCart?: () => void;
  disableBuy?: boolean;
  disponible?: boolean;
  bgColor?: string;
  bought?: boolean;
}
