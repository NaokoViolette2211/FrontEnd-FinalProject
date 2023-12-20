// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import SavedRecipe from './pages/SavedRecipe/SavedRecipe'
import ViewRecipe from './pages/ViewRecipe/ViewRecipe'
import Home from './pages/Home/Home'
import './App.css'
import NoMatch from './pages/noMatch'





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/saved-recipe' element={<SavedRecipe />} />
        <Route path='/view-recipe/:index' element={<ViewRecipe />} />
        
        <Route path='/*' element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
