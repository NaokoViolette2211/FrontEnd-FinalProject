import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header';
import DishPic from '../../components/DishPicture/DishPic'
import './AddRecipe.css'
import InputForm from '../../components/InputForm/InputForm';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const AddRecipe = ({ initialValues, editMode, handleToggleEditMode }) => {
  const [ dishName, setDishName ] = useState(initialValues?.dishName || []);
  const [ ingredients, setIngredients ] = useState(initialValues?.ingredients || []);
  const [ directions, setDirections ] = useState(initialValues?.directions || []);
  const [ selectedFile, setSelectedFile ] = useState(initialValues?.selectedFile || []);
  const [ isInputDisabled, setIsInputDisabled ] = useState(false);
  const [ dishNameError, setDishNameError ] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    // Update the state when initialValues change
    setDishName(initialValues?.dishName || []);
    setIngredients(initialValues?.ingredients || []);
    setDirections(initialValues?.directions || []);
    setSelectedFile(initialValues?.selectedFile || []);

  }, [initialValues]);


  const clearDishNameError = () => {
    setDishNameError("");
  }
  const handleSave = () => {
    if(dishName.length > 0) {
      const recipeData = {
        dishName,
        ingredients,
        directions,
        selectedFile,
      };

      const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

      if(initialValues?.index !== undefined) {
        savedRecipes[initialValues.index] = recipeData;
        setIsInputDisabled(true)
      }else {
        savedRecipes.push(recipeData);
      }
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

      console.log("file: ", selectedFile)

      const lastIndex = savedRecipes.length - 1;

      if(editMode) {
        navigate(`/view-recipe/${initialValues.index}`)
      }else {
        navigate(`/view-recipe/${lastIndex}`)
      }
      console.log("handleToggleEditMode type:", typeof handleToggleEditMode)
      handleToggleEditMode()
    }else {
      setDishNameError("Please fill in Dish Name");
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main className='add-recipe-container'>
        <div className="add-recipe-left">
          <InputForm 
            items={dishName}
            setItems={setDishName}
            placeholder="*Dish Name (required)"
            label="Dish Name:"
            buttonText="Add"
            inputType="input"
            disabled={dishName.length > 0}
            isInputDisabled={isInputDisabled}
            setIsInputDisabled={setIsInputDisabled}
            onChange={clearDishNameError}
            />
            <p className='error-msg' style={{ display: dishNameError? 'block': 'none'}}>{dishNameError}</p>
          <DishPic 
            items={selectedFile}
            setItems={setSelectedFile}
            placeholder="choose a file"
            label="Dish Picture:"
            inputType="file"
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
            <Button style={{color: '#776871', border: '1px solid #776871'}} className='save-recipe-btn' variant="outlined" onClick={handleSave}>{editMode? "Update Recipe":"Save Recipe"}</Button>
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
          {/* {saved && <p>Recipe saved successfully!</p>} */}
        </div>
      </main>
    </div>
  )
}

AddRecipe.propTypes = {
  initialValues: PropTypes.object,
  editMode: PropTypes.bool,
  // setEditMode: PropTypes.bool,
  handleToggleEditMode: PropTypes.func,
};

export default AddRecipe


