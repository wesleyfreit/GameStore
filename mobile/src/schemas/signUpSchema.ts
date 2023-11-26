import * as yup from 'yup';

export const signUpSchema = (address: string) => {
  return yup.object({
    username: yup
      .string()
      .min(5, 'o nome de usuário deve conter pelo menos 5 caracteres.')
      .max(40)
      .matches(
        /[A-Za-z0-9_]+/,
        'Utilize apenas letras maiúsculas, minúsculas, números e underscores (_).',
      )
      .required('Este campo deve ser preenchido.'),
    email: yup
      .string()
      .email('Este email não é válido.')
      .required('Este campo deve ser preenchido.'),
    address: address
      ? yup.string()
      : yup.string().required('Este campo deve ser preenchido.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
        'Utilize pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.',
      )
      .min(6, 'A senha deve conter pelo menos 6 caracteres.')
      .required('Este campo deve ser preenchido.'),
    repeatPassword: yup
      .string()
      .equals([yup.ref('password')], 'As senhas não coincidem')
      .required('Este campo deve ser preenchido.'),
  });
};
