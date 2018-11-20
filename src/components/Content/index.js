import React, { Component } from 'react'
import styles from './index.css'

export default class Content extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { text } = this.props
        return (
            <div className={styles.content}><span>{text}</span></div>
        )
    }
}