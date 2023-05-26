import { StatusBar } from 'expo-status-bar';
import LoginScreen from './views/authentication/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './views/authentication/RegisterScreen';
import TodoScreen from './views/tabs/todo/TodoScreen';
import { Octicons } from '@expo/vector-icons'; 
import { Provider } from 'react-redux';
import { store } from './redux/store'
import ReadingScreen from './views/tabs/reading/ReadingScreen';
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {backgroundColor: '#071427'}}}>
      <Tab.Screen name="Todo" component={TodoScreen} options={{
        tabBarIcon: () => {
          return <Octicons name="tasklist" size={24} color="#C6EAA7" />
        },
        tabBarShowLabel: false
      }} />
      <Tab.Screen name="Reading" component={ReadingScreen} options={{
        tabBarIcon: () => {
          return <AntDesign name="book" size={24} color="#C6EAA7" />
        },
        tabBarShowLabel: false
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='Tabs' component={MyTabs}/>
        </Stack.Navigator>
        <StatusBar style='auto'/>
      </NavigationContainer>
    </Provider>
  );
}
