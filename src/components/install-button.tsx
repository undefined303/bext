import { MetaDetailContext } from '@/contexts/meta-detail';
import { browser } from '@/lib';
import { PrimaryButton } from '@fluentui/react';
import { useInterval, useMemoizedFn } from 'ahooks';
import { FC, useContext, useState } from 'react';

type InstallStatus = 'installed' | 'notinstalled' | 'unknown';

export const InstallButton: FC = () => {
  const { currentMeta, id, metaLoading } = useContext(MetaDetailContext);

  const installedChecker = useMemoizedFn((): InstallStatus => {
    const box = browser('installed', currentMeta);
    if (box.code === 0) {
      return box.result ? 'installed' : 'notinstalled';
    }
    return 'unknown';
  });

  const [installStatus, setInstallStatus] = useState(installedChecker);

  useInterval(() => {
    setInstallStatus(installedChecker);
  }, 1000);

  const onClick = () => {
    if (currentMeta && installStatus !== 'installed') {
      console.log(
        browser('install', {
          ...currentMeta,
          id,
          author: `bext/${currentMeta.id}`,
        }),
      );
    } else {
      console.log(browser('uninstall', currentMeta));
    }
  };

  return (
    <PrimaryButton className="ml-2" onClick={onClick} disabled={metaLoading}>
      {installStatus === 'installed' ? '卸载' : '安装此版本'}
    </PrimaryButton>
  );
};
