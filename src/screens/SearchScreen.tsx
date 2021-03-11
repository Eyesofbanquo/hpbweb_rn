import React, { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Text, ScrollView, FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { SearchStackParamList } from '../navigation/search-stack';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

const imageUrlFactor = (slug: string) => {
  return `https://books.images.hpb.com/${slug}/large.jpg`;
};

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
        setBooks(response.data);
        console.log(response.data.map((hit) => imageUrlFactor(hit.upc)));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={books}
        renderItem={({ item }) => {
          return (
            item.slug && (
              <FastImage
                style={{ width: '33%', height: 200 }}
                source={{
                  uri: imageUrlFactor(item.upc),
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )
          );
        }}
        numColumns={3}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};
