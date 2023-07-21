import React, { useEffect, useContext } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import GlobalContext from "../GlobalContext";
import * as Location from 'expo-location';


export default function AppMap() {
  const contextValue = useContext(GlobalContext);
  useEffect(() => {
    const MapInit = async () => {
      try{
        await Location.requestForegroundPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);
        contextValue.setUserLocation(location);

        console.log(contextValue.userLocation);
        console.log("///map init success///");
      }
      catch(error){
        console.error(error);

      }
    };
    MapInit();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: contextValue.userLocation.latitude,
        longitude: contextValue.userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
       
      </MapView>
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
 