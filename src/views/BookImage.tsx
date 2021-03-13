import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  BookImageServiceProps,
  useBookImageService,
} from '../hooks/useBookImageService';

interface Props {
  index: string;
  upc: string;
}

type CurrentImageSource = 'hpb' | 'alibris' | 'missing';

type BookImageServiceKeys = keyof BookImageServiceProps;

export const BookImage: React.FC<Props> = ({ index, upc }) => {
  const { response } = useBookImageService(upc);
  const [fallback, setFallback] = useState<boolean>(false);
  const [currentSource, setCurrentSource] = useState<BookImageServiceKeys>(
    'hpb',
  );

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
    return <View style={{ ...styles.image, backgroundColor: 'red' }} />;
  }

  return (
    <FastImage
      key={index}
      style={styles.image}
      source={{
        uri: response[currentSource],
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '33%',
    height: 200,
  },
});
