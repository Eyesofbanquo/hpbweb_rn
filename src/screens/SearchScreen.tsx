import { RouteProp } from '@react-navigation/native';
import { Text } from 'react-native';
import { SearchStackParamList } from '../navigation/search-stack';

import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = () => <Text>Hello</Text>;
