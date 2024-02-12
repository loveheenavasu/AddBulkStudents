import "./App.css";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentHeader from "./components/studentHeader/StudentHeader";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
        rtl={false}
      />
      <Header />
      <StudentHeader />
    </>
  );
}

export default App;
