import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {

  return (
    <header>
      <h1 className='header-title'><Link to="/">Family Recipes</Link></h1>
      <nav>
        <ul>
          <li className='header-li header-li-left'><Link to="/add-recipe">Add Recipe</Link></li>
          <li className='header-li header-li-right'><Link to="/saved-recipe">Saved Recipe</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
