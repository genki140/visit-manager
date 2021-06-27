import { useFormatMessage } from '@/locales';
import { MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useRouterParams } from '@/utils/use-router-params';
import { actions, useAppDispatch } from '@/ducks/store';
import { AreaListQueries } from '@/queries/area-list-queries';
import { FormText } from './form-text';
import { useInputDialog } from './input-dialog';
import Button from '@material-ui/core/Button';
import { EditControls } from '../edit-controls';
import { useGetAreaTypesQuery } from '@/types/graphql';

/** 新規組織作成ダイアログを表示ボタン */
export const AreaCreateButton = () => {
  const f = useFormatMessage();
  const [createAreaMutation] = AreaListQueries.useCreateArea();
  const routerParams = useRouterParams();
  const dispatch = useAppDispatch();

  const organizationId = routerParams.getOrganizationId();
  const areaTypes = useGetAreaTypesQuery({
    variables: {
      organizationId: routerParams.getOrganizationId(),
    },
    skip: organizationId !== 0, //とりあえず
  }).data?.areaTypes;

  // ダイアログの定義
  const dialog = useInputDialog({
    title: '新規区域の追加',
    description: '組織内の新しい区域を作成します。',
    cancelDescription: '新規区域は追加されていません。キャンセルしますか？',
    defaultValues: {
      name: '',
      description: '',
      areaTypeId: 1,
    },
    content: (form) => (
      <>
        <FormText control={form.control} name="name" label="区域名" required maxLength={100} autoFocus />
        <FormText control={form.control} name="description" label="解説" maxLength={100} />
        <FormText control={form.control} name="areaTypeId" label="区域種別">
          {areaTypes?.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              {x.name}
            </MenuItem>
          ))}
        </FormText>
      </>
    ),
    commands: (
      <>
        <Button variant="contained" style={{ backgroundColor: '#FF0000', color: 'white' }}>
          削除時このボタン
        </Button>
      </>
    ),
    onSubmit: async (data) => {
      try {
        const result = await createAreaMutation({
          variables: {
            organizationId: routerParams.getOrganizationId(),
            name: data.name,
            description: data.description,
            areaTypeId: data.areaTypeId,
          },
        });

        console.log('現在、情報再取得は無効');
        // unwrapResult(await dispatch(asyncRefreshLoginUser())); // 情報再取得
      } catch (e) {
        const code = e.graphQLErrors?.[0]?.extensions?.code;
        return code;
      }
    },
  });

  return (
    <>
      <EditControls
        onToggle={(edit) => {
          dispatch(actions.setAreaListEditing({ editing: edit }));
        }}
        actions={[
          {
            label: '区域の追加',
            icon: <AddIcon />,
            onClick: () => dialog.open(),
          },
        ]}
      />
      {dialog.dialog}
    </>
  );
};
