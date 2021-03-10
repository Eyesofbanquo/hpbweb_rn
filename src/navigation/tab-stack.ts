import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

import { SearchStackParamList } from './search-stack';

export type MainTabParamsList = {
  Search: NavigatorScreenParams<SearchStackParamList>;
  Settings: undefined;
};

export const MainTab = createBottomTabNavigator<MainTabParamsList>();
