// DestinationPicker.js

import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Dropdown, SegmentedButtons, Title } from "react-native-paper";
import { supabase } from "../lib/supabase";

import GlobalContext from "../GlobalContext";

const DestinationPicker = () => {
	const { userEmail, nemesisUrl, selectedNemesis } = useContext(GlobalContext);
	console.log(nemesisUrl);
	return (
		<View style={styles.container}>
			<Title style={styles.username}>Hello, {userEmail}</Title>
			<View style={styles.separator} />
			<Title style={styles.title}>Your Nemesis</Title>
			<Image source={{ uri: nemesisUrl }} style={{ width: 400, height: 400 }} />
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

export default DestinationPicker;
