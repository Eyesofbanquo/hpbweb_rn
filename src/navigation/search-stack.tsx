import React from 'react';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { MainTabParamsList } from './tab-stack';

import { BookScreen } from '../screens/BookScreen';
import { SearchScreen } from '../screens/SearchScreen';

export type SearchStackParamList = {
  Search: undefined;
  BookProduct:
    | { slug: string; navigationTitle: string; upc: string }
    | undefined;
};
export const SearchStack = createNativeStackNavigator<SearchStackParamList>();

type SearchStackScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamsList, 'Search'>,
  StackNavigationProp<SearchStackParamList>
>;

export const SearchStackScreen: React.FC<{
  navigation: SearchStackScreenProps;
}> = () => (
  <SearchStack.Navigator initialRouteName="Search">
    <SearchStack.Screen
      name="BookProduct"
      component={BookScreen}
      options={{ title: '' }}
    />
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerLargeTitle: true, title: 'Search' }}
    />
  </SearchStack.Navigator>
);
