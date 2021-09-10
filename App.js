import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import Main from './src/page/Main';

export default function App() {
  return (
    <View>
      {/* <StatusBar style="auto" /> */}
      <Main />
    </View>
  );
}
