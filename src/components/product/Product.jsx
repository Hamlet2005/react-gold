import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useQuery from '../hooks/UseQuery'
import css from './Product.module.css'
import { getProductsThunk } from '../redux/reducer/productSlice'
import OpenProductModal from '../openProductModal/OpenProductModal'



const Product = ({ searchedProducts, setSearchedProducts, minPrice, maxPrice}) => {

    const dispatch = useDispatch()
    const { products, isLoading} = useSelector(state => state.productsReducer)
    const [searchParams, setSearchParams] = useSearchParams()
    const subcategoryQuery = +useQuery().get('subcategory') 
    const [product, setProduct] = useState([])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])


    useEffect(() => {
        setSearchedProducts(products)
        setProduct(products)
    }, [products])

    useEffect(() => {
        if(searchParams.get('search') === null){
            setSearchedProducts(product)
        }
    }, [searchParams.get('search')])


    return (
        <>
            {isLoading ? <div>loading...</div>
                : <div className={css.productHead}>
                    {
                        searchedProducts.map(({id, name, image, price, parentId}) => {
                            return parentId === subcategoryQuery && <div 
                                key={id}
                            >
                                <div className={css.block}>
                                    <img src={image} alt="" className={css.img}/>
                                    <div className={css.container}>
                                        <p className={css.p}>{name}</p>
                                        <span className={css.span}>{price}$</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <OpenProductModal />
                </div>
            }
        </>
    )
}

export default Product