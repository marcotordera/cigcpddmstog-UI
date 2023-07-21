import React, { useEffect, useContext } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View,Text, Dimensions } from 'react-native';
import GlobalContext from "../GlobalContext";
import * as Location from 'expo-location';


export default function AppMap() {
  useEffect(() => {
    const MapInit = async () => {
      try{
        let { status } = await Location.requestForegroundPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});

        console.log(location)
        console.log("///map init success///");
      }
      catch(error){
        console.error(error);

      }
    };
    MapInit();
  }, []);
  const contextValue = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    </View>
  );
}
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 