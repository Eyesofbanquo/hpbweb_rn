import React, { useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { useNetwork } from '../hooks/useNetwork';
import { LiveSearch } from '../model/live-search';
import { SearchStackParamList } from '../navigation/search-stack';
import { BookImage } from '../views/BookImage';

export type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

export type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'Search'>;

type SearchDebouncedType = _.DebouncedFunc<(searchText: string) => void>;
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
}> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<
    SearchDebouncedType | undefined
  >(undefined);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const {
    response,
    updateSearch: updateNetworkSearch,
    setIsLoading,
    isLoading,
  } = useNetwork<LiveSearch>({
    endpoint: 'live',
    options: { search: searchText },
  });

  const updateSearch = (search: string) => {
    setSearchText(search);
    setIsLoading(true);

    const makeRequest = _.debounce(makeDebouncedRequest, 300);

    setSearchQuery((previous) => {
      if (previous !== undefined && previous.cancel) {
        previous.cancel();
      }

      return makeRequest;
    });

    makeRequest(search);
  };

  const makeDebouncedRequest = (search: string) => {
    updateNetworkSearch(search);
  };

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <SearchBar
        placeholder="Type Here..."
        platform="ios"
        value={searchText}
        onChangeText={updateSearch}
        showLoading={isLoading}
      />
      {response.length > 0 && (
        <FlatList
          data={bookFilteredList(response)}
          renderItem={({ item, index }) => {
            return (
              item.upc && (
                <BookImage
                  upc={item.upc}
                  index={`${index}`}
                  onPress={() => {
                    navigation.navigate('BookProduct', {
                      slug: item.slug,
                      navigationTitle: item.name,
                    });
                  }}
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
