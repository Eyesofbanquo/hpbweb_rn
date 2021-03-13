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
import { BookImage } from '../views/BookImage';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

const bookFilteredList = (response: LiveSearch[]) => {
  if (response.length === 0 || Array.isArray(response) === false) {
    return [];
  }

  return response.filter(
    (res) => res.type.toLowerCase().includes('book') && res.upc !== undefined,
  );
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

  console.log(bookFilteredList(response).length, searchText);

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
          data={bookFilteredList(response)}
          renderItem={({ item, index }) => {
            return item.upc && <BookImage upc={item.upc} index={`${index}`} />;
          }}
          numColumns={3}
          keyExtractor={(item, index) => `${index}`}
        />
      )}
    </View>
  );
};
