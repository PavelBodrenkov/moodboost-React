import './Main.scss';
import Card from '../Card/Card';
import SearchForm from '../SearchForm/SearchForm';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import {fetchAllDeviceCategory} from '../../http/postAPI';
import { fetchPost } from "../../http/postAPI";
import { fetchCategory } from "../../http/categoryAPI";
import CardPreloader from './../CardPreloader/CardPreloader'
import CardMiddle from '../CardMiddle/CardMiddle';
import {useLocation, Route } from 'react-router-dom';
import {POST_ROUTE} from '../../utils/consts';
import Post from '../../pages/Post/Post';

const Main = observer(({card, visib, isLoad, target}) => {
    const {category} = useContext(Context)
    const {post} = useContext(Context)
    const location = useLocation();

    return(
            <div className="feed__card">
                <Route excat path={POST_ROUTE + '/:id'} component={Post} />
                    {card.slice(0, visib).map((onecCard) => {
                            return(  
                            <Card target={target} card={onecCard} key={onecCard._id} />
                        )
                        })
                    }
                    {isLoad && <CardPreloader />}
                     {/* {location.pathname === ('/search') && <SearchForm />} */}
            </div>
    )
})

export default Main