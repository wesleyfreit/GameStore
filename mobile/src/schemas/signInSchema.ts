import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email('Este email não é válido.')
    .required('Este campo deve ser preenchido.'),
  password: yup
    .string()
    .min(6, 'A senha deve conter pelo menos 6 caracteres.')
    .required('Este campo deve ser preenchido.'),
});
