import { FC, useMemo } from 'react';
import { FlexBox, Text, Title } from 'activate-components';
import { ProductModel } from 'models/product';
import { formatCurrency } from 'helpers/numbers';
import productsApi from 'api/products';
import { Container, ImageHolder } from './styled';

const ProductPreview: FC<ProductModel> = (props) => {
  const { $id, name, price, bucket, thumbnail } = props;
  const imgUrl = useMemo(() => productsApi.fetchThumbnail(bucket, thumbnail), []);

  return (
    <Container to={`/product/${$id}`}>
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
    </Container>
  )
};

export default ProductPreview;
