import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store ,persistor} from "./features/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);


