import React from 'react'
import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import SecondaryButton from '../../../components/SecondaryButton'
import PortaldApp from '../../../components/PortaldApp'
import Link from 'next/link'

import styles from './index.module.css'

function DeveloperPortal() {

    const amount = 0;
    return (
        <div className={styles.container}>
            <Card
                title="Developer Portal"
                isBackEnabled={false}>

                <div className={styles.dapps}>


                    {(amount>0) ?
                    
                    
                    [...Array(parseInt(amount))].map((index, i) => {
                        return (
                            <>
                                <PortaldApp />
                            </>
                        )
                    })
                
                    :
                    <>
                    <div className={styles.no_apps}>
                        <div className={styles.img}></div>
                        <p className={styles.description_short} >You haven’t listed any dApps yet. Click below to get started </p>
                    </div>
                    
                    </>
                }
                </div>




                <Link href="../app/edit">
                    <div className={styles.actions} >
                        <button
                            className={styles.button}
                            >
                            List New App
                        </button>
                    </div>
                </Link>

            </Card>
        </div>
    )
}

export default DeveloperPortal
