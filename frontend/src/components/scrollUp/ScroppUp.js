import './ScroppUp.scss';
import React, {useState, useEffect} from 'react';

const ScrollUp = () => {

    const [scroll, setScroll] = useState(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
      };
    
    const handleUpButton = () => {
    window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return(
        <div className="scrollUp">
            <button className={scroll < 300 ? "" : "show"} onClick={handleUpButton}>
                Go Up
            </button>
        </div>
       
    )
}

export default ScrollUp