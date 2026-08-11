import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SettingsPage from "./pages/SettingsPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import {useAuthStore} from "./store/useAuthStore.js";
import {useThemeStore} from "./store/useThemeStore.js";
import { Route, Routes,Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = ()=>{
  const {authUser, checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  const {theme} = useThemeStore(); 
  console.log({
    authUser
  })

  if(isCheckingAuth && !authUser){
    return(
      <div>
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin" />
        </div>
      </div>
    )
  }

  return(
    <div data-theme={theme}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ?<SignUpPage/>: <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
    
      <Toaster/>
    </div>
  )
}

export default App;