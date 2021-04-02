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

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import remoteConfig from '@react-native-firebase/remote-config';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components/native';

import { useSetupConfig } from './src/config/useConfig';
import { SearchStackScreen } from './src/navigation/search-stack';
import { SettingsTab } from './src/navigation/settings-stack';
import { MainTab } from './src/navigation/tab-stack';
import { theme } from './src/ui/theme';

enableScreens();

const client = new ApolloClient({
  uri: 'https://8chh8ip4l4.execute-api.us-east-1.amazonaws.com/dev/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  useSetupConfig();

  const awesomeNewFeature = remoteConfig().getValue('awesome_new_feature');

  console.log(awesomeNewFeature.getSource());
  if (awesomeNewFeature.asString() == 'enabled') {
    console.log('this was activated');
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <ThemeProvider theme={theme}>
          <MainTab.Navigator>
            <MainTab.Screen name="Search" component={SearchStackScreen} />
            <MainTab.Screen name="Settings" component={SettingsTab} />
          </MainTab.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
