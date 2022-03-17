import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { FlexBox, LinkButton, SpinningDots, SvgIcon, Title, } from 'activate-components';
import categoriesApi from 'api/categories';
import subCategoriesApi from 'api/sub-categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';
import PageBackButton from 'components/experience/PageBackButton';
import { SearchBox } from '../../experience/Search';

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
    return (
      <FlexBox direction="column" justify="center" align="center" height="120px">
        <SpinningDots />
      </FlexBox>
    );
  }

  const subCategories = subs.documents.map((cat) => (
    <LinkButton key={cat.$id} to={`/category/${cat.$id}/products`}>
      <FlexBox align="center" justify="space-between" mT mB>
        <Title level={2}>{cat.name}</Title>
        <SvgIcon icon="CHEVRON_RIGHT" />
      </FlexBox>
    </LinkButton>
  ));

  return (
    <>
      <SearchBox />
      <PageBackButton name={category.name} />
      <FlexBox direction="column" align="stretch" padding="0 16px 32px">
        {subCategories}
      </FlexBox>
    </>
  );
};

export default SecondLevelPage;
