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

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { NormalSearch } from '@eyesofbanquo/hpbtypes';
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

const BOOK_Q = gql`
  query BookQueryWrite {
    book {
      id
      category
    }
  }
`;

const typeDefs = gql`
  type Book {
    id: String
    category: String
  }

  type BookResult {
    books: [Book]
  }

  extend type Query {
    books: BookResult
  }
`;

const client = new ApolloClient({
  uri: 'https://8chh8ip4l4.execute-api.us-east-1.amazonaws.com/dev/graphql',
  connectToDevTools: true,
  typeDefs: typeDefs,
  cache: new InMemoryCache({
    possibleTypes: {
      Search: ['NormalSearch', 'TopSearch', 'LiveSearch'],
    },
    typePolicies: {
      books: {},
      BookResult: {
        fields: {
          books: {
            read: (value, { cache }) => {},
          },
        },
      },
      Category: {
        keyFields: ['id', 'name'],
      },
      NormalSearch: {
        keyFields: ['id', 'slug'],
        fields: {
          id: {
            merge: (existing: string, incoming: string, { cache }) => {
              cache.writeFragment({
                id: `BookResult:1`,
                fragment: gql`
                  fragment MyBook on Book {
                    id
                    category
                  }
                `,
                data: {
                  __typename: 'Book',
                  id: incoming,
                  category: 'none',
                },
              });
              console.log('refetched');
              return incoming;
            },
          },
        },
      },
    },
  }),
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
