import styles from './index.module.css'


const ProgressBar = ({ label, percentComplete }) => (
  <div className={styles.container}>

    {label &&
      <span className={styles.top_label}>
        {label}
      </span>
    }

    <div className={styles.bar_wrapper}>
      <div
        className={styles.bar}
        style={{ width: `${percentComplete}%` }}
      />    
    </div>
    
    {percentComplete === 100 &&
      <span className={styles.complete_label}>
        Complete
      </span>
    }
  </div>
)

export default ProgressBar