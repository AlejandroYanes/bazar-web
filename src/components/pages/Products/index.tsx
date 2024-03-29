import { FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { FlexBox, Title } from '@devland-ui/components';
import productsApi from 'api/products';
import subCategoriesApi from 'api/sub-categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';
import ProductPreview from 'components/experience/ProductPreview';
import TopBar from 'components/experience/TopBar';
import LoadingPage from '../../experience/LoadingPage';

const ProductsPage: FC = () => {
  const { id } = useParams() as { id: string };
  const {
    isLoading: loadingCategory,
    data: category,
    error: categoryError,
  } = useQuery(
    [QueryKey.FETCH_SUB_CATEGORY, id],
    () => subCategoriesApi.get(id),
  );
  const {
    isLoading: loadingProduct,
    data: products,
    error: productsError,
  } = useQuery(
    [QueryKey.FETCH_PRODUCTS, id],
    () => productsApi.listByCategory(id),
  );

  const isLoading = loadingCategory || loadingProduct;
  const error = categoryError || productsError;

  if (error) {
    return (
      <ErrorScreen lines={[`We couldn't load the products.`]} />
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const productPreviews = products.documents.map((product) => (
    <ProductPreview key={product.$id} {...product} />
  ));

  return (
    <>
      <TopBar />
      <Title level={1} size={38} padding="16px" ellipsis>{category.name}</Title>
      <FlexBox
        direction="column"
        align="stretch"
        padding="0 16px 32px"
      >
        {productPreviews}
      </FlexBox>
    </>
  );
};

export default ProductsPage;
