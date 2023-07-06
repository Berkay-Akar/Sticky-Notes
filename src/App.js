import React, { useEffect, useState } from "react";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import Cart from "./Components/Cart/Cart";
import axios from "axios";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const CartContext = React.createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  useEffect(() => {
    fetchNotes();
  }, []);
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

  const addToCart = async (note) => {
    try {
      console.log(note);
      const { id, description, color } = note;
      await axios.post(`http://localhost:3001/cart/${id}`, {
        id,
        description,
        color,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (note) => {
    try {
      const { id } = note;
      await axios.delete(`http://localhost:3001/cart/${id}`, {
        id,
      });
      const updatedCartItems = cartItems.filter((item) => item.id !== note.id);
      setCartItems(updatedCartItems);
    } catch (err) {
      console.log(err);
    }
  };

  const openCartPage = async () => {
    setIsCartOpen(true);
    await axios.get(`http://localhost:3001/cart/`);
  };

  const closeCartPage = async () => {
    setIsCartOpen(false);
    await axios.get(`http://localhost:3001/notes/`);
  };

  const addNote = async (color, note, id) => {
    try {
      console.log(id);
      console.log(note);
      console.log(notes);
      if (id) {
        console.log("İF");
        axios.put(`http://localhost:3001/notes/${id}`, {
          description: note,
          id: id,
        });
      } else {
        console.log("ELSE");
        const backNote = await axios.post("http://localhost:3001/notes", {
          description: note,
          color: color,
        });
        console.log(backNote.data.id);
        const tempNotes = notes;
        tempNotes.pop();
        setNotes([...tempNotes, backNote.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createDummy = (color) => {
    const tempNotes = [
      ...notes,
      {
        text: "",
        time: Date.now(),
        color,
      },
    ];
    setSelectedColor(color);
    setNotes(tempNotes);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      const tempNotes = [...notes];
      const index = tempNotes.findIndex((item) => item.id === id);
      if (index < 0) return;
      tempNotes.splice(index, 1);
      setNotes(tempNotes);
    } catch (err) {
      console.log(err);
    }
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
  console.log(isCartOpen);

  return (
    <BrowserRouter>
      <div className="App">
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
            removeFromCart,
            openCartPage,
            closeCartPage,
            addNote,
            createDummy,
            selectedColor,
            deleteNote,
            setCartItems,
          }}
        >
          <Sidebar addNote={addNote} openCartPage={openCartPage} />
          <Routes>
            <Route
              path="/notes"
              element={
                <NoteContainer
                  notes={notes}
                  deleteNote={deleteNote}
                  updateText={updateText}
                  openCartPage={openCartPage}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </CartContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
