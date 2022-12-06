import React, { useState, useEffect } from 'react'
import css from './OpenCategoryModal.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getGendersThunk } from '../redux/reducer/genderSlice'
import { getCategorysThunk } from '../redux/reducer/categorySlice'
import { ImUser, ImUserTie } from 'react-icons/im'
import axios from 'axios'
import UploadImage from '../uploadImages/UploadImage'
import cn from 'classnames'
import useQuery from '../hooks/UseQuery'
import { useSearchParams } from 'react-router-dom'


const OpenCategoryModal = () => {

	const [activeModal, setActiveModal] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = useState('')

	const dispatch = useDispatch()
	const { genders, isLoading } = useSelector(state => state.gendersReducer)
	useEffect(() => {
		dispatch(getGendersThunk())
	}, [])

	
	const [images, setImages] = useState([]);


  const genderQuery = +useQuery().get('gender') 
	const { categorys } = useSelector(state => state.categorysReducer)

	const changeGender = (id) => {
		setSearchParams({
			gender: id
		})
	}

	const addImage = async (image) => {
		try {
			if(value.trim()){
				await axios.post("http://localhost:3100/category", { image: `./images/${image}`, name: value, parentId: genderQuery })
				dispatch(getCategorysThunk())
				setActiveModal(false)
				setValue('')
				setImages([])
			}			
		} catch (e) {
			console.log(e)
		}
	}


	return (
		<div>
			{searchParams.get('gender') && <button 
				className={css.btn} 
				onClick={() => setActiveModal(true)}
			>
				<AiOutlinePlus />
			</button>}

			<Modal active={activeModal} setActive={setActiveModal} styles={{width: '300px', height: '360px'}}>
				<div className={css.box}>
					<h1 className={css.h1}>Добавить Категорию</h1>
					<button
					 	className={css.btn1}
						onClick={() => setActiveModal(false)}
					>
						&#10005;
					</button>
				</div>

					{isLoading ? <div>loading...</div>
						: <div className={css.container}>
							{
								genders.map(({ id }) => {
									return <div
										key={id}
										className={cn(css.gender, id === genderQuery ? css.active : undefined)}
										onClick={() => changeGender(id)}
									>
										{id === 1 ? <ImUserTie /> : <ImUser />}
										{id === 1 ? <p>Мужской</p> : <p>Женский</p>}
									</div>
								})
							}
						</div>
					}

				<input type="text" className={css.input}
				 	placeholder='категория'
					value={value}
				  	onChange={(e) => setValue(e.target.value)}/>
				<div>

					<ul style={{ display: 'flex', padding: 0}}>
						<li>
							<UploadImage
								images={images}
								setImages={setImages}
								isMulti={false}
							/>
							<button
								className={css.btn2}
								onClick={() => addImage(images[0].file.name)}
							>
							Добавить
							</button>
							
						</li>
					</ul>
				</div>
			</Modal>
		</div>
	)
}

export default OpenCategoryModal