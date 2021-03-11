import React, { useEffect, useState } from 'react';

// import { BOOK_API_URL } from '@env';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Text, ScrollView, FlatList, View } from 'react-native';

import { SearchStackParamList } from '../navigation/search-stack';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = ({ navigation, route }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://8x6i7fbaae.execute-api.us-east-1.amazonaws.com/dev/search/live',
        {
          params: { search: 'Christopher Moore' },
        },
      )
      .then((response) => {
        setBooks(response.data.hits);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <Text>item.author</Text>
          </View>
        )}
        numColumns={3}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};
