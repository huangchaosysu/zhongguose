import React from 'react'
import styles from './index.css'

export default class Divider extends React.Component {
    render () {
        const { text } = this.props
        return (
            <div className={styles.divider}>
                <span>{text}</span>
            </div>
        )
    }
}