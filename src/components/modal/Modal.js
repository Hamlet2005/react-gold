import React, { useState } from 'react'
import css from './Modal.module.css'


const Modal = ({active, setActive, children, styles}) => {

  return (
    <div className={active ? css.active : css.modal}>
        <div className={css.container} style={styles} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Modal