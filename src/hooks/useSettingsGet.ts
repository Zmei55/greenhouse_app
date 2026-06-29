import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { errorSave } from '@/redux/app';
import { isSettingsLoadingSave, settingsSave } from '@/redux/settings';
import { useLazyGetAllSettingsQuery } from '@/redux/settings/settings.api';

export const useSettingsGet = () => {
  const dispatch = useAppDispatch();
  const [get, { isFetching }] = useLazyGetAllSettingsQuery();

  useEffect(() => {
    dispatch(isSettingsLoadingSave(isFetching));
  }, [dispatch, isFetching]);

  async function handleSettingsGetting() {
    try {
      const res = await get().unwrap();
      dispatch(settingsSave(res));
    } catch {
      dispatch(
        errorSave('При попытке получить настройки приложения, произошла ошибка')
      );
    }
  }

  return { handleSettingsGetting };
};
