import React from 'react'
import styles from './index.css'

class Item extends React.Component{

    render () {
        const {name, pinyin, hex} = this.props

        return (
            <div className={styles.navitem} style={{color: hex}}>
                <div className={styles.navcontainer}>
                    <span className={styles.navitem_ch}>{name}</span>
                    <span className={styles.navitem_en}>{pinyin}</span>
                </div>
                <div className={styles.navecolnum}>
                    {hex.substring(1, hex.length)}
                </div>
            </div>
        )
    }
}

export default Item