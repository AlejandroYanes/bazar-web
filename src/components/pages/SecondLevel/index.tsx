import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import {
  ChevronRightIcon,
  FlexBox,
  LinkButton,
  Title,
} from '@devland-ui/components';
import categoriesApi from 'api/categories';
import subCategoriesApi from 'api/sub-categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';
import TopBar from 'components/experience/TopBar';
import LoadingPage from '../../experience/LoadingPage';

const SecondLevelPage: FC = () => {
  const { id } = useParams() as { id: string };
  const {
    isLoading: isLoadingCategory,
    data: category,
    error: categoryError,
  } = useQuery(QueryKey.FETCH_CATEGORY, () => categoriesApi.get(id));
  const {
    isLoading: isLoadingSubs,
    data: subs,
    error: subsError,
  } = useQuery(
    [QueryKey.FETCH_SUB_CATEGORIES, id],
    () => subCategoriesApi.listByCategory(id),
  );

  const isLoading = isLoadingCategory || isLoadingSubs;
  const error = categoryError || subsError;

  if (error) {
    return (
      <ErrorScreen lines={[`We couldn't load the categories.`]} />
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const subCategories = subs.documents.map((cat) => (
    <LinkButton key={cat.$id} to={`/category/${cat.$id}/products`}>
      <FlexBox align="center" justify="space-between" mT mB>
        <Title level={2}>{cat.name}</Title>
        <ChevronRightIcon />
      </FlexBox>
    </LinkButton>
  ));

  return (
    <>
      <TopBar />
      <Title level={1} size={38} padding="16px" ellipsis>{category.name}</Title>
      <FlexBox direction="column" align="stretch" padding="0 16px 32px">
        {subCategories}
      </FlexBox>
    </>
  );
};

export default SecondLevelPage;
