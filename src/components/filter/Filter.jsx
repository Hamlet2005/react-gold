import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../modal/Modal'
import css from './Filter.module.css'
import filtericon from './filter.png'
import { getProductsThunk } from '../redux/reducer/productSlice'



const Filter = ({ searchedProducts, setSearchedProducts, minPrice, maxPrice, setMinPrice, setMaxPrice}) => {

    const [activeModal, setActiveModal] = useState(false)
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.productsReducer)
    
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const filterProducts = () => {
        const searched = searchedProducts.filter(a => a.price >= minPrice && a.price <= maxPrice)
        setSearchedProducts(searched)
        console.log(searchedProducts);
        setActiveModal(false)
        setMinPrice('')
        setMaxPrice('')
    }

    

    return (
        <>
            <div className={css.filter} onClick={() => {
                    setActiveModal(true)
                    setSearchedProducts(products)
                }}
            >
                <img src={filtericon} alt="" className={css.img} />
                <div className={css.container}>
                    <p className={css.p}>Ф</p>
                    <p className={css.p}>и</p>
                    <p className={css.p}>л</p>
                    <p className={css.p}>ь</p>
                    <p className={css.p}>т</p>
                    <p className={css.p}>р</p>
                </div>
            </div>
            <Modal active={activeModal} setActive={setActiveModal} styles={{width: "300px", height: "160px"}}>
                <div className={css.block}>
                    <h1 className={css.h1}>Цена</h1>
                    <button onClick={() => setActiveModal(false)} className={css.btn2}>&#10005;</button>
                </div>
                <div className={css.block}>
                    <input
                        type="text" 
                        className={css.input}
                        value={minPrice}
                        onChange={(e) => setMinPrice(+e.target.value)}
                    />
                    <span className={css.span}>-</span>
                    <input
                        type="text" 
                        className={css.input}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(+e.target.value)}
                    />
                </div>
                <button 
                    className={css.btn3}
                    onClick={() => filterProducts()}
                >
                    Сохранить
                </button>
            </Modal>    

        </>
        
    )
}
    
export default Filter