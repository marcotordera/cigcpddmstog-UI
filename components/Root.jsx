import React, { useEffect, useContext } from "react";
import GlobalContext from "../GlobalContext";
import { StyleSheet, Text, View } from "react-native";
import { sampleFetch } from "../services/TestService";
import AppMap from "./AppMap";

const Root = () => {
  const contextValue = useContext(GlobalContext);

  useEffect(() => {
    const AppInit = async () => {
      try{
        // contextValue.testResponse = await sampleFetch();
        // console.log(contextValue.testResponse)
        console.log("///init success///");
      }
      catch(error){
        console.error(error);

      }
    };
    AppInit();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{contextValue.testString1}</Text>
      {/* <Text>{contextValue.testString2}</Text>
      <Text>{contextValue.testObj.objprop}</Text>
      <Text>{contextValue.testObjArray[0].testObjArrayProp}</Text>
      <Text>{contextValue.testObjArray[1].testObjArrayProp}</Text> */}
      <AppMap/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Root;
