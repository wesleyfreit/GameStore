interface CardGameRectangleComponentProps {
  game: IGame;
  toGame?: () => void;
  toRemove: () => void;
  toEdit: () => void;
}
