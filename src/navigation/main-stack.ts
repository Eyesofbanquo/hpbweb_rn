import { createNativeStackNavigator } from 'react-native-screens/native-stack';

export type MainStackParamList = {
  Search: undefined;
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
