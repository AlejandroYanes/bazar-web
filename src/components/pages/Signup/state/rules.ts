import { commonRules } from 'activate-components';
import { Credentials } from './reducer';

export const rules = {
  firstName: [commonRules.required],
  lastName: [commonRules.required],
  email: [commonRules.required, commonRules.email],
  password: [commonRules.required],
  confirmation: [
    commonRules.required,
    (value: string, values: Credentials) => (
      values?.password !== value ? 'las contraseñas no son iguales' : undefined
    ),
  ],
};
