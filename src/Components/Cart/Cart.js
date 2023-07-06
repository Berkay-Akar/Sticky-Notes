import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Note from "../Note/Note";
import "./Cart.css";
import { CartContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  console.log("cart");
  const { removeFromCart, closeCartPage, setCartItems, cartItems } =
    useContext(CartContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart");
      setCartItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveItem = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${noteId}`);
      removeFromCart(noteId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoBack = () => {
    closeCartPage();
    navigate("/notes");
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <BsArrowLeft className="back-icon" onClick={handleGoBack} />
        <h2>My Cart</h2>
      </div>
      <div className="cart-notes">
        {cartItems.map((note) => (
          <div className="cart-note-item" key={note.id}>
            <Note
              isIconNotVisible={true}
              note={note}
              deleteNote={() => handleRemoveItem(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
