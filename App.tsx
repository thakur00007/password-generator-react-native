/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';


import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import GeneratePassword from './views/components/GeneratePassword';
import Login from './views/components/Login';

export  type RootStackParamList = {
  GeneratePassword: undefined;
  Login: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();


function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };


  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />

      <NavigationContainer>

        <Stack.Navigator initialRouteName='Login'>

          <Stack.Screen
            name="GeneratePassword"
            component={GeneratePassword}
            options={{ title: 'GeneratePassword' }}
          >
            {/* <GeneratePassword></GeneratePassword> */}
            {/* <GeneratePassword ></GeneratePassword> */}
            {/* <></> */}
          </Stack.Screen>

          <Stack.Screen 
            name="Login"
            component={Login}
          />

        </Stack.Navigator>

      </NavigationContainer> 
      
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    marginVertical: 10,
  },
});

export default App;
