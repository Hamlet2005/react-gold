import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom'
import css from './Header.module.css'


const Header = ({ searchedProducts, setSearchedProducts }) => {

    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    const changeValue = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value && searchParams.get('gender') && searchParams.get('category') && searchParams.get('subcategory')) {
            setSearchParams({
                gender: searchParams.get('gender'),
                category: searchParams.get('category'),
                subcategory: searchParams.get('subcategory'),
                search: value
            })
        } else {
            if (searchParams.get('gender') && searchParams.get('category') && searchParams.get('subcategory')) {
                setSearchParams({
                    gender: searchParams.get('gender'),
                    category: searchParams.get('category'),
                    subcategory: searchParams.get('subcategory')
                })
            }

        }
    }, [value])

    return (
        <header className={css.header}>
            <input type="text"
                placeholder='Поиск'
                onChange={(e) => {
                    changeValue(e)
                    const searched = searchedProducts.filter(a => a.name.toLowerCase().includes(e.target.value.toLowerCase()))
                    setSearchedProducts(searched)
                }}
            />
            <AiOutlineSearch className={css.search} />
        </header>

    )
}

export default Header