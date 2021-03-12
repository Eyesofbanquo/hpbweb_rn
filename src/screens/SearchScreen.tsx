import React, { useState, useCallback } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import { imageUrlFactor } from '../factories/image-url-factory';
import { useNetwork } from '../hooks/useNetwork';
import { LiveSearch } from '../model/live-search';
import { SearchStackParamList } from '../navigation/search-stack';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

const filteredResponse = (predicate: string, response?: LiveSearch[]) => {
  if (Array.isArray(response) === false) {
    return [];
  }
  if (predicate.length === 0) {
    return response;
  }
  return response.filter((book) => book.name.includes(predicate));
};

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = () => {
  const [searchText, setSearchText] = useState<string>('');
  const {
    response,
    updateSearch: updateNetworkSearch,
  } = useNetwork<LiveSearch>({
    endpoint: 'live',
    options: { search: searchText },
  });

  const updateSearch = (search: string) => {
    setSearchText(search);
    updateNetworkSearch(search);
  };

  console.log(response, searchText);

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <SearchBar
        placeholder="Type Here..."
        platform="ios"
        value={searchText}
        onChangeText={updateSearch}
      />
      {response.length > 0 && (
        <FlatList
          data={response}
          renderItem={({ item, index }) => {
            return (
              item.slug && (
                <FastImage
                  key={index}
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
      )}
    </View>
  );
};
