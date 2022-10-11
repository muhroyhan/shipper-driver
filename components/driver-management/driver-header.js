import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import PropTypes from 'prop-types'
import { Col, Row, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { DRIVER_QUERY_STORAGEKEY, mobileWidth } from '../../constants/constants'
import { isEmpty } from 'lodash'
import useWindowWide from '../../utility/user-window-wide'

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

const HeaderComp2 = styled.div`
    background-color: ${colors.shipperWhite};
    padding: 20px;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: ${(props) =>
        props.$isDesktopWidth ? 'row' : 'column'
    };
    gap: 10px;

    > div:first-child {
        flex: 4;
        line-height: 1.3;
    }
    > div:nth-child(2) {
        flex: 1;
        .ant-input-affix-wrapper {
            height: 100%;
        }
    }
    > div:last-child {
        flex: 1;
        .ant-btn {
            height: 100%;
            width: 100%;
        }
    }

    .title {
        font-size: 20px;
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

    const isDesktopWidth = useWindowWide(mobileWidth)

    return (
        <HeaderComp2
            $isDesktopWidth={isDesktopWidth}
        >
            <div>
                <div className='title'>DRIVER MANAGEMENT</div>
                <div className='desc'>Data driver yang bekerja dengan anda</div>
            </div>
            <div>
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
            </div>
            <div>
                
                <AddDriverBtn type='primary'>
                    Tambah Driver <PlusOutlined />
                </AddDriverBtn>
            </div>
        </HeaderComp2>
    )

    // return (
    //     <HeaderComp justify='space-between'>
    //         <Col>
    //             <div className='title'>DRIVER MANAGEMENT</div>
    //             <div className='desc'>Data driver yang bekerja dengan anda</div>
    //         </Col>
    //         <SearchAddCol>
    //             <Input
    //                 allowClear={false}
    //                 defaultValue={inputValue}
    //                 placeholder='Cari Driver'
    //                 onChange={(e) => {
    //                     onSearch(e.target.value)
    //                     setInputValue(e.target.value)
    //                 }}
    //                 onPressEnter={(e) => {
    //                     onSearch(e.target.value)
    //                     setInputValue(e.target.value)
    //                 }}
    //                 prefix={<SearchOutlined style={{ color: colors.shipperRed }} />}
    //                 size='large'
    //                 value={inputValue}
    //             />
    //             <AddDriverBtn type='primary'>
    //                 Tambah Driver <PlusOutlined />
    //             </AddDriverBtn>
    //         </SearchAddCol>
    //     </HeaderComp>
    // )
}

ContentHeader.propTypes = {
    onSearch: PropTypes.func
}

export default ContentHeader