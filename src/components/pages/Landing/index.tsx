import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  SpinningDots,
  PickList,
  PickItem,
  FlexBox,
  SvgIcon,
  Text,
  Title,
  Icons,
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
    <PickItem value={cat.$id} key={cat.$id}>
      <SvgIcon icon={cat.icon as Icons} size="page" color="BRAND" />
      <Text color="brand" size="large" mT>{cat.name}</Text>
    </PickItem>
  ));

  return (
    <>
      <Title level={1} color="brand" margin="16px auto">Categorías</Title>
      <PickList color="brand" cols={2}>
        {categories}
      </PickList>
    </>
  );
};

export default LandingPage;
