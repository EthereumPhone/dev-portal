import React from 'react'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import SecondaryButton from '../../../components/SecondaryButton'
import Link from 'next/link'
import appIconSrc from './app.svg'
import Image from 'next/image'

import styles from './index.module.css'

function AppDetails() {

    /**
     * 
     * This is the page for app details
     * 
     * This is just dummy data, we need to add some props from the edit page
     * 
     * 
     * "Disclaimer":  The image might be a little off, because haven't tested it :)
    */
    return (
        <div className={styles.container}>
            <Card
                title="dApp Listing"
                isBackEnabled={true}>

                <div className={styles.cardhero}>
                    {/*<div className={styles.img}></div>*/}
                    <Image
                        className={styles.img}
                        src={appIconSrc}
                    />
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
                    <Link href="../edit">
                        <div >
                            <SecondaryButton
                                label="Edit Listing"

                            />
                        </div>
                    </Link>
                    <Link href="../portal">
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

export default AppDetails
