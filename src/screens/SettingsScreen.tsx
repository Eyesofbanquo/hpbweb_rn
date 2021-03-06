import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../navigation/settings-stack';
import { RouteProp } from '@react-navigation/native';

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
