import { useFormatMessage } from '@/locales';
import AddIcon from '@material-ui/icons/Add';

import { OrganizationListQueries } from '@/queries/organization-list-queries';
import { FormText } from './form-text';
import { useInputDialog } from './input-dialog';
import { EditControls } from '../edit-controls';

/** 新規組織作成ダイアログを表示ボタン */
export const OrganizationCreateButton = () => {
  const f = useFormatMessage();
  const [createOrganizationMutation] = OrganizationListQueries.useCreateUserOrganization();

  // ダイアログの定義
  const dialog = useInputDialog({
    title: '新規組織の追加',
    description: '自分が管理者として所属する新しい組織を作成します。',
    cancelDescription: '新規組織は追加されていません。キャンセルしますか？',
    defaultValues: {
      name: '',
    },
    content: (form) => (
      <>
        <FormText control={form.control} name="name" label="組織名" required maxLength={100} autoFocus />
      </>
    ),
    onSubmit: async (data) => {
      try {
        const result = await createOrganizationMutation({
          variables: {
            name: data.name,
            defaultAreaTypeName: '戸建て',
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
        actions={[
          {
            label: '組織の追加',
            icon: <AddIcon />,
            onClick: () => dialog.open(),
          },
        ]}
      />
      {dialog.dialog}
    </>
  );
};
