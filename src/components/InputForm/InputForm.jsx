import { useState } from 'react'
import PropTypes from 'prop-types'; 
import { v4 as uuidv4 } from 'uuid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import "./InputForm.css"

const InputForm = (props) => {

  const { items, setItems, placeholder, label, buttonText, disabled, inputType, isInputDisabled, setIsInputDisabled, onChange } = props;

  const [ inputText, setInputText ] = useState("");
  const [ editingItem, setEditingItem ] = useState(null);
  const [ dishNameInputDisabled, setDishNameInputDisabled ] = useState(disabled);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputText !== "") {
      if(editingItem !== null) {
        setItems((prevItems) => 
          prevItems.map((item) => item.id === editingItem.id? {...item, text: inputText}: item)
        );
        setEditingItem(null);
      } else {
        setItems((prevItems) => [
          ...prevItems,
          {
            id: uuidv4(),
            text: inputText
          }
        ]);
      }
      setInputText("");
      setDishNameInputDisabled(true); 
      setIsInputDisabled(true);
    }
  };
  
  const handleChange = (e) => {
    setInputText(e.target.value);
    if(onChange) {
      onChange()
    }
  };

  const handleEdit = (id, text) => {
    setIsInputDisabled(false)
    setInputText(text);
    setEditingItem({id, text});
    
  };

  const handleDelete = (id) => {
    setItems((prevItems) => (prevItems.filter((item) => item.id !== id)));
    setIsInputDisabled(false);
  };

  return (
    <div className='input-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-text">{label}</label>
        <div className={inputType==="textarea"?'textarea-and-btn-container':'input-and-btn-container'}>
          {inputType === 'textarea'?(
            <textarea
              id='input-text'
              placeholder={placeholder}
              onChange={handleChange}
              value={inputText}
              required={true}
              rows={5}
            />
          ) : (
            <input
              id='input-text'
              type='text'
              placeholder={placeholder}
              onChange={handleChange}
              value={inputText}
              required={true}
              disabled={label==="Dish Name:" && isInputDisabled?dishNameInputDisabled: false}
              
            />
          )}
          <Button style={{backgroundColor: '#776871'}} variant="contained" type='submit' className={inputType === 'textarea'? "textarea-btn": "input-btn"}>{editingItem? "Save": buttonText}</Button>
        </div>
      </form>

      <div className="item-list">
        <ol start="1" className='item-row'>
          {items.map((item) => (
            <li key={item.id} className="list-item-container" >
              <div className={inputType === 'textarea'? 'textarea-list':'input-list'}>
                <p className='item-text'>{item.text}</p>
                <div className="btns">
                  <div className="edit-btn" onClick={() => handleEdit(item.id, item.text)}>
                    <EditIcon />
                  </div>
                  <div className="delete-btn" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>  
      </div>
    </div>
  );
};

InputForm.propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  inputType: PropTypes.string.isRequired,
  isInputDisabled:PropTypes.bool.isRequired,
  setIsInputDisabled:PropTypes.func.isRequired,
  onChange: PropTypes.func,
};


export default InputForm