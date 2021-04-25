import { useRouter } from 'next/router';

export const useRouterParams = () => {
  const router = useRouter();

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
  };
};
