// DestinationPicker.js


import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dropdown, SegmentedButtons, Title } from "react-native-paper";
import { supabase } from "../lib/supabase";

import GlobalContext from "../GlobalContext";

const DestinationPicker = (prompt, difficulty) => {
	
	const [imageURL, setImageURL] = useState("");
  	const [isLoading, setIsLoading] = useState(false);
	const { userEmail } = useContext(GlobalContext);
	useEffect(() => {
		const generateImage = async () => {
			if (!prompt) return alert("Select nemesis!");
			
			setIsLoading(true);
			try {
			const { data, error } = await supabase.functions.invoke(openai, {
					body: {query: selectedNemesis},
			});
				  
			  setImageURL(data.data[0].url);
			  setIsLoading(false);
			} catch (error) {
			  setIsLoading(false);
			}
			
		};	
		generateImage();
		console.log()
	  }, []);
	
	return (
		<View style={styles.container}>
			<Title style={styles.username}>Hello, {userEmail}</Title>
			<View style={styles.separator} />
			<Title style={styles.title}>Your Nemesis!</Title>
			{isLoading && <Image source={imageURL}/> }
            
			
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
