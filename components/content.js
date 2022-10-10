import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../constants/colors'
import { isEmpty, map } from 'lodash'
import ProfileCard from './profile_card'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Col, Row, Button, message, Space, Input } from 'antd'
import { LeftOutlined, RightOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PAGE_LOCALSTORAGE_KEY } from '../constants/constants'

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

function Content() {
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        const savedPage = parseInt(localStorage.getItem(PAGE_LOCALSTORAGE_KEY))
        if(savedPage) {
            setPage(savedPage)
        }
    }, [])

    useEffect(() => {
        if (page > 0) {
            localStorage.setItem(PAGE_LOCALSTORAGE_KEY, parseInt(page))
    
            const fetchDrivers = async () => {
                const queryJson = { page, results: 5, seed: 'abc' }
                router.push({ query: queryJson }, undefined, { shallow: true })
                const queries = new URLSearchParams(queryJson).toString()
                const url = `https://randomuser.me/api/?${queries}`
              
                // Fetch data from external API
                const res = await fetch(url)
                const data = await res.json()
                setDrivers(data.results)
            }
    
            fetchDrivers()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const handleChangePage = (currPage) =>  {
        setPage(currPage)
    }
    
    return (
        <ContentComp>
            <HeaderComp justify='space-between'>
                <Col>
                    <div className='title'>DRIVER MANAGEMENT</div>
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
                    <Button disabled={page === 1} type='text' onClick={() =>
                        handleChangePage(page === 1 ? 1 : page - 1)
                    }>
                        <LeftOutlined/> Previous Page
                    </Button>
                    <Button type='text' onClick={() =>
                        handleChangePage(page + 1)
                    } >
                        Next Page <RightOutlined/>
                    </Button>
                </Space>
            </SwitchPageComp>
        </ContentComp>
    )
}

export default Content