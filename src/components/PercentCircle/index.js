import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.less'

const C = '#0093d3'
const M = '#cc006B'
const Y = '#fff10c'
const K = '#333'

export default class PercentCircle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {text, col} = this.props
        let colorNum  // 颜色的16进制表示
        let bgColor  // 颜色类别
        let rotatel
        let rotater
        switch(col){
            case 'blue':
                colorNum = C
                bgColor = styles.blue
                break
            case 'red':
                colorNum = M
                bgColor = styles.red
                break
            case 'yellow':
                colorNum = Y
                bgColor = styles.yellow
                break
            case 'black':
                colorNum = K
                bgColor = styles.black
                break
            default:
                colorNum = C
                bgColor = styles.blue
        }
        if (text < 50){
            rotatel = -180
            rotater = (text - 50) * 3.6 - 180
        } else {
            rotater = 180
            rotatel = (text - 100) * 3.6
        }

        return (
            <div className={styles.pcircle}>
                <div className={classnames(styles.pcircle, styles.number)}><span style={{color: colorNum}}>{text}</span></div>
                <div className={classnames(styles.pcircle, styles.bg)}></div>
                <div className={classnames(styles.pcircle, styles.pcircle_l)}>
                    <div className={classnames(styles.pcircle, styles.pcircle_bg_l, bgColor)} style={{transform: 'rotate(' + rotatel + 'deg)'}}></div>
                </div>
                <div className={classnames(styles.pcircle, styles.pcircle_r)}>
                    <div className={classnames(styles.pcircle, styles.pcircle_bg_r, bgColor)} style={{transform: 'rotate(' + rotater + 'deg)'}}></div>
                </div>
            </div>
        )
    }
}