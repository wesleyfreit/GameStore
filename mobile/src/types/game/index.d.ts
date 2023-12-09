interface IGame {
  id: string;
  title: string;
  year: number;
  price: number;
  description: string;
  disponibility: boolean;
  genreId: string;
  imageUrl: string;
  slug: string;
  genre?: {
    name: string;
  };
}

interface IGameCreateAndEdit {
  image?: string;
  title?: string;
  year?: number;
  price?: number;
  description?: string;
  genre?: string;
  disponibility?: boolean;
  imageUrl?: boolean;
}

interface IUserGame {
  game: {
    id: string;
    title: string;
    year: number;
    price: number;
    description: string;
    disponibility: boolean;
    genreId: string;
    imageUrl: string;
    slug: string;
  };
}
