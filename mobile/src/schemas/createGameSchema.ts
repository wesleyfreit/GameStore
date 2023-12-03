import * as yup from 'yup';

export const createGameSchema = (
  preview: string | null,
  genre: string | null,
  imageUrl: string | null,
) => {
  return yup.object({
    image:
      preview || imageUrl
        ? yup.string()
        : yup.string().required('Este campo deve receber um arquivo.'),
    title: yup
      .string()
      .min(1, 'O nome do jogo deve conter pelo menos 1 caractere.')
      .max(40)
      .required('Este campo deve ser preenchido.'),
    year: yup
      .number()
      .min(1950, 'O ano de fabricação não deve ser menor que 1950')
      .max(2035, 'O ano de fabricação não deve ser maior que 2035')
      .required('Este campo deve ser preenchido.'),
    price: yup.number().min(0).required('Este campo deve ser preenchido.'),
    description: yup.string().required('Este campo deve ser preenchido.'),
    genre: genre ? yup.string() : yup.string().required('Este campo deve ser definido.'),
    disponibility: yup.boolean(),
  });
};
