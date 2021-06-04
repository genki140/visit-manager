import { useStoreState } from '@/ducks/store';
import { useRouter } from 'next/router';
import { TypeUtil } from './type-helper';

export const useRouterParams = () => {
  const router = useRouter();
  const user = useStoreState((x) => x.loginUser);

  // user?.roledUsers.find(x=>x.organization.name === routerParams.organizationName )

  // const organizationName = ;
  // // const organizationPath = '/' + organizationName;
  // const areaName = (router.query.areaName ?? '').toString();
  // // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);
  // // if (organizationName === '' || areaName === '') {
  // //   return null;
  // // }

  const organizationName = (router.query.organizationName ?? '').toString();
  const areaName = (router.query.areaName ?? '').toString();

  return {
    organizationName,
    areaName,
    hasOrganizationAndArea: organizationName !== '' && areaName !== '',
    // 組織名文字列からIDを取得
    getOrganizationId: () =>
      Number(
        user?.roledUsers.find(
          (x) => x.organization.id.toString() === organizationName || x.organization.name === organizationName,
        )?.id,
      ),
  };
};
