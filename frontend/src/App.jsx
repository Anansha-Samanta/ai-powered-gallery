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
import Register from "./pages/Register";

// Team Management Pages
import HomeNew from "./pages/HomeNew";
import AddMember from "./pages/AddMember";
import ViewMembers from "./pages/ViewMembers";
import MemberDetails from "./pages/MemberDetails";
import VerifyEmail from "./pages/VerifyEmail";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
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
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<HomeNew />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/view-members" element={<ViewMembers />} />
        <Route path="/member/:id" element={<MemberDetails />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;