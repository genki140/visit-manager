import { Layout } from '@/components/layouts';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export const Custom404 = () => {
  const router = useRouter();
  return (
    <Layout title="ページが見つかりません">
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          router.back();
        }}
      >
        前の画面に戻る
      </Button>
    </Layout>
  );
};
export default Custom404;
