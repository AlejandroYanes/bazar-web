import { FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import {
  FlexBox,
  formatCurrency,
  Paragraph,
  SpinningDots,
  Text,
  Title
} from 'activate-components';
import productsApi from 'api/products';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';

const ProductsPage: FC = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, data, error } = useQuery(
    QueryKey.FETCH_PRODUCTS,
    () => productsApi.listByCategory(id),
  );

  if (error) {
    return (
      <ErrorScreen lines={[`We couldn't load the products.`]} />
    );
  }

  if (isLoading) {
    return (
      <FlexBox direction="column" justify="center" align="center" height="120px">
        <SpinningDots />
      </FlexBox>
    );
  }

  const products = data.documents.map((product) => (
    <FlexBox direction="column" align="stretch" key={product.$id} mT mB>
      <Title level={3}>{product.name}</Title>
      <Text>{formatCurrency(product.price)}</Text>
      <Paragraph>{product.description}</Paragraph>
    </FlexBox>
  ));

  return (
    <FlexBox padding="16px">{products}</FlexBox>
  );
};

export default ProductsPage;
