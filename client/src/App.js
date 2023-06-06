import "./App.css";
// import { Routes, Route, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing.jsx";
import Home from "./pages/Home/Home.jsx";
import Detail from "./pages/Detail/Detail.jsx";
import Create from "./pages/Create/Create.jsx";
// import Nav from "./components/Nav/Nav.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "./redux/actions/actions";

function App() {
  // const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  });

  return (
    <div className="App">
      {/* {!location.pathname.startsWith("/detail/") && // Si la ruta actual no comeinza con "/detail/") y es distinta a "/", muestra  el Nav
        location.pathname !== "/" && <Nav />} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
