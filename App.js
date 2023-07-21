import { GlobalContextProvider } from "./GlobalContext";
import Login from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Root from "./components/Root";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./components/LoginScreen";
import NemesisSelectionScreen from "./components/NemesisSelectionScreen";
import AppMap from "./components/AppMap";

const Stack = createStackNavigator();

const initialRouteName = "Map";

export default function App() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="NemesisSelection"
              component={NemesisSelectionScreen}
            />
            <Stack.Screen name="Map" component={AppMap} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </PaperProvider>
  );
}
