import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MainTabParamsList } from './tab-stack';
import { SettingsScreen } from '../screens/SettingsScreen';

export type SettingsStackParamList = {
  Root: undefined;
};

type SettingsScreenStackProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamsList, 'Settings'>,
  StackNavigationProp<SettingsStackParamList>
>;

type SettingsScreenProps = {
  navigation: SettingsScreenStackProps;
};

export const SettingsScreenStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsTab: React.FC<SettingsScreenProps> = () => (
  <SettingsScreenStack.Navigator initialRouteName="Root">
    <SettingsScreenStack.Screen
      name="Root"
      component={SettingsScreen}
      options={{ headerLargeTitle: true, title: 'Settings' }}
    />
  </SettingsScreenStack.Navigator>
);
