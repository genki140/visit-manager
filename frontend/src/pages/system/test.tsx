import { Layout } from '@/components/layouts';
import { useAddTestMutation, useTestAddedSubscription } from '@/types/graphql';
import { gql } from '@apollo/client';
import { Button } from '@material-ui/core';

// ユーザーエリアの全情報を取得
gql`
  subscription testAdded {
    testAdded
  }
  mutation addTest {
    addTest
  }
`;

export const SubscriptionTest = () => {
  const { data } = useTestAddedSubscription();
  const [addTestMutation] = useAddTestMutation();

  return (
    <Layout title="実験場">
      <h2>Graphql Subscription</h2>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          addTestMutation();
        }}
      >
        {data?.testAdded ?? 0}
      </Button>
    </Layout>
  );
};
export default SubscriptionTest;
