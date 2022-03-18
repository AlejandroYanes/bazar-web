import { FC, useMemo } from 'react';
import { FlexBox, formatCurrency, Text, Title } from 'activate-components';
import { ProductModel } from 'models/product';
import productsApi from 'api/products';
import { Header, ImageHolder } from './styled';

const ProductPreview: FC<ProductModel> = (props) => {
  const { $id, name, price, thumbnail } = props;
  const imgUrl = useMemo(() => productsApi.fetchThumbnail(thumbnail), []);

  return (
    <Header to={`/product/${$id}`}>
      <ImageHolder>
        <img src={imgUrl.href} width={80} height={80} alt={name} />
      </ImageHolder>
      <FlexBox as="section" direction="column" align="stretch" padding="0 0 8px 8px">
        <Title level={3} weight="bold" margin="0 0 8px 0">{name}</Title>
        <Text
          size="large"
          weight="bold"
          margin="0 0 8px 0"
        >
          {formatCurrency(price)}
        </Text>
      </FlexBox>
    </Header>
  )
};

export default ProductPreview;
