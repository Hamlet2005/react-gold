import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGendersThunk } from '../redux/reducer/genderSlice'
import css from './Gender.module.css'
import { ImUser, ImUserTie } from 'react-icons/im'
import useQuery from '../hooks/UseQuery'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'



const Gender = () => {

    const dispatch = useDispatch()
    const genderQuery = +useQuery().get('gender') 
    const [searchParams, setSearchParams] = useSearchParams();
    const { genders, isLoading } = useSelector(state => state.gendersReducer)
    
    useEffect(() => {
        dispatch(getGendersThunk())
    }, [])

    const changeGender = (id) =>{
        setSearchParams({
            gender: id
        })
    }

    return (
        <>
            {isLoading ? <div>loading...</div>
               :<div className={css.container}>
                    {
                        genders.map(({ id }) => {
                            return <div
                                className={cn(css.gender, id === genderQuery ? css.active : undefined)} key={id}
                                onClick={() => changeGender(id)}
                                
                            >
                               { id === 1 ? <ImUserTie/> : <ImUser/> }
                            </div>
                        })
                    }
                </div>
            }
        </>
    )
}

export default Gender