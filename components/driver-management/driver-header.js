import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import PropTypes from 'prop-types'
import { Col, Row, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { DRIVER_QUERY_STORAGEKEY } from '../../constants/constants'
import { isEmpty } from 'lodash'

const HeaderComp = styled(Row)`
    background-color: ${colors.shipperWhite};
    margin: 20px 40px;
    padding: 10px 20px;
    height: 10vh;

    .title {
        font-size: 3vh;
        color: ${colors.shipperRed};
        font-weight: bold;
    }
`

const SearchAddCol = styled(Col)`
    display: flex;
    padding: 8px 0;
    gap: 10px;
    align-items: stretch;
    font-size: 16px;
`

const AddDriverBtn = styled(Button)`
    height: auto;
`

function ContentHeader(props) {
    const { onSearch } = props
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {        
        const driverQuery = JSON.parse(localStorage.getItem(DRIVER_QUERY_STORAGEKEY))
        if(!isEmpty(driverQuery)) {
            setInputValue(driverQuery.search || '')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <HeaderComp justify='space-between'>
            <Col>
                <div className='title'>DRIVER MANAGEMENT</div>
                <div className='desc'>Data driver yang bekerja dengan anda</div>
            </Col>
            <SearchAddCol>
                <Input
                    allowClear={false}
                    defaultValue={inputValue}
                    placeholder='Cari Driver'
                    onChange={(e) => {
                        onSearch(e.target.value)
                        setInputValue(e.target.value)
                    }}
                    onPressEnter={(e) => {
                        onSearch(e.target.value)
                        setInputValue(e.target.value)
                    }}
                    prefix={<SearchOutlined style={{ color: colors.shipperRed }} />}
                    size='large'
                    value={inputValue}
                />
                <AddDriverBtn type='primary'>
                    Tambah Driver <PlusOutlined />
                </AddDriverBtn>
            </SearchAddCol>
        </HeaderComp>
    )
}

ContentHeader.propTypes = {
    onSearch: PropTypes.func
}

export default ContentHeader