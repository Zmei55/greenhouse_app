import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loginSuccess } from '@/redux/app';
import { useLazyLoginQuery } from '@/redux/app/app.api';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, { isFetching: isLoginLoading }] = useLazyLoginQuery();

  async function handleLogin() {
    try {
      const loginResponse = await login().unwrap();
      dispatch(loginSuccess(loginResponse));
    } catch (error) {
      console.error('useLogin: ', error);
    }
  }

  return { handleLogin, isLoginLoading };
};
