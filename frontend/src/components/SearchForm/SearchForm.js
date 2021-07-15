import { useContext, useEffect, useState } from 'react';
import './SearcForm.scss';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const  SearchForm = observer(() => {

    const {post} = useContext(Context)

    const [search, setSearch] = useState('')

    function hendleChange (e) {
        setSearch(e.target.value)
        post.setSearchPost(e.target.value)
    }

    return(
        <div className="feed__searching">
           <div>
               <div className="form-group">
                    <i className="icon-search"></i>
                    <input onChange={(e) => hendleChange(e)} type="search" placeholder="Enter a keyword..." value={search}/>
               </div>
               <h5 className="mt-4">Enter a keyword</h5>
           </div>
       </div>
    )
})

export default SearchForm