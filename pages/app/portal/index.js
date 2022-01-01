import React from 'react'
import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import SecondaryButton from '../../../components/SecondaryButton'
import PortaldApp from '../../../components/PortaldApp'
import Link from 'next/link'

import styles from './index.module.css'

function DeveloperPortal() {
    return (
        <div className={styles.container}>
            <Card
                title="Developer Portal"
                isBackEnabled={false}>

                <div className={styles.dapps}>

                   {[...Array(parseInt(3))].map((index, i) => {
                        return (
                            <>
                                <PortaldApp />
                            </>
                        )
                    })} 
                </div>
                


                
                    <Link href="../edit">
                        <div className={styles.actions} >
                            <button
                                className={styles.button}
                                onClick="#">
                                List New App
                            </button>
                        </div>
                    </Link>
            
            </Card>
        </div>
    )
}

export default DeveloperPortal
