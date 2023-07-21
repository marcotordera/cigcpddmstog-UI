import React, { useEffect, useContext, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import GlobalContext from "../GlobalContext";
import * as Location from "expo-location";
import NemesisContainer from "./NemesisContainer";
import { difficultyList } from "./constants";

export default function AppMap() {
	const {
		userLocation,
		setUserLocation,
		nemesisLocation,
		setNemesisLocation,
		isRunStarted,
		selectedDifficulty,
		headstartCount,
	} = useContext(GlobalContext);

	useEffect(() => {
		const MapInit = async () => {
			try {
				await Location.requestForegroundPermissionsAsync();
				let location = await Location.getCurrentPositionAsync({});

				setUserLocation((prev) => ({
					...prev,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				}));

				console.log("///map init success///");
			} catch (error) {
				console.error(error);
			}
		};
		MapInit();
	}, []);

	const [localUserLocationHistory, setLocalUserLocationHistory] = useState([]);
	const [nemesisPositionIndex, setNemesisPositionIndex] = useState(0);

	const updateNemesis = () => {
		const speed = difficultyList.find(({ id }) => id === selectedDifficulty);
		console.log(nemesisPositionIndex, localUserLocationHistory.length);
		try {
			setNemesisPositionIndex((prev) => prev + speed.speed);

			const newNemesisLocation =
				localUserLocationHistory[Math.floor(nemesisPositionIndex / 100)];
			setNemesisLocation(newNemesisLocation);
			// setNemesisLocation(localUserLocationHistory[nemesisPosition])

			const { coords: { latitude = 0, longitude = 0 } = {} } =
				newNemesisLocation;
			console.log(
				Math.abs(userLocation.latitude - latitude) +
					Math.abs(userLocation.longitude - longitude)
			);

			if (
				Math.abs(userLocation.latitude - latitude) +
					Math.abs(userLocation.longitude - longitude) <
				0.005
			) {
				setIsCaught(true);
			}
		} catch (error) {}
	};

	const updateLocations = async () => {
		let location = await Location.getCurrentPositionAsync({});
		setLocalUserLocationHistory((prev) => [...prev, location]);
		setUserLocation((prev) => ({
			...prev,
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		}));
	};

	useEffect(() => {
		const user = setTimeout(updateLocations, 1000);
		let nemesis;

		if (isRunStarted && headstartCount <= 0) {
			nemesis = setTimeout(updateNemesis, 1000);
		}

		return () => {
			clearTimeout(nemesis);
			clearTimeout(user);
		};
	}, [isRunStarted, userLocation]);

	return (
		<View style={styles.container}>
			<NemesisContainer />
			<MapView
				style={styles.map}
				showsUserLocation={true}
				region={userLocation}
				onRegionChangeComplete={(region) => setUserLocation(region)}
			>
				{isRunStarted && (
					<Marker
						coordinate={{
							latitude: nemesisLocation?.coords.latitude, // Example latitude
							longitude: nemesisLocation?.coords.longitude, // Example longitude
						}}
						title="Nemesis!"
						description="Nemesis!"
					/>
				)}
			</MapView>
		</View>
	);
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		width: width,
		height: height,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
