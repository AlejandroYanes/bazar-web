import { ArrowLeft } from 'iconoir-react';
import {
  Button,
  commonRules,
  Field,
  FlexBox,
  Form,
  IconButton, LinkButton,
  PasswordInput, Text,
  Title
} from 'activate-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import IconoirIcon from 'components/experience/IconoirIcon';

interface Credentials {
  email: string;
  password: string;
}

const rules = {
  email: [commonRules.required, commonRules.email],
  password: [commonRules.required],
};

const LoginPage = () => {
  const { goBack } = useHistory();
  const [credentials, setCredentials] = useState<Credentials>({} as Credentials);
  const [errors, setErrors] = useState<Credentials>({} as Credentials);
  return (
    <>
      <FlexBox padding="16px 16px 16px 0" height={80}>
        <IconButton
          icon={<IconoirIcon icon={ArrowLeft} />}
          size="large"
          onClick={goBack}
          margin="0 auto 0 0"
          padding="0"
        />
      </FlexBox>
      <FlexBox direction="column" align="stretch" padding="0 16px 32px" flex="1">
        <Title level={1} size={38} padding="16px 0 32px">Hola otra vez!</Title>
        <Form
          state={credentials}
          onChange={setCredentials}
          rules={rules}
          errors={errors as any}
          onError={setErrors}
        >
          <Field name="email" label="Correo" required />
          <Field name="password" label="Contraseña" component={PasswordInput} required />
        </Form>
        <LinkButton to="/" label="Recuperar contraseña" variant="flat" mB />
        <LinkButton to="/signup" label="No tienes una cuenta?" variant="flat" mB />
        <Button
          onClick={() => undefined}
          label="ENTRAR"
          variant="fill"
          mT
        />
        <Text align="center" padding="16px" margin="auto 0 0 0">
          Tambien puedes
        </Text>
        <Button
          onClick={() => undefined}
          label="Continuar con Google"
          variant="outline"
          color="font"
          mB
        />
        <Button
          onClick={() => undefined}
          label="Continuar con Facebook"
          variant="outline"
          color="font"
        />
      </FlexBox>
    </>
  );
};

export default LoginPage;

