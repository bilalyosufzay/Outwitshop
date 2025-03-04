import 'react-native-polyfill-globals/auto';  // Fix for setImmediate
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Outwit Shop!</Text>
    </View>
  );
}
