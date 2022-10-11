import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import { drop, filter, includes, isEmpty, map, size, slice, toLower } from 'lodash'
import ProfileCard from '../profile_card'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Col, Button, Space } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { DRIVER_QUERY_STORAGEKEY, mobileWidth } from '../../constants/constants'
import DriverHeader from './driver-header'
import useWindowWide from '../../utility/user-window-wide'

const ScrollComp = styled(ScrollContainer)`
    background-color: ${colors.shipperBackGrey};
    white-space: nowrap;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`

const SwitchPageComp = styled.div`
    text-align: center;
    margin: 10px 0;

    .ant-btn{
        background: transparent;
        @media (min-width: 769px) {
            font-size: 20px;
        }
        @media (max-width: ${props => props.$currMobWidth}px) {
            font-size: 14px;
        }
    }
`

const MobileScrollComp = styled.div`
    display: flex;
    margin: 0 20px;
    @media (min-width: 426px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
    @media (max-width: 425px) {
        flex-direction: column;
        flex-wrap: no-wrap;
    }
    gap: 10px;
`

const MainFragment = styled.div`
    max-width: 100%;
    display: block;
    @media (max-width: ${props => props.$currMobWidth}px) {
        max-width: 320px;
        display: inline-block;
    }
`

function DriverManagement() {
    const pageSize = 5
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [drivers, setDrivers] = useState([])
    const [showedDrivers, setShowedDrivers] = useState([])
    const [search, setSearch] = useState('')
    const [maxPage, setMaxPage] = useState(6)

    //component inititation
    useEffect(() => {
        // Fetch driver data
        const fetchDrivers = async () => {
            const queryJson = { results: 30, seed: 'abc', nat: 'us' }
            const queries = new URLSearchParams(queryJson).toString()
            const url = `https://randomuser.me/api/?${queries}`
          
            const res = await fetch(url)
            const data = await res.json()
            setDrivers(data.results)
        }

        fetchDrivers()
    }, [])

    //initial state after fetching driver data
    useEffect(() => {
        if (!isEmpty(drivers)) {
            const currQuery = router.query
            if(!isEmpty(currQuery)) {
                setPage(parseInt(currQuery.page) || 1)
                setSearch(currQuery.search || '')
            } else {
                setPage(1)
                setSearch('')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drivers])

    useEffect(() => {
        let queryJson = {}
        let newShowedDrivers = drivers
        if (!isEmpty(search)) {
            queryJson = { ...queryJson, search }
        }
        if (page > 0) {
            queryJson = { ...queryJson, page }
        }
        //filtering and pagination process
        if (!isEmpty(queryJson)) {
            //filtering driver by user name
            if (!isEmpty(search)) {
                newShowedDrivers = filter(drivers, driver => {
                    const { name = {} } = driver
                    return includes(toLower(name.first), search)
                })
                const newMaxPage = Math.ceil(size(newShowedDrivers) / pageSize)
                setMaxPage(newMaxPage)
            } else {
                setMaxPage(6)
            }
            //pagination driver list
            if (page > 0) {
                newShowedDrivers = handlePagination(newShowedDrivers, page)
            }
            router.push({ query: queryJson }, undefined, { shallow: true })
            // update drivers to show
            setShowedDrivers(newShowedDrivers)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search])

    //pagination logic
    const handlePagination = (items, page) => {
        const offset = (page - 1) * pageSize
        const driversOffset = drop(items, offset)
        return slice(driversOffset, 0, pageSize)
    }

    //func to handle next and prev page buttons
    const handleChangePage = (currPage) =>  {
        setPage(parseInt(currPage))
    }

    //handle search driver from input box
    const handleSearchDriver = (value) => {
        setSearch(value)
    }

    const isDesktopWidth = useWindowWide(mobileWidth)
    console.log(page)
    return (
        <MainFragment
            $currMobWidth={mobileWidth}
        >
            <DriverHeader
                onSearch={handleSearchDriver}
            />
            {isDesktopWidth &&
                <ScrollComp>
                    {map(showedDrivers, (driver, key) => <ProfileCard key={key} profile={driver}/>)}
                </ScrollComp>
            }
            {!isDesktopWidth &&
               <MobileScrollComp>
                    {map(showedDrivers, (driver, key) => <ProfileCard key={key} profile={driver}/>)}
                </MobileScrollComp>
            }
            <SwitchPageComp
                $currMobWidth={mobileWidth}
                size='large'
            >
                <Space size='large'>
                    <Button
                        disabled={page === 1} 
                        type='text' 
                        onClick={() => handleChangePage(page === 1 ? 1 : page - 1)}
                    >
                        <LeftOutlined/> Previous Page
                    </Button>
                    <Button
                        disabled={page === maxPage} 
                        type='text'
                        onClick={() => handleChangePage(page + 1)}
                    >
                        Next Page <RightOutlined/>
                    </Button>
                </Space>
            </SwitchPageComp>
        </MainFragment>
    )
}

export default DriverManagement