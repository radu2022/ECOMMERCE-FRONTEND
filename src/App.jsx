import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <>
        {/* Your routes/components */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="bg-white border border-teal-900 rounded-lg shadow-md p-4"
          bodyClassName="text-sm text-teal-900 font-semibold"
          progressClassName="bg-teal-500"
        />
      </>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
