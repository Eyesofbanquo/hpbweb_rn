/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import remoteConfig from '@react-native-firebase/remote-config';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { useSetupConfig } from './src/config/useConfig';
import { SearchStackScreen } from './src/navigation/search-stack';
import { SettingsTab } from './src/navigation/settings-stack';
import { MainTab } from './src/navigation/tab-stack';

enableScreens();

const App = () => {
  useSetupConfig();

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
