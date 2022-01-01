import React from 'react'
import styles from './index.module.css'

function dApp() {
    return (
        <div className={styles.cardhero}>
            <div className={styles.img}></div>
                <div className={styles.details}>
                    <p className={styles.dapptitle}>Ethereum dApp</p>
                    <p className={styles.dapptype}>Exchange</p>
                    <p className={styles.description_short}>A short little description of the dApp goes right here</p>
                </div>
        </div>
    )
}

export default dApp
