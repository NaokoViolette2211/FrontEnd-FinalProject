# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css'

function App() {
  const [ directions, setDirections] = useState([]);
  const [ inputText, setInputText ] = useState("");
  const [ editingId, setEditingId ] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(directions);
    console.log(editingId)
    console.log(inputText)
    if(inputText.trim() !== "" ){
      if(editingId !== null){
        setDirections((prevDirections) =>
          prevDirections.map((direction) =>
            direction.id === editingId? {...direction, text: inputText}: direction)
        );
        setEditingId(null);
      } else {
        setDirections((prevDirections) => [
          ...prevDirections,
          {
            id: uuidv4(),
            text: inputText,
          }
        ]);
      }
      setInputText("")
    }
  }

  const handleChange = (e) => {
    setInputText(e.target.value);
  }

  const handleEdit = (id, text) => {
    setInputText(text);
    setEditingId(id);
  }
  const handleDelete = (id) => {
    setDirections((prevDirections) => prevDirections.filter((direction) => direction.id !== id))
  }

  return (
    <div className='app'>
      <form onSubmit={onSubmit}>
        <input name="direction" id="direction" required={true} onChange={handleChange} value={inputText}/>
        <button type='submit'>{editingId !== null? "Save":"Add more direction"}</button>
      </form>

      <div className='textarea-values'>
      {directions.map((item) => (
        <div key={item.id} className='textarea-value'>
          <li>{item.text}</li>
          <div className='btns'>
            <button className='edit-btn' onClick={() => handleEdit(item.id, item.text)}>
              <EditIcon/>
            </button>
            <button className="delete-btn" onClick={()=>handleDelete(item.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
      </div>
      
    </div>
  )
}

export default App


import React, { useState, useEffect } from 'react';
import Header from './Header';
import InputForm from './InputForm';
import Button from '@mui/material/Button';

const AddRecipe = ({ dishName: initialDishName, ingredients: initialIngredients, directions: initialDirections, handleToggleEditMode }) => {
  const [dishName, setDishName] = useState(initialDishName || []);
  const [ingredients, setIngredients] = useState(initialIngredients || []);
  const [directions, setDirections] = useState(initialDirections || []);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (dishName.length > 0) {
      const recipeData = {
        dishName,
        ingredients,
        directions,
      };
      const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
      savedRecipes.push(recipeData);
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      setSaved(true);
      handleToggleEditMode(); // Add this line to exit edit mode after saving
    } else {
      console.error("Please fill in at least one field");
    }
  };

  const handleClear = () => {
    setDishName([]);
    setIngredients([]);
    setDirections([]);
    setIsInputDisabled(false);
  };

  return (
    <div className="app-container">
      <Header />
      <main className='add-recipe-container'>
        <div className="add-recipe-left">
          <InputForm
            items={dishName}
            setItems={setDishName}
            placeholder="Dish Name (required)"
            label="Dish Name:"
            buttonText="Add"
            inputType="input"
            disabled={dishName.length > 0}
            isInputDisabled={isInputDisabled}
            setIsInputDisabled={setIsInputDisabled}
          />
          <InputForm
            items={ingredients}
            setItems={setIngredients}
            placeholder="Ex. Onion"
            label="Ingredients:"
            buttonText="Add"
            inputType="input"
            disabled={dishName.length > 0}
            isInputDisabled={isInputDisabled}
            setIsInputDisabled={setIsInputDisabled}
          />
        </div>
        <div className="add-recipe-right">
          <div className='save-recipe-btn-container'>
            <Button className='save-recipe-btn' variant="outlined" onClick={handleSave}>Save Recipe</Button>
          </div>
          <InputForm
            items={directions}
            setItems={setDirections}
            placeholder="Type a direction"
            label="Cooking Directions:"
            buttonText="Add"
            inputType="textarea"
            disabled={dishName.length > 0}
            isInputDisabled={isInputDisabled}
            setIsInputDisabled={setIsInputDisabled}
          />
        </div>
      </main>
    </div>
  );
};

export default AddRecipe;
