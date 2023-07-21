import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
	getItem: (key) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key, value) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key) => {
		SecureStore.deleteItemAsync(key);
	},
};

const supabaseUrl = "https://cpnbonmbevvawiconjfl.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwbmJvbm1iZXZ2YXdpY29uamZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5MTU5OTEsImV4cCI6MjAwNTQ5MTk5MX0.G9u5HP-UEpwZSAN_dqOsHx9vEcZp4oHgX0hT0BatiOg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
