import './Hashtags.scss'



function Hashtags ({hash, hasTagsHendle}) {

    
    return(
        <button onClick={() => hasTagsHendle(hash)} className="tags-list__item">{hash.name}</button>
    )
}

export default Hashtags