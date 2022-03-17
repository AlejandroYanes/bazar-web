import { FC, useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { AppwriteException } from 'appwrite';
import {
  FlexBox,
  formatCurrency,
  Paragraph,
  SpinningDots,
  Text,
  Title,
  AbsoluteContent,
  IconButton,
  Button,
  useSimplePagination,
  RenderIf,
} from 'activate-components';
import productsApi from 'api/products';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen, MessageScreen } from 'components/experience/Screens';
import { ImageHolder, Counter } from './styled';

const ProductDetailsPage: FC = () => {
  const { goBack } = useHistory();
  const { id } = useParams() as { id: string };
  const { isLoading, data: product, error } = useQuery(
    [QueryKey.FETCH_PRODUCT, id],
    () => productsApi.get(id),
  );

  const {
    page: index,
    goNext: showNext,
    goBack: showPrevious,
  } = useSimplePagination(product?.images?.length, 0);
  const imgUrl = useMemo<URL | undefined>(() => {
    if (!isLoading && product) {
      return productsApi.fetchPhoto(product.images[index],window.innerWidth);
    }
    return undefined;
  }, [isLoading, index]);

  if (error) {
    if ((error as AppwriteException).code === 404) {
      return (
        <MessageScreen
          margin="48px 0 0 0"
          icon="INFO_CIRCLE"
          color="BRAND"
          title="No hay nada aqui"
          lines={['No encontramos la información del producto.']}
        >
          <Button
            onClick={goBack}
            label="VOLVER ATRAS"
            variant="outline"
            color="brand"
            mT
          />
        </MessageScreen>
      );
    }
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

  return (
    <>
      <ImageHolder>
        <AbsoluteContent top={16} left={16}>
          <IconButton
            onClick={goBack}
            size="large"
            variant="fill"
            color="background"
            icon="CHEVRON_LEFT"
          />
        </AbsoluteContent>
        <AbsoluteContent top={window.innerWidth / 2} left={16}>
          <IconButton
            disabled
            onClick={showPrevious}
            size="large"
            variant="fill"
            color="brand"
            icon="CHEVRON_LEFT"
          />
        </AbsoluteContent>
        <AbsoluteContent top={window.innerWidth / 2} right={16}>
          <IconButton
            onClick={showNext}
            size="large"
            variant="fill"
            color="brand"
            icon="CHEVRON_RIGHT"
          />
        </AbsoluteContent>
        <RenderIf condition={product?.images.length > 0}>
          <AbsoluteContent bottom={16} right={16}>
            <Counter>{`${index + 1} / ${product?.images.length}`}</Counter>
          </AbsoluteContent>
        </RenderIf>
        <img
          src={imgUrl.href}
          height={window.innerWidth}
          width={window.innerWidth}
          alt={product.name}
        />
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
