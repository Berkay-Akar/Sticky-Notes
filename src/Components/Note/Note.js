import React, { useContext, useEffect, useState } from "react";
import "./Note.css";
import { CartContext } from "../../App";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import moment from "moment";

let timer = 500;
let timeout;

function Note(props) {
  const [check, setCheck] = useState(false);
  const { addToCart, addNote, selectedColor } = useContext(CartContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(props.note.description);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text, id) => {
    debounce(() => props.updateText(text, id));
  };

  const handleAddToCart = () => {
    addToCart(props.note);
    setCheck(!check);
  };

  const saveText = async () => {
    addNote(selectedColor, input, props.note.id);
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <textarea
        className="note_text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter your note here..."
        spellCheck="false"
      />
      <div className="note_footer">
        <p>{moment(props.note.createdAt).format("MM Do YY, h:mm:ss a")}</p>
        <MdDeleteForever
          onClick={() => props.deleteNote(props.note.id)}
          onSubmit={handleSubmit}
          className="delete-icon"
        />

        {check ? (
          <BsFillCheckCircleFill className="added-icon" />
        ) : (
          <BsFillBagCheckFill
            onClick={handleAddToCart}
            className="add-to-cart-icon"
          >
            Add to Cart
          </BsFillBagCheckFill>
        )}

        <BsFillArrowRightSquareFill onClick={saveText} className="save-icon" />
      </div>
    </div>
  );
}

export default Note;
