import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";
import AudioRecorder from "./components/AudioRecorder";
import AudioMerger from "./components/AudioMerger";
import Header from "./components/Header";

function App() {
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/voice/add" element={authState.isLoggedIn ? <AudioRecorder /> : <Navigate to="/login" state={{ redirectUrl: "/voice/add" }} />} />
        <Route path="/audio/merger" element={<AudioMerger />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
