import React, { useEffect, useState } from "react";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import Cart from "./Components/Cart/Cart";
import axios from "axios";

import "./App.css";

export const CartContext = React.createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notes");
      setNotes(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (note) => {
    setCartItems([...cartItems, note]);
  };

  const removeFromCart = (noteId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== noteId);
    setCartItems(updatedCartItems);
  };

  const openCartPage = () => {
    setIsCartOpen(true);
  };

  const closeCartPage = () => {
    setIsCartOpen(false);
  };

  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          openCartPage,
          closeCartPage,
        }}
      >
        <Sidebar addNote={addNote} openCartPage={openCartPage} />
        {isCartOpen ? (
          <Cart />
        ) : (
          <div>
            <NoteContainer
              notes={notes}
              deleteNote={deleteNote}
              updateText={updateText}
              openCartPage={openCartPage}
            />
          </div>
        )}
      </CartContext.Provider>
    </div>
  );
}

export default App;
