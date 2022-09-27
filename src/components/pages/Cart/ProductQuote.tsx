import { FC, useMemo } from 'react';
import { FlexBox, Text, Title, IconButton } from '@devland-ui/components';
import { AddCircledOutline, RemoveEmpty, Trash } from 'iconoir-react';
import { CartItemModel } from 'models/cart-item';
import productsApi from 'api/products';
import { formatCurrency } from 'helpers/numbers';
import IconoirIcon from 'components/experience/IconoirIcon';
import { ImageHolder } from './styled/product-quote';

interface Props {
  item: CartItemModel;
  updateProduct: (item: CartItemModel) => void;
  removeFromCart: (itemId: string) => void;
}

const ProductQuote: FC<Props> = (props) => {
  const {
    item,
    updateProduct,
    removeFromCart,
  } = props;
  const { $id, name, price, bucket, thumbnail, quantity } = item;
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
          onClick={() => updateProduct({ ...item, quantity: quantity - 1 })}
        />
        <Text mR mL>{quantity}</Text>
        <IconButton
          icon={<IconoirIcon icon={AddCircledOutline} width={32} height={32} />}
          onClick={() => updateProduct({ ...item, quantity: quantity + 1 })}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ProductQuote;
