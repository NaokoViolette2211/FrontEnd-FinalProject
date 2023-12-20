import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../../components/Header/Header'
import './SavedRecipe.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SavedRecipe = () => {
  const navigate = useNavigate();
  const [ savedRecipes, setSavedRecipes ] = useState([]);
  

  useEffect(()=> {
    const storedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSavedRecipes(storedRecipes)
  }, []);

  const handleRecipeClick = (index) => {
    navigate(`/view-recipe/${index}`);
  };

  const handleDelete = (index) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this recipe?");
    if(shouldDelete){
      setSavedRecipes((prevItems) => {
        const updateRecipes = prevItems.filter((item, i) =>  i !== index);
        localStorage.setItem("savedRecipes", JSON.stringify(updateRecipes));
        return updateRecipes;
      })
    }
  };

  return (
    <div className="app-container">
        <Header />
        <main className='saved-recipe-main'>
          <h2 className='saved-recipe-title'>{savedRecipes.length > 0? "Saved Recipes": "You have not saved any recipes yet..."}</h2>

          <div className="card-container">
            {savedRecipes.map((recipe, index) => (
              <Card key={index} className="card" >
                {recipe.selectedFile && recipe.selectedFile[0] && recipe.selectedFile[0].file?(
                  <CardMedia 
                    sx={{ height: 140}}
                    image={recipe.selectedFile[0].file}
                    title={recipe.dishName && recipe.dishName[0] ? recipe.dishName[0].text : "No Dish Name"}
                    onClick={() => handleRecipeClick(index)}
                  />
                ):(
                  <CardMedia 
                    sx={{ height: 140, backgroundColor: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    // image={recipe.selectedFile[0].file}
                    onClick={() => handleRecipeClick(index)}
                  >
                    <Typography variant="body2" color="textSecondary" component="div">
                      No Image
                    </Typography>
                  {/* No Image */}
                  </CardMedia>
                  
                )}
                <CardContent onClick={() => handleRecipeClick(index)}>
                  <Typography gutterBottom variant="h5" component="div" >
                    {recipe.dishName && recipe.dishName[0] ? recipe.dishName[0].text : "No Dish Name"}
                  </Typography>
                </CardContent>
                <CardActions className="delete-btn-container">
                  {/* <Button size='small'>EDIT</Button> */}
                  <Button size='small' onClick={() => handleDelete(index)}>DELETE</Button>
                </CardActions>
              </Card>
            ))}
          </div>

          
        </main>
      </div>
  )
}

export default SavedRecipe