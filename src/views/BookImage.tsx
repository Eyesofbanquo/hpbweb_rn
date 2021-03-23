import React, { useState } from 'react';

import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
  BookImageServiceProps,
  useBookImageService,
} from '../hooks/useBookImageService';

interface Props {
  index?: string;
  upc: string;
  width?: number;
  height?: number;
  onPress?: () => void;
}

type CurrentImageSource = 'hpb' | 'alibris' | 'missing';

type BookImageServiceKeys = keyof BookImageServiceProps;

export const BookImage: React.FC<Props> = ({
  index,
  upc,
  onPress,
  width: injectedWidth,
  height: injectedHeight,
}) => {
  const { response } = useBookImageService(upc);
  const [fallback, setFallback] = useState<boolean>(false);
  const [currentSource, setCurrentSource] = useState<BookImageServiceKeys>(
    'hpb',
  );

  const { width, height } = Dimensions.get('window');
  const usableWidth = injectedWidth ? injectedWidth : width;
  const usableHeight = injectedHeight ? injectedHeight : height;

  const onError = () => {
    // setFallback(true);
    console.log(currentSource);
    setCurrentSource((oldValue) => {
      switch (oldValue) {
        case 'hpb':
          return 'alibris';
        case 'alibris':
          return 'missing';
        default:
          return 'missing';
      }
    });
  };

  if (!response) {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={width / 3}
          height={styles.image.height}
        />
      </SkeletonPlaceholder>
    );
  }

  return (
    <TouchableOpacity
      style={{ width: usableWidth / 3, height: usableHeight }}
      onPress={onPress}>
      <FastImage
        key={index}
        style={{ flex: 1 }}
        source={{
          uri: response[currentSource],
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onError={onError}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '33%',
    height: 200,
  },
});
