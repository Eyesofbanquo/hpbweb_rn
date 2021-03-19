/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { SearchStackScreen } from './src/navigation/search-stack';
import { SettingsTab } from './src/navigation/settings-stack';
import { MainTab } from './src/navigation/tab-stack';
import remoteConfig from '@react-native-firebase/remote-config';

enableScreens();

const App = () => {
  useEffect(() => {
    remoteConfig()
      .setConfigSettings({
        minimumFetchIntervalMillis: 30,
      })
      .then(() => {
        return remoteConfig().setDefaults({
          aweseome_new_feature: 'disabled',
        });
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
          console.log('Configs were retrieved and activated');
        } else {
          console.log('NO configs were fetched');
        }
      });
  }, []);
  const awesomeNewFeature = remoteConfig().getValue('awesome_new_feature');

  console.log(awesomeNewFeature.getSource());
  if (awesomeNewFeature.asString() == 'enabled') {
    console.log('this was activated');
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainTab.Navigator>
        <MainTab.Screen name="Search" component={SearchStackScreen} />
        <MainTab.Screen name="Settings" component={SettingsTab} />
      </MainTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
