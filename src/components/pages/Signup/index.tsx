import { ArrowLeft } from 'iconoir-react';
import {
  Button,
  Field,
  FlexBox,
  Form,
  IconButton,
  PasswordInput,
  Title,
} from '@devland-ui/components';
import { useHistory } from 'react-router-dom';
import IconoirIcon from 'components/experience/IconoirIcon';
import useSignupState, { rules } from './state';

const SignupPage = () => {
  const { goBack } = useHistory();
  const {
    state: { errors, credentials, isLoading },
    actions: { setCredentials, setErrors, signup },
  } = useSignupState();

  return (
    <>
      <FlexBox padding="16px 16px 16px 0" height={80}>
        <IconButton
          disabled={isLoading}
          icon={<IconoirIcon icon={ArrowLeft} />}
          size="large"
          onClick={goBack}
          margin="0 auto 0 0"
          padding="0"
        />
      </FlexBox>
      <FlexBox direction="column" align="stretch" padding="0 16px 32px" flex="1">
        <Title level={1} size={38} padding="16px 0 32px">
          Hola!
        </Title>
        <Form
          state={credentials}
          onChange={setCredentials}
          rules={rules}
          errors={errors as any}
          onError={setErrors}
        >
          <Field name="firstName" label="Nombre" required />
          <Field name="lastName" label="Apellidos" required />
          <Field name="email" label="Correo" required />
          <Field name="password" label="Contraseña" component={PasswordInput} required />
          <Field
            name="confirmation"
            label="Repite la contraseña"
            component={PasswordInput}
            required
          />
        </Form>
        <Button
          loading={isLoading}
          onClick={signup}
          label="ENTRAR"
          variant="fill"
          margin="auto 0 0 0"
        />
      </FlexBox>
    </>
  );
};

export default SignupPage;

