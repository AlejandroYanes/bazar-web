import { commonRules } from 'activate-components';
import { Credentials } from './reducer';

export const rules = {
  name: [commonRules.required],
  lastName: [commonRules.required],
  email: [commonRules.required, commonRules.email],
  password: [commonRules.required],
  confirmation: [
    commonRules.required,
    (values: Credentials, value: string) => (
      values?.password !== value ? 'las contraseñas no son iguales' : undefined
    ),
  ],
};
