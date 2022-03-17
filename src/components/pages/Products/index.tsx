import { FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { FlexBox, SpinningDots } from 'activate-components';
import productsApi from 'api/products';
import subCategoriesApi from 'api/sub-categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';
import ProductPreview from 'components/experience/ProductPreview';
import PageBackButton from 'components/experience/PageBackButton';
import { SearchBox } from '../../experience/Search';

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
    return (
      <FlexBox direction="column" justify="center" align="center" height="120px">
        <SpinningDots />
      </FlexBox>
    );
  }

  const productPreviews = products.documents.map((product) => (
    <ProductPreview key={product.$id} {...product} />
  ));

  return (
    <>
      <SearchBox />
      <PageBackButton name={category.name} />
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
