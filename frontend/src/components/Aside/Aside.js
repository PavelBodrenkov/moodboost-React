import './Aside.scss';
import { Link } from 'react-router-dom';
import { Context } from "./../../index";
import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';

const Aside  = observer(() => {

    const {aside} = useContext(Context)

    return(
        <aside id="sidebar" className={`aside ${aside.isAsideOpen && 'aside_show'}`}>
            <div className="aside__card aside__card_purple">
                <h4 className="aside__card-title">Moodboost.me - The factory of your emotions</h4>
            </div>
            <footer className="aside__footer">
                <ul className="aside__footer-menu">
                    <li className="aside__footer-menu-li">
                      <Link to="/privacy-policy" className="aside__footer-menu-link">Privacy & Cookies Policy</Link>
                    </li>
                </ul>
                <span className="aside__footer-copyright">
                    © 2021. 
                    <br/>
                    All rights reserved.
                </span>
            </footer>
        </aside>
    )
})

export default Aside