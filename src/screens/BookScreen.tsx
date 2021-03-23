import React, { useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  LayoutProps,
  layout,
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  flex,
} from 'styled-system';

import { useNetwork } from '../hooks/useNetwork';
import { Product } from '../model/product';
import { SearchStackParamList } from '../navigation/search-stack';
import { HPText } from '../ui/text';
import { theme } from '../ui/theme';

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
const Box = styled.View<
  { bg: keyof typeof theme.colors } & SpaceProps & FlexboxProps
>`
  ${color}
  ${space}
  ${flexbox}
`;
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

  if (!response) {
    return null;
  }

  console.log(response.name);

  return (
    <>
      <View>
        <Text>Hi there from ID: {response.name} </Text>
      </View>
      <HPText fontSize="largeTitle" fontWeight="light">
        This is text
      </HPText>
    </>
  );
};
