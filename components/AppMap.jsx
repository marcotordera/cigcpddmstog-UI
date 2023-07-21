import React, { useEffect, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import GlobalContext from "../GlobalContext";
import * as Location from "expo-location";
import NemesisContainer from "./NemesisContainer";

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


  let localNemesisLocation = {
    latitude: 37.78825,
    latitudeDelta: 0.0922,    longitude: -122.4324,
  };
  const nemesisStep = () =>{
    if(nemesisPosition < localUserLocationHistory.length)
    {
      console.log("nemesis is getting closer")
      nemesisPosition++;
  
      localNemesisLocation=localUserLocationHistory[nemesisPosition]
      // setNemesisLocation(localUserLocationHistory[nemesisPosition])
  
      // console.log(localUserLocationHistory[nemesisPosition]);
      console.log(nemesisLocation.latitude);
      console.log(nemesisLocation.longitude);

      if(nemesisPosition === localUserLocationHistory.length)
      {
        console.log("CAUGHT")
      }
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
        setInterval(updateLocations, 1000);
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
			<NemesisContainer />
			<MapView
				style={styles.map}
				showsUserLocation={true}
				region={userLocation}
				onRegionChangeComplete={(region) => setUserLocation(region)}
			>
        <Marker coordinate={{
          latitude: localNemesisLocation.latitude, // Example latitude
          longitude: localNemesisLocation.longitude, // Example longitude
        }} title="Nemesis!" description="Nemesis!" />

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
