import { FC, useMemo } from 'react';
import { FlexBox, formatCurrency, Text, Title } from 'activate-components';
import { AddCircledOutline, RemoveEmpty, Trash } from 'iconoir-react';
import { CartModel } from 'models/cart';
import productsApi from 'api/products';
import { useCart } from 'components/providers/Cart';
import IconoirIcon from 'components/experience/IconoirIcon';
import { ImageHolder } from './styled/product-quote';

const ProductQuote: FC<CartModel> = (props) => {
  const { updateProduct, removeFromCart } = useCart();
  const { $id, name, price, thumbnail, quantity } = props;
  const imgUrl = useMemo(() => productsApi.fetchThumbnail(thumbnail), []);

  return (
    <FlexBox direction="column" align="stretch" mB>
      <FlexBox align="stretch">
        <ImageHolder>
          <img src={imgUrl.href} width={80} height={80} alt={name} />
        </ImageHolder>
        <FlexBox direction="column" align="stretch" padding="0 0 8px 8px">
          <Title level={3} weight="bold" margin="0 0 8px 0" ellipsis>{name}</Title>
          <Text
            size="large"
            weight="bold"
            margin="0 0 8px 0"
          >
            {formatCurrency(price)}
          </Text>
        </FlexBox>
      </FlexBox>
      <FlexBox align="center" padding="20px 0">
        <button onClick={() => removeFromCart($id)} style={{ marginRight: 'auto' }}>
          <IconoirIcon icon={Trash} />
        </button>
        <button onClick={() => updateProduct({ ...props, quantity: quantity - 1 })}>
          <IconoirIcon icon={RemoveEmpty} />
        </button>
        <Text mR mL>{quantity}</Text>
        <button onClick={() => updateProduct({ ...props, quantity: quantity + 1 })}>
          <IconoirIcon icon={AddCircledOutline} />
        </button>
      </FlexBox>
    </FlexBox>
  );
};

export default ProductQuote;
