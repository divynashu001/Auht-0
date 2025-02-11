import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out!");
    navigate("/login");
  };
  const productData = async () => {

    try {
      const response = await axios.get("http://localhost:3000/products",  {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
      setProducts(response.data)
      
    } catch(err) {
      handleError(err);
    }
  }
    useEffect(() => {
      productData();
    },[]);

    return (
      <div>
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
        <div>
          {products.map((item, index)=>(
            <ul key={index}>
              <span>{item.product} : {item.price}</span>
            </ul>
          ))}
        </div>
        <ToastContainer />
      </div>
    );
};

export default Home;
