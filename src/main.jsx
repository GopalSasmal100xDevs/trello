import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App.jsx";
import { Provider as ChakraUIProvider } from "./components/ui/provider.jsx";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraUIProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ChakraUIProvider>
  </StrictMode>
);
