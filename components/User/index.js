import React from 'react'
import styles from './index.module.css'

function User() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.wallet}>0x5c14CF51a09f24a1758eF49aEDD4a0574a9573A1</p>
                <div className={styles.img}></div>
            </div>
        </>
    )
}

export default User
