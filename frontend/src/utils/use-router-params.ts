import { useStoreState } from '@/ducks/store';
import { useRouter } from 'next/router';

export const useRouterParams = () => {
  const router = useRouter();
  const user = useStoreState((x) => x.loginUser);

  const organizationName = (router.query.organizationName ?? '').toString();
  const areaName = (router.query.areaName ?? '').toString();

  const getOrganizationId = () => {
    const value = user?.userOrganizations.find(
      (x) => x.organization.id.toString() === organizationName || x.organization.name === organizationName,
    )?.organization.id;
    return value != null ? Number(value) : 0;
  };

  return {
    organizationName,
    areaName,
    hasOrganizationAndArea: organizationName !== '' && areaName !== '',
    // 組織名文字列からIDを取得
    getOrganizationId,
    getAreaId: () => {
      const value = user?.userOrganizations
        .find((x) => x.organization.id === getOrganizationId())
        ?.organization.areas.find((x) => x.id.toString() === areaName || x.name === areaName)?.id;
      return value != null ? Number(value) : 0;
    },
  };
};
