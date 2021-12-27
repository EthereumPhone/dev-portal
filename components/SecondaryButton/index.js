import React from 'react'
import styles from './index.module.css'

function SecondaryButton({ onClick, label }) {
    return (
        <button
            className={styles.backbutton}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default SecondaryButton
