import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useBookImageService } from '../hooks/useBookImageService';

interface Props {
  index: string;
  upc: string;
}

export const BookImage: React.FC<Props> = ({ index, upc }) => {
  const { response } = useBookImageService(upc);
  const [fallback, setFallback] = useState<boolean>(false);

  const onError = () => {
    setFallback(true);
  };

  return (
    <FastImage
      key={index}
      style={styles.image}
      source={{
        uri: fallback ? response.alibris : response.hpb,
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
