import React, { Component } from 'react'
import styles from './index.css'

export default class Title extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <div className={styles.title}></div>
        )
    }
}