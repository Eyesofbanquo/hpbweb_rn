import { RouteProp } from '@react-navigation/native';
import { Text } from 'react-native';

import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from '../navigation/search-stack';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = () => <Text>Hello</Text>;
