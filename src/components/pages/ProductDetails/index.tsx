import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { AppwriteException } from 'appwrite';
import * as faker from 'faker';
import {
  AbsoluteContent,
  Button, ChevronLeftIcon, ChevronRightIcon,
  FlexBox,
  formatCurrency,
  IconButton, InfoCircleIcon, Modal,
  NotificationType,
  Paragraph,
  RenderIf,
  showNotification,
  SpinningDots, Text,
  Title,
  useSimplePagination,
} from 'activate-components';
import { AddCircledOutline, RemoveEmpty } from 'iconoir-react';
import { CartModel } from 'models/cart';
import productsApi from 'api/products';
import { QueryKey } from 'components/providers/Query';
import { useCart } from 'components/providers/Cart';
import { ErrorScreen, MessageScreen } from 'components/experience/Screens';
import IconoirIcon from 'components/experience/IconoirIcon';
import { Counter, ImageHolder, Footer } from './styled';

const ProductDetailsPage: FC = () => {
  const { addToCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    const { name, price, thumbnail } = product;
    addToCart({
      $id: faker.random.uuid(),
      name,
      price,
      thumbnail,
      quantity,
    } as CartModel);
    setShowModal(false);
    setQuantity(1);
    showNotification({
      type: NotificationType.SUCCESS,
      title: name,
      message: 'agregado al carrito',
    });
  };

  if (error) {
    if ((error as AppwriteException).code === 404) {
      return (
        <MessageScreen
          margin="48px 0 0 0"
          icon={<InfoCircleIcon color="INFO" height={72} width={72} />}
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
        <AbsoluteContent top={0} left={0} right={0}>
          <FlexBox
            height={80}
            width="100%"
            justify="space-between"
            align="center"
            padding="16px"
          >
            <IconButton
              onClick={goBack}
              size="large"
              variant="flat"
              color="font"
              icon={<ChevronLeftIcon />}
            />
            <RenderIf condition={product?.images.length > 1}>
              <Counter>{`${index + 1} / ${product?.images.length}`}</Counter>
            </RenderIf>
          </FlexBox>
        </AbsoluteContent>
        <RenderIf condition={product?.images.length > 1}>
          <AbsoluteContent top={window.innerWidth / 2} left={16}>
            <IconButton
              onClick={showPrevious}
              size="large"
              variant="fill"
              color="font"
              icon={<ChevronLeftIcon />}
            />
          </AbsoluteContent>
          <AbsoluteContent top={window.innerWidth / 2} right={16}>
            <IconButton
              onClick={showNext}
              size="large"
              variant="fill"
              color="font"
              icon={<ChevronRightIcon />}
            />
          </AbsoluteContent>
        </RenderIf>
        <img
          src={imgUrl.href}
          height={window.innerWidth}
          width={window.innerWidth}
          alt={product.name}
        />
      </ImageHolder>
      <FlexBox direction="column" align="stretch" padding="16px 16px 120px">
        <Title level={3} size={24} mB mT>{product.name}</Title>
        <Title level={3} size={28} weight="bold" mB>
          {formatCurrency(product.price)}
        </Title>
        <Paragraph>{product.description}</Paragraph>
      </FlexBox>
      <Footer>
        <Button
          onClick={() => setShowModal(true)}
          label="AGREGAR AL CARRITO"
          variant="fill"
          color="brand"
        />
      </Footer>
      <Modal
        title="Agregar al Carrito"
        size="large"
        visible={showModal}
        onClose={() => setShowModal(false)}
        footer={(
          <>
            <Button
              onClick={() => setShowModal(false)}
              label="Cancelar"
              variant="outline"
              color="brand"
              mR
            />
            <Button
              onClick={handleAddToCart}
              label="Agregar"
              variant="fill"
              color="brand"
            />
          </>
        )}
      >
        <Text size="large" style={{ marginRight: 'auto' }} ellipsis>{product.name}</Text>
        <FlexBox align="center" mT mB>
          <Text style={{ marginRight: 'auto' }} ellipsis>Cantidad</Text>
          <FlexBox align="center">
            <button onClick={() => setQuantity(quantity - 1)}>
              <IconoirIcon icon={RemoveEmpty} />
            </button>
            <Text mR mL>{quantity}</Text>
            <button onClick={() => setQuantity(quantity + 1)}>
              <IconoirIcon icon={AddCircledOutline} />
            </button>
          </FlexBox>
        </FlexBox>
        <FlexBox justify="space-between" align="center" mT>
          <Text>Precio:</Text>
          <Text weight="bold">{formatCurrency(product.price * quantity)}</Text>
        </FlexBox>
      </Modal>
    </>
  );
};

export default ProductDetailsPage;
