import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import {Colors} from "./constants/colors";
import Map from "./screens/Map";
import {useEffect, useState} from "react";
import {init} from "./util/database";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

export default function App() {
    const [dbInit, setDbInit] = useState(false);

    useEffect(() => {
        init().then(() => {
            setDbInit(true)
        }).catch((err) => {
            console.log(err)
        });
    }, []);



  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: Colors.primary500},
            headerTintColor: Colors.gray700,
            contentStyle: {backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces}
                        options={({navigation}) => ({
                            title: 'Your Favorite places',
                          headerRight: ({tintColor}) =>
                              <IconButton
                                  icon='add'
                                  size={30}
                                  color={tintColor}
                                  onPress={() => navigation.navigate('AddPlace')}/>
                        })}/>
          <Stack.Screen name='AddPlace'
                        component={AddPlace}
                        options={{
                            title: 'Add a new Place'
                        }}/>
            <Stack.Screen name="Map" component={Map}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


