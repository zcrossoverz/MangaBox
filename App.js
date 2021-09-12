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
        <Stack.Screen name="History" component={ListHistory} />
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