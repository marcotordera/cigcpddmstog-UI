import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { GlobalContextProvider } from "./GlobalContext";
import AppMap from "./components/AppMap";
import DestinationPicker from "./components/DestinationPicker";
import LoginScreen from "./components/LoginScreen";
import NemesisSelectionScreen from "./components/NemesisSelectionScreen";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
            <Stack.Screen
              name="DestinationPicker"
              component={DestinationPicker}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </PaperProvider>
  );
}
