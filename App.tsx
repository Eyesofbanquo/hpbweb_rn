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

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { SearchStackScreen } from './src/navigation/search-stack';
import { SettingsTab } from './src/navigation/settings-stack';
import { MainTab } from './src/navigation/tab-stack';

enableScreens();

const App = () => {
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
