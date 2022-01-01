import styles from './index.module.css'

const TextArea = ({ label, value = '', onChange, onValueChange }) => {

    const handleOnChange = (event) => {
        if (!!onChange) onChange(event)
        if (!!onValueChange) onValueChange(event.target.value)
    }

    return (
        <div className={styles.container}>

            <textarea
                className={styles.input}
                value={value}
                onChange={handleOnChange}
            >
                <span className={styles.label}>
                    {label}
                </span>
            </textarea>
        </div>
    )
}

export default TextArea