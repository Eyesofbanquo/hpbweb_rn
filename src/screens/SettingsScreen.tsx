import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { NormalSearch } from '@eyesofbanquo/hpbtypes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, ActivityIndicator, Button } from 'react-native';

import { SettingsStackParamList } from '../navigation/settings-stack';

type NavigationProps = StackNavigationProp<SettingsStackParamList, 'Root'>;
type RouteProps = RouteProp<SettingsStackParamList, 'Root'>;

type Props = {
  navigation: NavigationProps;
  route: RouteProps;
};

const BOOKS_QUERY = gql`
  query GetBooks {
    books: normal(input: { search: "Christopher Moore" }) {
      id
      slug
      __typename
      gqlType
      name
      categories {
        id
        name
      }
    }
  }
`;

interface NormalSearchResults {
  books: [NormalSearch];
}

export const SettingsScreen: React.FC<Props> = () => {
  const {
    loading,
    error,
    data,
    refetch,
    networkStatus,
  } = useQuery<NormalSearchResults>(BOOKS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View>
      {data.books.map((book, index) => {
        return (
          <View key={index}>
            <Text>{book.name}</Text>
          </View>
        );
      })}
      <Button
        title="Refetch data"
        onPress={() => {
          refetch();
        }}
      />
    </View>
  );
};
