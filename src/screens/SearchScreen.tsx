import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
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

export const SearchScreen: React.FC<{
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}> = () => {
  const { response } = useNetwork<LiveSearch>({
    endpoint: 'live',
    options: { search: 'Christopher Moore' },
  });

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={response}
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
