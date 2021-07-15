import './Card.scss';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import { POST_ROUTE } from '../../utils/consts';

function Card ({card}) {
    const history = useHistory()
    let cardViews = (card.views / 1000).toFixed(1)
    return(
        <>
       {card.status === 'Опубликовано' && <article onClick={() => history.push(POST_ROUTE + '/' + card._id)} className="article-preview">
           <Link to="#">
               <img src={process.env.REACT_APP_API_URL + card.image} alt="" className="article-preview__photo"/>
           </Link>
           <div className="article-actions">
                <button className="article-actions__item article-actions__item_disabled">
                    <i className="icon-eye"></i>
                    <span>{cardViews}K</span>
                </button>
           </div>
                <h3 className="article-preview__title">{card.title}</h3>
       </article>}
       </>
    )
}

export default Card