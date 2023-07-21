import React, { createContext, useState } from "react";
import { difficultyList, nemesisList } from "./components/constants";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
	const [userEmail, setUserEmail] = useState(null);

	const [selectedNemesis, setSelectedNemesis] = useState(nemesisList[0].id); // To store the selected nemesis type
	const [selectedDifficulty, setSelectedDifficulty] = useState(
		difficultyList[0].id
	); // To store the selected difficulty level
	const [nemesisUrl, setNemesisUrl] = useState("");

	const [testString2, setTestString2] = useState("Test2");
	const [testObj, setTestObj] = useState({
		objprop: "test obj prop for the global context/store",
	});
	const [testObjArray, setTestObjArray] = useState([
		{ testObjArrayProp: "testObjArray[0] test" },
		{ testObjArrayProp: "testObjArray[1] test" },
	]);

	/////////////////////////App Map stuff///////////////

	const [userLocationHistory, setUserLocationHistory] = useState();

	const [targetDestination, setTargetDestination] = useState();
	const [headstartCount, setHeadstartCount] = useState(null);
	const [isRunStarted, setIsRunStarted] = useState(false);
	const [userLocation, setUserLocation] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [nemesisLocation, setNemesisLocation] = useState({
		latitude: 37.78825,
		latitudeDelta: 0.0922,
		longitude: -122.4324,
		longitudeDelta: 0.0421,
	});

	/////////////////////////////////////////////////////

	const [testResponse, setTestResponse] = useState([]);

	const store = {
		userEmail,
		setUserEmail,
		selectedNemesis,
		setSelectedNemesis,
		selectedDifficulty,
		setSelectedDifficulty,
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
		nemesisUrl,
		setNemesisUrl,
		headstartCount,
		setHeadstartCount,
		isRunStarted,
		setIsRunStarted,
		userEmail,
		setUserEmail,
		selectedNemesis,
		setSelectedNemesis,
		selectedDifficulty,
		setSelectedDifficulty,
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
		nemesisUrl,
		setNemesisUrl,
	};
	return (
		<GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
	);
};

export default GlobalContext;
