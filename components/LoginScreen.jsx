import React, { useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { TextInput, Button, HelperText, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import GlobalContext from "../GlobalContext";

const window = Dimensions.get("window");
const windowHeight = window.height;

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSignUp, setIsSignUp] = useState(false); // To track if the user is in sign-up mode
	const [loading, setLoading] = useState(false);

	const { setUserEmail } = useContext(GlobalContext);

	async function signUpWithEmail() {
		setLoading(true);
		const { error, data } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		setLoading(false);
		if (error) {
			Alert.alert(error.message);
		} else {
			return data.user.email;
		}
	}

	async function signInWithEmail() {
		setLoading(true);
		const { error, data } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		setLoading(false);
		if (error) {
			Alert.alert(error.message);
		} else {
			return data.user.email;
		}
	}

	const handleAction = async () => {
		let userEmail = null;

		if (email === "" || password === "") {
			setError("Please fill in all fields");
		} else {
			if (isSignUp) {
				userEmail = await signUpWithEmail();
			} else {
				userEmail = await signInWithEmail();
			}
		}

		if (userEmail) {
			setUserEmail(userEmail);
			navigation.navigate("NemesisSelection"); // Redirect to HomeScreen
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Title style={styles.title}>Adrenaline</Title>
			</View>
			<View style={styles.loginContainer}>
				<TextInput
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					mode="outlined"
					style={styles.input}
					autoCapitalize="none"
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					mode="outlined"
					style={styles.input}
					autoCapitalize="none"
				/>
				{error ? <HelperText type="error">{error}</HelperText> : null}
				<Button
					mode="contained"
					onPress={handleAction}
					style={styles.button}
					disabled={loading}
				>
					{isSignUp ? "Sign Up" : "Log In"}
				</Button>
				<Button
					mode="text"
					onPress={() => setIsSignUp(!isSignUp)}
					style={styles.switchButton}
				>
					{isSignUp
						? "Already have an account? Log in"
						: "Don't have an account? Sign up"}
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: windowHeight * 0.1, // Position title in the upper 2/3 of the screen
		paddingBottom: windowHeight * 0.2, // Position login elements 2/3 of the way down
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center",
		height: 60,
	},
	title: {
		fontSize: 52, // Larger title font size
		lineHeight: 60,
		fontWeight: "bold",
		textAlign: "center",
	},
	loginContainer: {
		width: "80%", // Adjust the width of the login container as needed
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		marginBottom: 16,
		width: "100%", // Ensure the TextInput takes the full width of the container
	},
	button: {
		marginTop: 8,
		width: "100%", // Ensure the Button takes the full width of the container
	},
});

export default LoginScreen;
