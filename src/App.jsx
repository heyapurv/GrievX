// src/App.js
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-lime-200">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className="flex-1">
        <Outlet  /> {/* Page content gets injected here */}
      </main>
      <Footer /> 
    </div>
  );
}

export default App;
