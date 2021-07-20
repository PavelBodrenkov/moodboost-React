import { useEffect, useContext } from 'react'
import './AdminCategory.scss'
import {fetchCategory, fetchDeleteCategory, fetchOneCategory} from '../../../http/categoryAPI';
import {Context} from '../../../index'
import { observer } from 'mobx-react-lite';
import PopupCategory from '../../../components/PopupCategory/PopupCategory';
import { useLocation } from 'react-router-dom';


    const AdminCategory = observer(() => {
        const {category} = useContext(Context)
        const{popup} = useContext(Context)
        const location = useLocation

//Выгрузка всех категорий
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        fetchCategory(token).then(data => category.setCategory(data.data))
    }, [])

//Открытие попапа
    function  openCategoryPopup  (bool, id) {
        popup.setPopup(true)
        category.setSelectEdit(bool)
        category.setSelectedCategory(id)
        if(category.selectEdit) {
            const token = localStorage.getItem("adminToken")
           fetchOneCategory(category.selectedCategory, token).then(data => category.setAppEditCategory(data.data))
        }
    }

//Закрытие попапа
    useEffect(() => {
        const closeESC = (evt) => {
          if (evt.key === "Escape") {
            popup.setPopup(false)
          }
        };
        document.addEventListener("keydown", closeESC);
    
        return () => {
          document.removeEventListener("keydown", closeESC);
        };
      }, []);

//Удаление категории
    function deleteCategory(id) { 
        const token = localStorage.getItem("adminToken")
        fetchDeleteCategory(id, token)
        .then(data => {
            const delcard = category.category.filter((item) => item._id !== id);
            category.setCategory(delcard)
        })
    }

    return(
        // <div className="adminRole">
        //     <div className="adminRole__container">
        //         <div className="adminRole__header">
        //             <h2>Категории</h2>
        //             <button onClick={() => openCategoryPopup(false, false)} type="button" className="btn btn-success">Добавить</button>
        //             {/* <button type="button" className="btn btn-danger">Удалить</button> */}
        //         </div>
        //         <div className="role-container">
        //                 <div>
        //                     <div className="adminRole__wrapper">
        //                         <div className="adminRole__name">
        //                                 <p>Имя</p>
        //                                 <p>slug</p>
        //                         </div>
        //                         <p>Доступные действия</p>
        //                     </div>
        //                     { category.category.map((category) => {
        //                             return(
        //                                 <div className="adminRole__wrapper adminCategories__wrapper" key={category.name}>
        //                                     <div className="adminRole__name">
        //                                         <p>{category.name}</p>
        //                                         <p>{category.slug}</p>
        //                                     </div>
        //                                     <div>
        //                                         <button onClick={() => openCategoryPopup(true, category._id)} type="button" className="btn btn-warning">Редактировать</button>
        //                                         <button onClick={() => deleteCategory(category._id)} type="button" className="btn btn-danger">Удалить</button>
        //                                     </div>
        //                                 </div>
        //                             )
        //                         })
        //                     }
        //                 </div>
        //         </div>
        //     </div>
        //      <PopupCategory />
        // </div>
        <div className="scroll-table">
            <div className="adminPost__header">
                <h2>Категории</h2>
                <button onClick={() => openCategoryPopup(false, false)} type="button" className="btn btn-success">Добавить</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>slug</th>
                        <th>Доступные действия</th>
                    </tr>
                </thead>
            </table>	
            <div className="scroll-table-body">
                <table>
                    <tbody>
                    { category.category.map((category) => {
                        return(
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>
                            <button onClick={() => openCategoryPopup(true, category._id)} type="button" className="btn btn-warning">Редактировать</button>
                            <button onClick={() => deleteCategory(category._id)} type="button" className="btn btn-danger">Удалить</button>                                  
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
	        </div>
            <PopupCategory />	
        </div>
    )
})

export default AdminCategory