import styles from './index.css';
import Circle from '../components/PercentCircle/index'
import Title from '../components/Title'
import Content from '../components/Content'
import Item from '../components/NavItem'
import Divider from '../components/Divider'
import { Row, Col } from 'antd'
import React from 'react'
import { connect } from 'dva'

class Index extends React.Component {

    onClick = (idx) => {
        const { dispatch } = this.props
        dispatch({
            type: 'zhongguose/changeColor',
            payload: idx,
        })
    }

    render() {
        console.log(this.props)
        const { current, colors } = this.props.zhongguose

        return (
            <div className={styles.container} style={{backgroundColor: colors[current].hex}}>
                <div className={styles.normal}>
                    <div className={styles.left_container}>
                        <div className={styles.left_row_wrapper}>
                            <Row type='flex'>
                                {colors.map((i,idx) => {
                                    return (
                                        <Col span={3} key={idx}>
                                            <a index={idx} onClick={() => {this.onClick(idx)}}><Item name={i.name} pinyin={i.pinyin.length > 11? i.pinyin.substring(0, 11): i.pinyin} hex={i.hex}></Item></a>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>
                    <div className={styles.right_container}>
                        <Row>
                            <Col span={3}>
                                <div className={styles.color_value}>
                                    <Divider text={'C'}></Divider>
                                    <div className={styles.circlewrapper}><Circle text={colors[current].CMYK[0]} col='blue'></Circle></div>
                                    <Divider text={'M'}></Divider>
                                    <div className={styles.circlewrapper}><Circle text={colors[current].CMYK[1]} col='red'></Circle></div>
                                    <Divider text={'Y'}></Divider>
                                    <div className={styles.circlewrapper}><Circle text={colors[current].CMYK[2]} col='yellow'></Circle></div>
                                    <Divider text={'K'}></Divider>
                                    <div className={styles.circlewrapper}><Circle text={colors[current].CMYK[3]} col='black'></Circle></div>
                                    <Divider text={'R'}></Divider>
                                    <div className={styles.rgbval}>{colors[current].RGB[0]}</div>
                                    <Divider text={'G'}></Divider>
                                    <div className={styles.rgbval}>{colors[current].RGB[1]}</div>
                                    <Divider text={'B'}></Divider>
                                    <div className={styles.rgbval}>{colors[current].RGB[2]}</div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <Content text={colors[current].name}></Content>
                            </Col>
                            <Col span={3}><Title></Title></Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState2Props({ dispatch, zhongguose }) {
    return { dispatch, zhongguose }
}

export default connect(mapState2Props)(Index)