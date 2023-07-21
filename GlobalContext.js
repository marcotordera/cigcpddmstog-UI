import React, { createContext, useState } from "react";
import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [testString2, setTestString2] = useState("Test2");
  const [testObj, setTestObj] = useState({
    objprop: "test obj prop for the global context/store",
  });
  const [testObjArray, setTestObjArray] = useState([
    { testObjArrayProp: "testObjArray[0] test" },
    { testObjArrayProp: "testObjArray[1] test" },
  ]);

  /////////////////////////App Map stuff///////////////
  const [userLocation, setUserLocation] = useState("test");
  const [userLocationHistory, setUserLocationHistory] = useState();
  const [nemesisLocation, setNemesisLocation] = useState();
  const [targetDestination, setTargetDestination] = useState();

  /////////////////////////////////////////////////////

  const [testResponse, setTestResponse] = useState([]);
  const store = {
    userEmail,
    setUserEmail,
    testString2,
    setTestString2,
    testObj,
    setTestObj,
    testObjArray,
    setTestObjArray,
    testResponse,
    setTestResponse,
    userLocation,
    setUserLocation,
    userLocationHistory,
    setUserLocationHistory,
    nemesisLocation,
    setNemesisLocation,
    targetDestination,
    setTargetDestination,
  };
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
