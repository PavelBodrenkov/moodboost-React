import './Main.scss';
import Hashtags from '../HashTags/Hashtags';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import {fetchAllDeviceCategory} from '../../http/postAPI';
import { useLocation} from 'react-router-dom';
import { fetchPost } from "../../http/postAPI";
import { fetchCategory } from "../../http/categoryAPI";

const Main = observer(({man}) => {
    
    const {category} = useContext(Context)
    const {post} = useContext(Context)
    const[cards, setCards] = useState([])
    const[target, setTarget] = useState(false)
    const location = useLocation();
    const [block, setBlock] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if(target) {
           
            fetchAllDeviceCategory(category.selectedCategory._id, token).then(data => post.setPosts(data.data))
        } else {
            fetchPost(token).then(data => post.setPosts(data.data))
        }
    }, [category.selectedCategory._id, target])

    const targetClick = (hash) => {
        setTarget(!target)
        category.setSelectedCategory(hash)  
    }

     return(
        <main  className="feed">
             {location.pathname === ('/search') && <SearchForm />}
            <div>
                <div className="tags-list mb-4">
                    {location.pathname !== ('/search') && category.category.map((hash, index) => {
                            return(
                                <button 
                                onClick={() => targetClick(hash)} className={`tags-list__item ${hash._id === category.selectedCategory._id && target && 'color-green'}`} key={hash._id}>{hash.name} 
                                </button>
                            )
                        })
                    }
                </div>
               
                {block && man.map((card, index) => {
                    console.log(card)
                    
                        return(
                            
                        <Card card={card} key={index} />
                    )
                        
                    })
                }
            </div>
        </main>
    )
})

export default Main