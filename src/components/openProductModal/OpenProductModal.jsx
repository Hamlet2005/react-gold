import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Modal from '../modal/Modal'
import { AiOutlinePlus } from 'react-icons/ai'
import css from './OpenProductModal.module.css'
import Gender from '../gender/Gender'
import Category from '../category/Category'
import Subcategory from '../subcategory/Subcategory'
import { getProductsThunk } from '../redux/reducer/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import UploadImage from '../uploadImages/UploadImage'


const OpenProductModal = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [activeModal, setActiveModal] = useState(false)
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.productsReducer)
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('')
    const [price, setPrice] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    

    const addImage = async (image) => {
    
        try {
            if(value.trim() && price.trim() && searchParams.get('subcategory')){
                await axios.post("http://localhost:3100/products",
                {
                    image: `./images/${image}`,
                    name: value, price: price,
                    parentId: +searchParams.get('subcategory')
                })
                console.log(10)
                dispatch(getProductsThunk())
                setActiveModal(false)
                setImages([])
                setPrice('')
                setValue('')
                console.log(image);
            }  
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {
                searchParams.get('subcategory') && <button 
                    className={css.btn}
                    onClick={() => setActiveModal(true)}
                >
                    <AiOutlinePlus/>
                </button>
            }

            <Modal active={activeModal} setActive={setActiveModal} styles={{width: '850px', height: '505px'}}>
                
                <div className={css.box}>
                    <p className={css.p}>Добавить Категорию</p>
                    <button
                        className={css.btn1}
                        onClick={() => setActiveModal(false)}
                    >
                        &#10005;
                    </button>
                </div>

                <div className={css.genderCategory}>
                    <Gender />
                    <Category />
                </div>

                <Subcategory />

                <div className={css.block}>
                    <ul style={{ display: 'flex', padding: 0 }}>
                        <li>
                            <UploadImage
                                images={images}
                                setImages={setImages}
                            />
                            <button
                                className={css.btn2}
                                onClick={() => addImage(images[0].file.name)}
                            >
                                Добавить
                            </button>
                        </li>
                    </ul>

                    <div className={css.box1}>
                        <h1 className={css.h1}>Артикул</h1>
                        <input type="text" 
                            className={css.input} 
                            value={value} onChange={(e) => setValue(e.target.value)}
                        />
                    </div>

                    <div className={css.box1}>
                        <h1 className={css.h1}>Цена</h1>
                        <input type="number"
                            className={css.input}
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                </div>

            </Modal>

        </div>
    )
}

export default OpenProductModal