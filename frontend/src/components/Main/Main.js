import './Main.scss';
import Card from '../Card/Card';
import { observer } from 'mobx-react-lite';
import { Component, useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import CardPreloader from './../CardPreloader/CardPreloader'
import {useLocation, Route, matchPath } from 'react-router-dom';
import {POST_ROUTE} from '../../utils/consts';
import Post from '../../pages/Post/Post';
import SignUpWeekly from '../SignUpWeekly/SignUpWeekly';
import Comments from '../Comments/Comments';
import logoFooter from '../../image/logo-footer.svg';

const Main = observer(({card, visib, isLoad, target, }) => {
    const location = useLocation();

    return(
            <div className="feed__card">
                <Route excat path={POST_ROUTE + '/:id'} component={Post}/>
               
                { matchPath(location.pathname, { path: POST_ROUTE + '/:id' }) && 
                    <div className="block-next-card">
                        <p>Also on<img className="block-next-card__img" src={logoFooter}/></p>
                    </div>
                }
                    {card.slice(0, visib).map((onecCard) => {
                            return(  
                            <Card card={onecCard} key={onecCard._id} />
                        )
                        })
                    }
                    {isLoad && <CardPreloader />}
                     {/* {location.pathname === ('/search') && <SearchForm />} */}
            </div>
    )
})

export default Main