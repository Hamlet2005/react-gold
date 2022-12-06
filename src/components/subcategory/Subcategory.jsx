import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Subcategory.module.css";
import useQuery from "../hooks/UseQuery";
import { getSubcategorysThunk } from "../redux/reducer/subcategorySlice";
import { useSearchParams } from "react-router-dom";
import cn from 'classnames'
import OpenModal from "../openModal/OpenModal";

const Subcategory = () => {

    const genderQuery = +useQuery().get('subcategory') 
    const categoryQuery = +useQuery().get('category')
    const subcategoryQuery = +useQuery().get('subcategory') 
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { subcategorys, isLoading } = useSelector(state => state.subcategorysReducer)
    useEffect(() => {
        dispatch(getSubcategorysThunk())
    }, [])

    const changeSubcategory = (id) => {
        setSearchParams({
            gender: searchParams.get('gender'),
            category: searchParams.get('category'),
            subcategory: id
        })
    }

    return (
        <div className={css.head}>
                {isLoading ? <div>loading...</div>
                    : <div className={css.container}>
                        {
                            subcategorys.map(({ id, name, parentId}) => {
                                return parentId === categoryQuery && <div
                                    key={id}
                                    onClick={() => changeSubcategory(id)}
                                >
                                    <p className={cn(css.p, subcategoryQuery === id ? css.active : undefined)}>{name}</p>
                                </div>
                            })
                        }
                    
                    </div>
                    
                }
                
            
        </div>
       
        
    );
};

export default Subcategory;
