import { FC, useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  FlexBox,
  formatCurrency,
  Paragraph,
  SpinningDots,
  Text,
  Title,
  AbsoluteContent, IconButton, Button,
} from 'activate-components';
import productsApi from 'api/products';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen, MessageScreen } from 'components/experience/Screens';
import { ImageHolder } from './styled';

const ProductDetailsPage: FC = () => {
  const { goBack } = useHistory();
  const { id } = useParams() as { id: string };
  const { isLoading, data: product, error } = useQuery(
    [QueryKey.FETCH_PRODUCT, id],
    () => productsApi.get(id),
  );

  const imgUrl = useMemo<URL | undefined>(() => {
    if (!isLoading && product) {
      return productsApi.fetchPhoto(product.thumbnail,window.innerWidth);
    }
    return undefined;
  }, [isLoading]);

  if (error) {
    return (
      <ErrorScreen lines={['No pudimos cargar la información del producto.']} />
    );
  }

  if (isLoading) {
    return (
      <FlexBox direction="column" justify="center" align="center" height="120px">
        <SpinningDots />
      </FlexBox>
    );
  }

  if (!product) {
    return (
      <MessageScreen
        icon="INFO_CIRCLE"
        color="BRAND"
        title="No hay nada aqui"
        lines={['No encontramos la información del producto.']}
      />
    );
  }

  return (
    <>
      <ImageHolder>
        <AbsoluteContent top={16} left={16}>
          <IconButton
            onClick={goBack}
            size="large"
            variant="fill"
            icon="CHEVRON_LEFT"
          />
        </AbsoluteContent>
        <img src={imgUrl.href} width={window.innerWidth} alt={product.name} />
      </ImageHolder>
      <FlexBox direction="column" align="stretch" padding="16px">
        <Title level={2} mB mT>{product.name}</Title>
        <Text size="large" weight="bold" mB>{formatCurrency(product.price)}</Text>
        <Paragraph>{product.description}</Paragraph>
        <Button
          onClick={() => undefined}
          label="AÑADIR AL CARRITO"
          variant="fill"
          color="brand"
          mT
          mB
        />
      </FlexBox>
    </>
  );
};

export default ProductDetailsPage;
