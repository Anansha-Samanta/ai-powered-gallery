import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Ai from "./pages/Ai";
import Search from "./pages/Search";
import Create from "./pages/Create";
import AlbumMake from "./pages/AlbumMake";
import CollageMake from "./pages/CollageMake";
import SinglePic from "./pages/SinglePic";
import AlbumView from "./pages/AlbumView";
import CollageView from "./pages/CollageView";
import Profile from "./pages/Profile";
import PhotoEdit from "./pages/PhotoEdit";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/photo" element={<SinglePic />} />
        <Route path="/collage" element={<CollageMake />} />
        <Route path="/album" element={<AlbumMake />} />
        <Route path="/viewcollage" element={<CollageView />} />
        <Route path="/viewalbum" element={<AlbumView />} />
        <Route path="/editphoto" element={<PhotoEdit />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;