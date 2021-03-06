/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { MainStack } from './src/navigation/main-stack';
import { SearchScreen } from './src/screens/SearchScreen';

enableScreens();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainStack.Navigator>
        <MainStack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerLargeTitle: true, title: 'Search' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
