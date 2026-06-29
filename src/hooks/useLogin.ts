import { useAppDispatch } from '@/hooks/useAppDispatch';
import { errorSave, loginSuccess } from '@/redux/app';
import { useLazyLoginQuery } from '@/redux/app/app.api';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [login, { isFetching: isLoginLoading }] = useLazyLoginQuery();

  /**
   * Проверяет, подключилось мобильное устройство к теплице или нет
   * если подключилось, то сохраняет в системе true
   * @return boolean
   */
  async function handleLogin() {
    try {
      const loginResponse = await login().unwrap();
      dispatch(loginSuccess(loginResponse));
    } catch {
      dispatch(
        errorSave('При попытке подключиться к теплице, произошла ошибка')
      );
    }
  }

  return { handleLogin, isLoginLoading };
};
