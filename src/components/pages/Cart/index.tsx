import { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  FlexBox,
  formatCurrency,
  IconButton, RenderIf,
  Text,
  Title
} from 'activate-components';
import { useCart } from 'components/providers/Cart';
import ProductQuote from './ProductQuote';
import { Footer } from './styled/page';

const CartPage: FC = () => {
  const { goBack } = useHistory();
  const { products } = useCart();
  const { total, quotes } = useMemo(() => ({
    total: products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0),
    quotes: products.map((prod) => (
      <ProductQuote key={prod.$id} {...prod} />
    ))
  }), [products]);

  return (
    <>
      <FlexBox justify="space-between" align="center" padding="16px" height={80}>
        <IconButton icon="CHEVRON_LEFT" onClick={goBack} size="large" />
        <Avatar src="user1" />
      </FlexBox>
      <FlexBox justify="space-between" padding="16px">
        <Title level={1} size={32}>Cart</Title>
        <RenderIf condition={products.length > 1}>
          <Text>{`${products.length} articulos`}</Text>
        </RenderIf>
      </FlexBox>
      <FlexBox direction="column" align="stretch" padding="16px 16px 120px">
        {quotes}
      </FlexBox>
      <RenderIf condition={products.length > 0}>
        <Footer>
          <FlexBox justify="space-between" margin="0 0 24px 0">
            <Text size="large">Total:</Text>
            <Text size="large" weight="bold">{formatCurrency(total)}</Text>
          </FlexBox>
          <Button onClick={() => undefined} label="PAGAR" variant="fill" color="brand" />
        </Footer>
      </RenderIf>
    </>
  );
};

export default CartPage;
