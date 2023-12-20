import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'; 
import "./DishPic.css"
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

const DishPic = ({ items, setItems, placeholder, label, inputType }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileDataUrl = reader.result;
        const fileName = file.name;

        setItems((prevItems) => {
          const itemId = prevItems.length > 0 ? prevItems[0].id : uuidv4();
  
          const newItem = {
            id: itemId,
            fileName: fileName,
            file: fileDataUrl,
          };
  
          // Save the file name to local storage
          const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
          const updatedRecipes = savedRecipes.map((recipe) => {
            if (recipe.id === itemId) {
              return { ...recipe, selectedFile: newItem };
            }
            return recipe;
          });
  
          localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
          return [newItem];
        });
      };
      reader.readAsDataURL(file);
      console.log(file.name);
    }
  };

  const handleDelete = () => {
    setItems([]);
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const updatedRecipes = savedRecipes.map((recipe) => {
      if(recipe.id === items[0]?.id) {
        return {...recipe, selectedFile: []};
      }
      return recipe;
    });
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  const handleLabelClick = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className='dishPic-container'>

      <form onSubmit={(e) => e.preventDefault()} className='dishPic-form'>
        <label htmlFor="dishPic" style={{ opacity: 0, position: 'absolute'}}>{label}</label>
        <div className="custom-label" >{label}</div>
        <div className="dishPic-input-btn-container">
          <Button style={{backgroundColor: '#776871'}} className={`choose-file-btn ${items[0] ? 'file-selected' : ''}`} variant="contained" onClick={handleLabelClick}>
            <input 
              id='dishPic'
              type={inputType}
              placeholder={placeholder}
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {items[0]? "Change File": "Choose File"}
          </Button>
        </div>
      </form>

      <div className="dish-file-list">
        <div className={`file-name ${items[0]?.fileName? 'file-exists': ""}`}>{items[0]?.fileName || "No file chosen"}</div>
        {items[0]?.fileName && (
          <div className='delete-btn' onClick={handleDelete}>
            <DeleteIcon />
          </div>
        )}
      </div>
      
    </div>
  )
}

DishPic.propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,

};

export default DishPic