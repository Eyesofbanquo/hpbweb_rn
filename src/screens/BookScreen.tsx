import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import { useNetwork } from '../hooks/useNetwork';
import { Product } from '../model/product';
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

  useEffect(() => {
    navigation.setOptions({
      title: navigationTitle,
    });
  }, []);

  const { response, setIsLoading, isLoading } = useNetwork<Product>({
    endpoint: 'product',
    options: {
      slug: slug,
    },
  });

  console.log(response);

  return (
    <View>
      <Text>Hi there from ID: {slug} </Text>
    </View>
  );
};
