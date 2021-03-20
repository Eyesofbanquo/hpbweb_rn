import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import { SearchStackParamList } from '../navigation/search-stack';

export type BookScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'BookProduct'
>;
export type BookScreenRouteProp = RouteProp<
  SearchStackParamList,
  'BookProduct'
>;

interface BookScreenProps {
  navigation: BookScreenNavigationProp;
  route: BookScreenRouteProp;
}

export const BookScreen: React.FC<BookScreenProps> = ({
  navigation,
  route,
}) => {
  const { slug, navigationTitle } = route.params;
  navigation.setOptions({
    title: navigationTitle,
  });

  return (
    <View>
      <Text>Hi there from ID: {slug} </Text>
    </View>
  );
};
