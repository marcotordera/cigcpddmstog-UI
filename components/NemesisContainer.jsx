import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalContext from "../GlobalContext";
import { Button, Chip } from "react-native-paper";
import { difficultyList } from "./constants";

const NemesisContainer = () => {
	const {
		headstartCount,
		setHeadstartCount,
		setIsRunStarted,
		isRunStarted,
		selectedDifficulty,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (isRunStarted) {
			const countDown = setTimeout(() => {
				setHeadstartCount((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(countDown);
		}
	}, [isRunStarted, headstartCount]);

	const handleStartRun = () => {
		setIsRunStarted(true);
		console.log(selectedDifficulty);
		const headstart = difficultyList.find(
			({ id }) => id === selectedDifficulty
		)?.offsetSeconds;
		console.log(headstart);

		setHeadstartCount(headstart);
	};

	return (
		<View style={styles.container}>
			{isRunStarted ? (
				<Chip style={styles.chip} textStyle={styles.text}>
					{headstartCount} seconds until your nemesis begins
				</Chip>
			) : (
				<Button style={styles.button} mode="contained" onPress={handleStartRun}>
					Start Run
				</Button>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 70,
		left: 0,
		right: 0,
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 9999,
	},
	chip: { margin: "auto" },
	text: {
		fontSize: 18,
		textAlign: "center",
		// Add any other styles for the absolute text as needed
	},
	button: {
		marginTop: 8,
		fontSize: 24,
		width: "100%", // Ensure the Button takes the full width of the container
	},
});

export default NemesisContainer;
