import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useQuery from '../hooks/UseQuery'
import { getCategorysThunk } from '../redux/reducer/categorySlice'
import css from './OpenModal.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from '../modal/Modal'
import axios from 'axios'
import { getSubcategorysThunk } from '../redux/reducer/subcategorySlice'



const OpenModal = () => {

    const [activeModal, setActiveModal] = useState(false)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const { categorys, isLoading } = useSelector(state => state.categorysReducer)
    const categoryQuery = +useQuery().get('category')
    const { subcategorys } = useSelector(state => state.subcategorysReducer)
    const [searchParams, setSearchParams] = useSearchParams()
    

    useEffect(() => {
        dispatch(getCategorysThunk())
    }, [])


    const addSubCategory = async () =>{
        try {
            if(value.trim()){
                await axios.post("http://localhost:3100/subcategory", { name: value, parentId: categoryQuery })
                dispatch(getSubcategorysThunk())
                setActiveModal(false)
                setValue('')
            }
            
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            { searchParams.get('category') && <button className={css.btn} onClick={() => setActiveModal(true)}><AiOutlinePlus /></button>}
            <Modal active={activeModal} setActive={setActiveModal} style={css.modal} styles={{width: '345px' , heigth: '163px'}}>
                {<div>
                        {
                            categorys.map(({ id, name}) => {
                                return id === categoryQuery && <div className={css.box} key={id}>
                                        <p className={css.p}>{name} : Добавить Подкатегорию</p>
                                        <button
                                            className={css.btn1}
                                            onClick={() => setActiveModal(false)}
                                        >
                                            &#10005;
                                        </button>
                                    </div>
                            })
                        }
                    </div>
                }
                <input type="text" className={css.input}
                    placeholder='подкатегория'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    className={css.btn2}
                    onClick={() => addSubCategory()}
                >
                    Добавить
                </button>
            </Modal>    
        </div>
    )
}

export default OpenModal