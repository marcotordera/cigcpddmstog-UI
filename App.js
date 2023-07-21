import { GlobalContextProvider } from "./GlobalContext";
import Login from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Root from "./components/Root";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/NemesisSelectionScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<PaperProvider>
			<GlobalContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Login"
						screenOptions={{ headerShown: false }}
					>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Home" component={HomeScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</GlobalContextProvider>
		</PaperProvider>
	);
}
