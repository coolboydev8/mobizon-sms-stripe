import styles from './styles.module.css';

const CardItem = ({mainSrc, leftSrc, rightSrc}) => {
    return <div className={styles.container}>
        <div className={styles.body}>
            <img src={mainSrc} width={30} height={30} alt='left'/>
        </div>
        <div className={styles.footer}>
            <div className={styles.leftbtn}>
                <img src={leftSrc} width={24} height={24} alt='left'/>
            </div>
            <div className={styles.rightbtn}>
                <img src={rightSrc} width={24} height={24} alt='right'/>
            </div>
        </div>
    </div>
}

const CardItem4 = ({mainSrc, leftSrc}) => {
    return <div className={styles.container}>
        <div className={styles.body4}>
            <img src={mainSrc} style={{height: '350px'}} width={300}alt='left'/>
        </div>
        <div className={styles.footer4}>
            <img src={leftSrc} width={24} height={24} alt='left'/>
        </div>
    </div>
}


export {CardItem, CardItem4};