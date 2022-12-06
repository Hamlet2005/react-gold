import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useQuery from '../hooks/UseQuery'
import { getCategorysThunk} from '../redux/reducer/categorySlice'
import css from './Category.module.css'
import cn from "classnames"
import OpenCategoryModal from '../openCategoryModal/OpenCategoryModal'


const Category = () => {

    const dispatch = useDispatch()
    const { categorys, isLoading } = useSelector(state => state.categorysReducer)
    const categoryQuery = +useQuery().get('category')
    const genderQuery = +useQuery().get('gender')
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        dispatch(getCategorysThunk())
    }, [])

    const changeCategory = (id) => {
        setSearchParams({
            gender: searchParams.get('gender'),
            category: id
        })
    }

    return (
        <>
            {isLoading ? <div>loading...</div>
                : <div className={css.categoryHead}>
                    {
                        categorys.map(({id, name, image, parentId}) => {
                            return parentId === genderQuery && <div 
                                key={id}
                                onClick={() => changeCategory(id)}
                            >
                                <div className={cn(css.block, categoryQuery === id ? css.active : undefined)}>
                                    <img src={image} alt=""/>
                                    <p>{name}</p>
                                </div>
                            </div>
                        })
                    }
                    
                </div>
            }
        </>
    )
}

export default Category