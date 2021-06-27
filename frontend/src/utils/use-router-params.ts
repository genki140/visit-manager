import { useGetAreasQuery, useGetUserOrganizationsQuery } from '@/types/graphql';
import { useRouter } from 'next/router';

export const useRouterParams = () => {
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  const areaName = (router.query.areaName ?? '').toString();

  // const currentUser = useGetCurrentUserQuery();

  const organizations = useGetUserOrganizationsQuery();
  const areas = useGetAreasQuery();

  const getOrganizationId = () => {
    const value = organizations.data?.userOrganizations.find(
      (x) => x.organization.id.toString() === organizationName || x.organization.name === organizationName,
    )?.organization.id;
    return value != null ? Number(value) : 0;
  };

  return {
    organizationName,
    areaName,
    hasOrganization: organizationName !== '',
    hasOrganizationAndArea: organizationName !== '' && areaName !== '',
    // 組織名文字列からIDを取得
    getOrganizationId,
    getAreaId: () => {
      const value = areas.data?.areas
        .filter((x) => x.organizationId === getOrganizationId())
        .find((x) => x.id.toString() === areaName || x.name === areaName)?.id;
      return value != null ? Number(value) : 0;
    },
  };
};
