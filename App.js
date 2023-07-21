import { GlobalContextProvider } from "./GlobalContext";
import Root from "./components/Root";

export default function App() {
  return (
    <GlobalContextProvider>
      <Root />
    </GlobalContextProvider>
  );
}
