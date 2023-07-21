import React, { useEffect, useContext } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View,Text } from 'react-native';
import GlobalContext from "../GlobalContext";


export default function UserMap() {
  const contextValue = useContext(GlobalContext);
  return (
    <View style={styles.container}>
    {/* <MapView
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView> */}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 