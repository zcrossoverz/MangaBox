import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import DetailManga from './src/screen/GetDetailManga';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Details" component={DetailManga} options={{
                headerShown: true,
                headerBlurEffect: true
            }}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
