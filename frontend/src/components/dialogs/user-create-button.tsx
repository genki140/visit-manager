import { useFormatMessage } from '@/locales';
import { Button } from '@material-ui/core';

import gql from 'graphql-tag';
import { useCreateUserMutation } from '@/types/graphql';
import { FormText } from './form-text';
import { useInputDialog } from './input-dialog';

gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;

/** 新規組織作成ダイアログを表示ボタン */
export const UserCreateButton = (props: { onCreated: (username: string, password: string) => void }) => {
  const f = useFormatMessage();
  const [createUserMutation] = useCreateUserMutation();

  // ダイアログの定義
  const dialog = useInputDialog({
    title: f((x) => x.create_new_account),
    description: f((x) => x.create_new_account_description),
    cancelDescription: 'アカウントは作成されていません。キャンセルしますか？',
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    content: (form) => (
      <>
        <FormText
          control={form.control}
          name="name"
          label={f((x) => x.user_name)}
          placeholder="例：田中 太郎"
          required
          maxLength={100}
          autoFocus
        />
        <FormText
          control={form.control}
          name="username"
          label={f((x) => x.user_id)}
          placeholder="例：田中 太郎"
          required
          maxLength={100}
        />
        <FormText
          control={form.control}
          name="password"
          label={f((x) => x.password)}
          type="password"
          required
          maxLength={100}
        />
        <FormText
          control={form.control}
          name="confirmPassword"
          label={f((x) => x.password_confirm)}
          type="password"
          required
          maxLength={100}
          validate={(v) =>
            (v?.toString() ?? '') === form.getValues('password') ? undefined : '入力したパスワードと異なります'
          }
        />
      </>
    ),
    onSubmit: async (data) => {
      try {
        await createUserMutation({
          variables: {
            user: {
              name: data.name,
              username: data.username,
              password: data.password,
            },
          },
        });
        props.onCreated(data.username, data.password);
      } catch (e) {
        const code = e.graphQLErrors?.[0]?.extensions?.code;
        return code;
      }
    },
  });

  return (
    <>
      <Button variant="outlined" size="large" fullWidth onClick={() => dialog.open()}>
        {f((x) => x.create_new_account)}
      </Button>
      {dialog.dialog}
    </>
  );
};
