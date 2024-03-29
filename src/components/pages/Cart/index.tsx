import { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  FlexBox,
  IconButton,
  RenderIf,
  Text,
  Title
} from '@devland-ui/components';
import { ArrowLeft } from 'iconoir-react';
import { formatCurrency } from 'helpers/numbers';
import IconoirIcon from 'components/experience/IconoirIcon';
import ProductQuote from './ProductQuote';
import { Footer } from './styled/page';
import useCartState from './state';

const CartPage: FC = () => {
  const { goBack, push } = useHistory();
  const { products, updateProduct, removeFromCart } = useCartState();
  const { count, cost, quotes } = useMemo(() => ({
    cost: products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0),
    count: products.reduce((acc, prod) => acc + prod.quantity, 0),
    quotes: products.map((prod) => (
      <ProductQuote
        key={prod.$id}
        item={prod}
        updateProduct={updateProduct}
        removeFromCart={removeFromCart}
      />
    ))
  }), [products]);

  return (
    <>
      <FlexBox
        justify="space-between"
        align="center"
        padding="16px 16px 16px 0"
        height={80}
      >
        <IconButton
          icon={<IconoirIcon icon={ArrowLeft} />}
          onClick={goBack}
          size="large"
        />
        <Avatar src="user1" />
      </FlexBox>
      <FlexBox justify="space-between" align="center" padding="16px">
        <Title level={1} size={32}>Cart</Title>
        <RenderIf condition={count > 1}>
          <Text size="large">{`${count} articulos`}</Text>
        </RenderIf>
      </FlexBox>
      <FlexBox direction="column" align="stretch" padding="16px 16px 120px">
        {quotes}
      </FlexBox>
      <RenderIf condition={products.length > 0}>
        <Footer>
          <FlexBox justify="space-between" margin="0 0 24px 0">
            <Text size="large">Total:</Text>
            <Text size="large" weight="bold">{formatCurrency(cost)}</Text>
          </FlexBox>
          <Button
            onClick={() => push('/checkout')}
            label="COMPRAR"
            variant="fill"
            color="brand"
          />
        </Footer>
      </RenderIf>
    </>
  );
};

export default CartPage;
