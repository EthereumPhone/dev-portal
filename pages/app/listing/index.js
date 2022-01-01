import React from 'react'
import { useState } from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import SecondaryButton from '../../../components/SecondaryButton'
import TextInput from '../../../components/TextInput'
import TextView from '../../../components/TextView'
import Link from 'next/link'

import styles from './index.module.css'

function listing() {
    return (
        <div className={styles.container}>
            <Card
                title="dApp Listing"
                isBackEnabled={true}>

                <div className={styles.cardhero}>
                    <div className={styles.img}></div>
                    <div className={styles.details}>
                        <p className={styles.dapptitle}>Ethereum dApp</p>
                        <p className={styles.dapptype}>Exchange</p>
                        <p className={styles.description_short}>A short little description of the dApp goes right here</p>

                    </div>
                </div>

                <div className={styles.description}>
                    <h4 className={styles.description_title}>Description</h4>
                    <p className={styles.description_text}>Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits.Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits. Here’s a few sentences about the project. Some key details and features and benefits.</p>

                </div>



                <div className={styles.actions}>
                    <Link href="../app/edit">
                        <div>
                            <SecondaryButton
                                label="Edit Listing"
                                onClick={() => { }}
                            />

                        </div>
                    </Link>
                    <Link href="../app/portal">
                        <div >
                            <Button
                                label="Continue"

                            />
                        </div>
                    </Link>
                </div>



            </Card>
        </div>
    )
}

export default listing
