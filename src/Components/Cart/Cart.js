import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Note from "../Note/Note";
import "./Cart.css";
import { CartContext } from "../../App";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, closeCartPage } = useContext(CartContext);

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
            <Note note={note} deleteNote={() => handleRemoveItem(note.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
