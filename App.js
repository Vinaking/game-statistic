import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './component/Home';
import DetailScreen from './component/Detail';
import {View, Text, Button} from "react-native";
import UpdateScreen from './component/Update';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Bảng xếp hạng'
            
          }}
        />
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={({ navigation, route }) => ({
            title: 'Details'
          })}
        />
        <Stack.Screen
          name='Update'
          component={UpdateScreen}
          options={({ navigation, route }) => ({
            title: 'Update'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


