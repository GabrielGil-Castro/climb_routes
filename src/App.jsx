import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RoutesPage from "./pages/RoutesPage";
import Legacy from "./pages/Legacy";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
