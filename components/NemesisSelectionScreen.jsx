// NemesisSelectionScreen.js

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dropdown, SegmentedButtons, Title } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const NemesisSelectionScreen = () => {
	const [selectedNemesis, setSelectedNemesis] = useState(""); // To store the selected nemesis type
	const [selectedDifficulty, setSelectedDifficulty] = useState(""); // To store the selected difficulty level

	const nemesisOptions = ["Vampire", "Zombie", "Ghost", "Werewolf"]; // List of common monsters/scary things
	const difficultyOptions = ["Easy", "Medium", "Hard"]; // Difficulty level options

	const handleNemesisChange = (itemValue) => {
		setSelectedNemesis(itemValue);
	};

	const handleDifficultyChange = (itemValue) => {
		setSelectedDifficulty(itemValue);
	};

	return (
		<View style={styles.container}>
			<Title style={styles.title}>Welcome to Nemesis Selection Screen!</Title>
			<View style={styles.dropdownContainer}>
				<View style={styles.separator} />
				<Text style={styles.label}>Choose Your Nemesis</Text>
				<Picker
					selectedValue={selectedNemesis}
					style={styles.picker}
					onValueChange={handleNemesisChange}
				>
					{nemesisOptions.map((nemesis) => (
						<Picker.Item key={nemesis} label={nemesis} value={nemesis} />
					))}
				</Picker>

				<View style={styles.separator} />

				<Text style={styles.label}>Difficulty Level</Text>
				<SegmentedButtons
					value={selectedDifficulty}
					onValueChange={handleDifficultyChange}
					buttons={difficultyOptions.map((difficulty) => ({
						value: difficulty,
						label: difficulty,
					}))}
				/>
			</View>
			{/* Add any other content for the Nemesis Selection Screen */}
			<Button mode="contained" onPress={() => console.log("Submit")}>
				Submit
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
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
