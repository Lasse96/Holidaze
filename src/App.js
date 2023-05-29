import { Route, Routes } from "react-router-dom";
import "./main.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CreateVenue from "./Pages/CreateVenue";
import Venue from "./Pages/Venue";
import ChangeVenue from "./Pages/ChangeVenue";
import Layout from "./Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Profile/:name' element={<Profile />} />
        <Route path='/CreateVenue' element={<CreateVenue />} />
        <Route path='/Venue/:id' element={<Venue />} />
        <Route path='/ChangeVenue/:id' element={<ChangeVenue />} />
      </Routes>
    </Layout>
  );
}

export default App;
