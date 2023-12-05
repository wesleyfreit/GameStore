import * as yup from 'yup';

export const createAndEditGenreSchema = yup.object({
  name: yup
    .string()
    .min(1, 'O nome do gênero deve conter pelo menos 1 caractere.')
    .max(40)
    .required('Este campo deve ser preenchido.'),
});
