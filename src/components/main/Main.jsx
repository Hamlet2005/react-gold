import React from 'react'
import Category from '../category/Category'
import Subcategory from '../subcategory/Subcategory'
import Gender from '../gender/Gender'
import css from './Main.module.css'
import Product from '../product/Product'
import OpenCategoryModal from '../openCategoryModal/OpenCategoryModal'
import OpenModal from '../openModal/OpenModal'
import Filter from '../filter/Filter'

const Main = ({ searchedProducts, setSearchedProducts, minPrice , maxPrice, setMinPrice ,setMaxPrice  }) => {

    return (
        <main className={css.main}>
            <div className={css.genderCategory}>
                <Gender/>
                <Category/>
                <OpenCategoryModal/>
            </div>
            <div className={css.genderCategory}>
                <Subcategory />
                <OpenModal />
            </div>
            <Filter
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice} 
                searchedProducts={searchedProducts}
                setSearchedProducts={setSearchedProducts}
            />
            <Product
                searchedProducts={searchedProducts}
                setSearchedProducts={setSearchedProducts} 
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />
        </main>
    )
}

export default Main