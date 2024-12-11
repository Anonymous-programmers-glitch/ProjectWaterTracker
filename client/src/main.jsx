import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./App";
import "modern-normalize";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*<Provider store={store}>*/}
    {/*  <PersistGate loading={null} persistor={persistor}>*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/*</PersistGate>*/}
    {/*</Provider>*/}
  </StrictMode>,
);
