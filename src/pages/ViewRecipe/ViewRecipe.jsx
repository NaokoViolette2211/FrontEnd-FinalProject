import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddRecipe from '../../pages/AddRecipe/AddRecipe'
import Header from '../../components/Header/Header'
import Button from '@mui/material/Button';
import './ViewRecipe.css'

const ViewRecipe = () => {
  const { index } = useParams();
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const selectedRecipe = savedRecipes[index];
  const [ editMode, setEditMode ] = useState(false);


  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className='app-container'>
    {editMode? (
        <div className='editMode'>
          <AddRecipe 
            initialValues={{
              dishName: selectedRecipe.dishName,
              ingredients: selectedRecipe.ingredients,
              directions: selectedRecipe.directions,
              selectedFile: selectedRecipe.selectedFile,
              index: index,
            }}
            editMode={editMode}
            handleToggleEditMode={handleToggleEditMode}
          />
        </div>

    ): (
    <>
      <Header />
      <main className='viewRecipe-container'>
        <div className='viewMode'>
          <div className="viewRecipe-left">
            <h2 className='dishName'>{selectedRecipe && selectedRecipe.dishName.map((dish) => dish.text)}</h2>

            <div className="viewRecipe-pic-container" style={{ backgroundColor: selectedRecipe && selectedRecipe.selectedFile && selectedRecipe.selectedFile.length > 0 ? 'transparent' : '#e0e0e0' }}>
              {selectedRecipe && selectedRecipe.selectedFile && selectedRecipe.selectedFile[0] && selectedRecipe.selectedFile[0].file?(
                <img src={selectedRecipe.selectedFile[0].file} alt="Dish Picture" className='dish-img' />
                ):(
                  <div className="no-image-text">No Image</div>
                )}
            </div>
              
            <div className='view-recipe-ingredients'>
              <h3 className='ingredients-text'>Ingredients:</h3>
              {selectedRecipe && selectedRecipe.ingredients && (
                <ul className='ingredient-list-container'>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className='ingredient'>{ingredient.text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="viewRecipe-right">
            <div className="save-edit-btn">
              <Button style={{color: '#776871', border: '1px solid #776871', '&:hover': {backgroundColor: '#776871', color: '#fff', variant: 'contained'},}} variant="outlined" onClick={handleToggleEditMode}>Edit</Button>
            </div>
            <div className="view-recipe-directions">
              <h3 className='directions'>Cooking Directions:</h3>
              {selectedRecipe && selectedRecipe.directions && (
                <ul className="direction-list-container">
                  {selectedRecipe.directions.map((direction, index) => (
                    <li key={index} className='direction'>{direction.text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
      )}
    </div>
  )
}

export default ViewRecipe

