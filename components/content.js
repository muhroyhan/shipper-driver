import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../constants/colors'
import { map } from 'lodash'
import ProfileCard from './profile_card'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Col, Row, Button, message, Space, Input } from 'antd'
import { LeftOutlined, RightOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'

const HeaderComp = styled(Row)`
    background-color: ${colors.shipperWhite};
    margin: 20px 40px;
    padding: 10px 20px;

    .title {
        font-size: 25px;
        color: ${colors.shipperRed};
        font-weight: bold;
    }
`

const ScrollComp = styled(ScrollContainer)`
    background-color: ${colors.shipperBackGrey};
    white-space: nowrap;
    padding: 0 20px;
    padding-bottom: 20px;
`
  
const ContentComp = styled.div`
    height: 85vh;
    vertical-align: middle;
    padding-top: 10px;
    background-color: ${colors.shipperBackGrey};
`

const SwitchPageComp = styled.div`
    text-align: center;

    .ant-btn{
        background: transparent;
        font-size: 20px;
    }
`

const AddDriverBtn = styled(Button)`
    color: ${colors.shipperWhite};
    border-color: ${colors.shipperRed};
    background-color: ${colors.shipperRed};
    height: auto;
`

const SearchAddCol = styled(Col)`
    display: flex;
    padding: 8px 0;
    gap: 10px;
    align-items: stretch;
    font-size: 16px;
`

function Content(props) {
    const { drivers } = props

    return (
        <ContentComp>
            <HeaderComp justify='space-between'>
                <Col>
                    <div className='title'>DEVICE MANAGEMENT</div>
                    <div className='desc'>Data driver yang bekerja dengan anda</div>
                </Col>
                <SearchAddCol>
                    <Input
                        allowClear={false}
                        placeholder='Cari Driver'
                        prefix={<SearchOutlined style={{ color: colors.shipperRed }} />}
                        size='large'
                    />
                    <AddDriverBtn>
                        Tambah Driver <PlusOutlined style={{ color: colors.shipperWhite }} />
                    </AddDriverBtn>
                </SearchAddCol>
            </HeaderComp>
            <ScrollComp>
                {map(drivers, (driver, key) => <ProfileCard key={key} profile={driver}/>)}
            </ScrollComp>
            <SwitchPageComp size='large'>
                <Space size='large'>
                    <Button type='text' onClick={() => {
                        message.info('previous')
                    }} ><LeftOutlined/> Previous Page </Button>
                    <Button type='text' onClick={() => {
                        message.info('next')
                    }} >Next Page <RightOutlined/> </Button>
                </Space>
            </SwitchPageComp>
        </ContentComp>
    )
}

Content.propTypes = {
    drivers: PropTypes.array
}

export default Content