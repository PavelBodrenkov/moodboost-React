import './Hashtags.scss';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { useLocation} from 'react-router-dom';
import pers_footer from '../../image/pers-footer-2.svg';
import logo_footer from './../../image/logo-footer.svg';
import logo_telega from '../../image/logos_telegram.svg';
import logo_facebook from '../../image/logos_facebook.svg';
import logo_pinterest from '../../image/logos_pinterest.svg';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Hashtags  = observer(({visibCategory, targetClick, target})  => {
    const {category} = useContext(Context)
    const location = useLocation();

    const responseFacebook = (response) => {
        console.log(response);
      }

    return(
            <aside className="tags-list__container">
                <h4 className="tags-list__title">Life</h4>
                {location.pathname !== ('/search') && visibCategory.map((hash) => {
                        return(
                            <button 
                                onClick={() => targetClick(hash)} className={`tags-list__item ${hash._id === category.selectedCategory._id && target && 'color-green'}`} key={hash._id}>#{hash.name} 
                            </button>
                        )
                    })
                }
                <div className="tags-list__footer">
                    <div className="tags-list__logo-container">
                        <img className="tags-list__pers-footer" src={pers_footer} />
                        <img className="tags-list__logo-footer" src={logo_footer} />
                    </div>
                    <nav>
                        <ul className="tags-list__lists">
                            <li className="tags-list__list">About</li>
                            <li className="tags-list__list">Security</li>
                            <li className="tags-list__list">Privacy & Cookies</li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="tags-list__footer_soc-icon-lists">
                        <FacebookLogin
                            appId="384773476332427"
                            autoLoad = {true}
                            callback={responseFacebook}y
                            render={renderProps => (
                                <li onClick={renderProps.onClick} className="tags-list__footer_soc-icon-list"><img className="tags-list__footer_soc-icon" src={logo_facebook} /></li>
                            )}
                            />
                            <li className="tags-list__footer_soc-icon-list"><img className="tags-list__footer_soc-icon"src={logo_telega} /></li>
                            <li className="tags-list__footer_soc-icon-list"><img className="tags-list__footer_soc-icon" src={logo_pinterest} /></li>
                        </ul>
                    </nav>
                </div>
                
                </aside>
    )
})

export default Hashtags