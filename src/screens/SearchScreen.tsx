import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native';
import { MainStackParamList } from '../navigation/main-stack';

// export const SearchScreenNavigationProp = StackNavigationProp<MainStackParamList, "Search">;

export type SearchScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<MainStackParamList, 'Search'>;

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = () => <Text>Hello</Text>;
