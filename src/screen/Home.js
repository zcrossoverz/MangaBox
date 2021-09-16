import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GetListManga from '../components/home/GetListManga';
import GetListHistory from '../components/home/GetListHistory';

function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
  
  const Tab = createBottomTabNavigator();
  
  function Home() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Mới cập nhật - nettruyen"
          component={GetListManga}
          options={{
            tabBarLabel: 'Mới',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="github" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Lịch sử đọc truyện"
          component={GetListHistory}
          options={{
            tabBarLabel: 'Lịch sử',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="history" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Thư viện',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  export default Home;