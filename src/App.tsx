import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './ReviewDashboard/Dashboard';
import LoginPage from './login/Login';
import Registration from './Registration/Registration';
// import Registration from './Registration/Registration';

function App() {
  return (
   <>
   <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/asdf" element={<CommitteeReview/>}/> */}
          <Route path="/signup" element={<Registration/>}/>
          <Route path='/' element={<LoginPage/>}/>

</Routes>
</Router>
   </>
  );
}

export default App;
