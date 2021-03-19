import { useEffect } from 'react';

import remoteConfig from '@react-native-firebase/remote-config';

import { DefaultConfig } from './constants/config-values';

/**
 * * The `remote config` fetch interval
 */
const CONFIG_FETCH_INTERVAL = 30;

/**
 * * Used to initialize `Firebase Remote Config`.
 */
const setupConfig = () => {
  remoteConfig()
    .setConfigSettings({
      minimumFetchIntervalMillis: CONFIG_FETCH_INTERVAL,
    })
    .then(() => {
      return remoteConfig().setDefaults(DefaultConfig);
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then((fetchedRemotely) => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved and activated');
      } else {
        console.log('NO configs were fetched');
      }
    });
};

/**
 * * The hook used to initialize `Firebase Remote Config`. Call this as early as possible within this app.
 *
 * @param None - This function has 0 parameters.
 * @returns Nothing
 */
export const useSetupConfig = () => {
  useEffect(() => {
    setupConfig();
  }, []);
};
