import { observer } from 'mobx-react-lite'
import './CardMiddle.scss'
import { POST_ROUTE } from '../../utils/consts';


const CardMiddle = observer(({card}) => {
  
    return (
            <article className="article-preview-middle">
                <a href={POST_ROUTE + '/' + card._id}>
                    <img src={process.env.REACT_APP_API_URL + card.image.split('.').slice(0, -1).join('.') + "-" + 'cropped' + '.' + card.image.split('.').pop()} alt="" className="article-preview-middle__photo"/>
                </a>
                    <h3 className="article-preview-middle__title">{card.title}</h3>
                   
            </article>
    )
})

export default CardMiddle