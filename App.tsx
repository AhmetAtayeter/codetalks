import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Sign from "./src/pages/Sign";
import Rooms from "./src/pages/Rooms";
import Messages from "./src/pages/Messages/Messages";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from "@react-native-firebase/auth"
const Stack = createStackNavigator();

const App = () => {

  const [userSession, setUserSession] = useState()

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user)
    })
  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {!userSession ? (
        <AuthStack />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign"
            component={Sign}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rooms"
            component={Rooms}
            options={{ headerTitle: "Odalar", headerTintColor: "#F8A040" }}
          />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={{
              headerTitle: "Messages",
              headerTintColor: "#F8A040",
              headerRight: () => (
                <Icon
                  name="logout"
                  size={30}
                  color="#FFA03F"
                  onPress={() => auth().signOut()}
                />
              ),
            }}
          />
        </Stack.Navigator>
      )}

    </NavigationContainer>
  )

}

export default App