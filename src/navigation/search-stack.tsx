import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { SearchScreen } from '../screens/SearchScreen';
import { MainTabParamsList } from './tab-stack';

export type SearchStackParamList = {
  Search: undefined;
};
export const SearchStack = createNativeStackNavigator<SearchStackParamList>();

type SearchStackScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamsList, 'Search'>,
  StackNavigationProp<SearchStackParamList>
>;

export const SearchStackScreen: React.FC<{
  navigation: SearchStackScreenProps;
}> = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerLargeTitle: true, title: 'Search' }}
    />
  </SearchStack.Navigator>
);
