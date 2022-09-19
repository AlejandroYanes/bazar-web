import { FC } from 'react';
import { useQuery } from 'react-query';
import { ChevronRightIcon, FlexBox, LinkButton, Title, } from '@devland-ui/components';
import categoriesApi from 'api/categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';
import TopBar from 'components/experience/TopBar';
import LoadingPage from 'components/experience/LoadingPage';

const LandingPage: FC = () => {
  const { isLoading, data, error } = useQuery(
    QueryKey.FETCH_CATEGORIES,
    categoriesApi.list,
  );

  if (error) {
    return (
      <ErrorScreen lines={[`We couldn't load the categories.`]} />
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const categories = data.documents.map((cat) => (
    <LinkButton key={cat.$id} to={`/category/${cat.$id}`}>
      <FlexBox align="center" justify="space-between" mT mB>
        <Title level={2}>{cat.name}</Title>
        <ChevronRightIcon />
      </FlexBox>
    </LinkButton>
  ));

  return (
    <>
      <TopBar />
      <Title level={1} size={38} margin="0" padding="16px">
        Categorías
      </Title>
      <FlexBox direction="column" align="stretch" padding="0 16px 32px">
        {categories}
      </FlexBox>
    </>
  );
};

export default LandingPage;
