import { FC, useMemo } from 'react';
import { FlexBox, Text, Title, IconButton } from 'activate-components';
import { AddCircledOutline, RemoveEmpty, Trash } from 'iconoir-react';
import { CartModel } from 'models/cart';
import productsApi from 'api/products';
import { useCart } from 'components/providers/Cart';
import IconoirIcon from 'components/experience/IconoirIcon';
import { ImageHolder } from './styled/product-quote';
import { formatCurrency } from 'helpers/numbers';

const ProductQuote: FC<CartModel> = (props) => {
  const { updateProduct, removeFromCart } = useCart();
  const { $id, name, price, bucket, thumbnail, quantity } = props;
  const imgUrl = useMemo(() => productsApi.fetchThumbnail(bucket, thumbnail), []);

  return (
    <FlexBox direction="column" align="stretch" mB>
      <FlexBox align="stretch">
        <ImageHolder>
          <img src={imgUrl.href} width={80} height={80} alt={name} />
        </ImageHolder>
        <FlexBox direction="column" align="stretch" padding="0 0 8px 8px">
          <Title level={3} weight="bold" margin="0 0 8px 0">{name}</Title>
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
        <IconButton
          icon={<IconoirIcon icon={Trash} width={32} height={32} />}
          onClick={() => removeFromCart($id)}
          style={{ marginRight: 'auto' }}
        />
        <IconButton
          icon={<IconoirIcon icon={RemoveEmpty} width={32} height={32} />}
          onClick={() => updateProduct({ ...props, quantity: quantity - 1 })}
        />
        <Text mR mL>{quantity}</Text>
        <IconButton
          icon={<IconoirIcon icon={AddCircledOutline} width={32} height={32} />}
          onClick={() => updateProduct({ ...props, quantity: quantity + 1 })}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ProductQuote;
