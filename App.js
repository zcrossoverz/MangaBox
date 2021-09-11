// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { View, Text } from 'react-native';
// import HistoryPage from './src/page/HistoryPage';
// import Main from './src/page/Main';

// export default function App() {
//   return (
//     <View>
//       {/* <StatusBar style="auto" /> */}
//       <HistoryPage />
//     </View>
//   );
// }

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';
import ListHistory from './src/components/List/History';
import ListManga from './src/page/GetListManga';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Main' }}
        />
        <Stack.Screen name="Profile" component={ListManga} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to m"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default App;