import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/homepage/homepage.jsx";
import MyDailyNorma from "./components/MyDailyNorma/MyDailyNorma.jsx";
import { useState } from "react";

function App() {
  const [modalActive, setModalActive] = useState();

  return (
   
<>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>Main Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/registration" element={<h1>Registion Page</h1>} />
        <Route path="/homepage" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    
     {/* Semple button for open modal myDailyNorma */}
   <button className="open-btn" onClick={()=> setModalActive(true)}>Open modal</button>
   <MyDailyNorma active={modalActive} setActive={setModalActive}/> 

</>
  );
}

export default App;
