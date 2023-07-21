import React, { useEffect, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import GlobalContext from "../GlobalContext";
import * as Location from "expo-location";

export default function AppMap() {
	const { userLocation, setUserLocation,nemesisLocation, setNemesisLocation } = useContext(GlobalContext);


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


  const localUserLocationHistory=[]

  let nemesisPosition=0;
  const startNemesis = () =>{
    console.log("nemesis has started!")
    setInterval(nemesisStep, 3000);
  }

  const nemesisStep = () =>{
    console.log("nemesis is getting closer")
    nemesisPosition++;
    if(nemesisPosition === localUserLocationHistory.length)
    {
      console.log("CAUGHT")
    }

  }
  const updateLocations = async() =>{
    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);
    localUserLocationHistory.push(userLocation)
    // const updatedLocationHistory = [...userLocationHistory, userLocation];
    //   setUserLocationHistory(updatedLocationHistory)
      setUserLocation((prev) => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));

    // console.log(localUserLocationHistory.length)
  }

  useEffect(() => {
		const PolInit = async () => {
			try {
        setInterval(updateLocations, 3000);
        setTimeout(startNemesis, 10000);

				console.log("///poll init success///");
			} catch (error) {
				console.error(error);
			}
		};
		PolInit();
	}, []);
  

	// useEffect(() => {
	// 	console.log(userLocation);
	// }, [userLocation]);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				// initialRegion={{
				// 	latitude: userLocation.latitude,
				// 	longitude: userLocation.longitude,
				// 	latitudeDelta: 0.0922,
				// 	longitudeDelta: 0.0421,
				// }}
				region={userLocation}
				onRegionChangeComplete={(region) => setUserLocation(region)}
			></MapView>
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
