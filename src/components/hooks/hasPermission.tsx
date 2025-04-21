import { useCallback } from 'react';
import { useAppSelector } from '../../redux/redux-hooks';

const usePermission = () => {
  const userData = useAppSelector((state: any) => state?.authState?.user);

  const hasPermission = useCallback(
    (actionPath: string): boolean => {
      if (!userData?.role?.permissions?.length) return false;
      return userData?.role?.permissions.some(
        (perm: any) => perm.action === actionPath
      );
    },
    [userData?.role?.permissions]
  );

  return { hasPermission };
};

export default usePermission;
