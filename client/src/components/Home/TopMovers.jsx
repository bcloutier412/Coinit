import styles from "./Home.module.css";

const TopMovers = () => {
    return (
        <div className={styles.topMovers}>
            <div className={styles.topMoversContent}>
                <div style={{width: '380px'}}>Morestuff</div>
            </div>
        </div>
    );
};

export default TopMovers;
