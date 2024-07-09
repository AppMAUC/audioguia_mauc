import './Card.css';

import { NavLink } from 'react-router-dom';
import CardImage from './CardImage';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';

const Card = ({ children, link }) => {

    return (
        <NavLink to={link} className="card-link">
            {children}
        </NavLink>
    )
}
  
Card.Image = CardImage;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card