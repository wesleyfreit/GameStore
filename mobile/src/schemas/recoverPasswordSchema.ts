import * as yup from 'yup';

export const recoverPasswordSchema = yup.object({
  email: yup.string().email('Este email não é válido.').required('Este campo deve ser preenchido.'),
});
