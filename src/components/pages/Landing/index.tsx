import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  SpinningDots,
  FlexBox,
  SvgIcon,
  Title, LinkButton,
} from 'activate-components';
import categoriesApi from 'api/categories';
import { QueryKey } from 'components/providers/Query';
import { ErrorScreen } from 'components/experience/Screens';

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
    return (
      <FlexBox direction="column" justify="center" align="center" height="120px">
        <SpinningDots />
      </FlexBox>
    );
  }

  const categories = data.documents.map((cat) => (
    <LinkButton key={cat.$id} to={`/category/${cat.$id}`}>
      <FlexBox align="center" justify="space-between" mT mB>
        <Title level={2}>{cat.name}</Title>
        <SvgIcon icon="CHEVRON_RIGHT" />
      </FlexBox>
    </LinkButton>
  ));

  return (
    <FlexBox direction="column" align="stretch" padding="16px">
      <Title level={1} color="brand" margin="0 0 16px">Categorías</Title>
      {categories}
    </FlexBox>
  );
};

export default LandingPage;
