import { useState } from 'react';
import { ArrowLeft } from 'iconoir-react';
import { useHistory } from 'react-router-dom';
import { Button, Field, FlexBox, Form, IconButton } from '@devland-ui/components';
import IconoirIcon from 'components/experience/IconoirIcon';

interface Info {
  name: string;
  phone: string;
  address: string;
}

const CheckoutPage = () => {
  const { goBack } = useHistory();
  const [info, setInfo] = useState<Info>({} as any);

  return (
    <>
      <FlexBox
        height={80}
        align="center"
        justify="space-between"
        padding="16px 16px 16px 0"
      >
        <IconButton
          icon={<IconoirIcon icon={ArrowLeft} />}
          onClick={goBack}
          size="large"
        />
      </FlexBox>
      <FlexBox
        direction="column"
        justify="space-between"
        align="stretch"
        padding="16px 16px 120px"
      >
        <Form state={info} onChange={setInfo}>
          <Field name="name" label="Nombre" />
          <Field name="phone" label="Telefono" />
          <Field name="address" label="Direccion" />
        </Form>
        <Button
          onClick={() => undefined}
          label="CONTINUAR"
          variant="fill"
          margin="auto 0 0 0"
        />
      </FlexBox>
    </>
  );
};

export default CheckoutPage;
