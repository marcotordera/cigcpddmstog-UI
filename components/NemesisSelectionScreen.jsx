// NemesisSelectionScreen.js

import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, SegmentedButtons, Title } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import GlobalContext from "../GlobalContext";
import { difficultyList, nemesisList } from "./constants";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

const NemesisSelectionScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();
	const {
		userEmail,
		selectedNemesis,
		setSelectedNemesis,
		selectedDifficulty,
		setSelectedDifficulty,
		setNemesisUrl,
	} = useContext(GlobalContext);

	const handleNemesisChange = (itemValue) => {
		console.log(itemValue);
		setSelectedNemesis(itemValue);
	};

	const handleDifficultyChange = (itemValue) => {
		setSelectedDifficulty(itemValue);
	};

	return (
		<View style={styles.container}>
			<Title style={styles.username}>Hello, {userEmail}</Title>
			<View style={styles.separator} />
			<Title style={styles.title}>Start a Run</Title>
			<View style={styles.dropdownContainer}>
				<View style={styles.separator} />
				<Text style={styles.label}>Choose Your Nemesis</Text>
				<Picker
					selectedValue={selectedNemesis}
					style={styles.picker}
					onValueChange={handleNemesisChange}
				>
					{nemesisList.map(({ id, title }) => (
						<Picker.Item key={id} label={title} value={id} />
					))}
				</Picker>

				<View style={styles.separator} />

				<Text style={styles.label}>Difficulty Level</Text>
				<SegmentedButtons
					value={selectedDifficulty}
					onValueChange={handleDifficultyChange}
					buttons={difficultyList.map(({ id, title }) => ({
						value: id,
						label: title,
					}))}
				/>
			</View>
			{/* Add any other content for the Nemesis Selection Screen */}
			<Button
				mode="contained"
				disabled={isLoading}
				onPress={async () => {
					console.log("nemesisId:" + selectedNemesis);

					const nemesisObj =
						nemesisList.find(({ id }) => id === selectedNemesis) ?? {};
					const nemesisString = `${nemesisObj.title}: ${nemesisObj.description}`;

					console.log("nemesisString:" + nemesisString);

					const generateImage = async () => {
						try {
							setIsLoading(true);
							const { data, error } = await supabase.functions.invoke(
								"openai",
								{
									body: { query: nemesisString },
								}
							);

							console.log(data);
							setNemesisUrl(data.data[0].url);
						} catch (error) {}
						setIsLoading(false);
					};

					await generateImage();

					navigation.navigate("DestinationPicker");
				}}
			>
				Submit
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	username: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "left",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	dropdownContainer: {
		width: "80%",
		marginBottom: 16,
	},
	separator: {
		height: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	picker: {
		borderWidth: 1,
		borderColor: "#CCCCCC",
		borderRadius: 4,
	},
});

export default NemesisSelectionScreen;
