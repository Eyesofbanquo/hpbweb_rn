import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import { SettingsStackParamList } from '../navigation/settings-stack';

type NavigationProps = StackNavigationProp<SettingsStackParamList, 'Root'>;
type RouteProps = RouteProp<SettingsStackParamList, 'Root'>;

type Props = {
  navigation: NavigationProps;
  route: RouteProps;
};

export const SettingsScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>This is the Settings Screen!</Text>
    </View>
  );
};
