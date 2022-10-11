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
    padding: 0 20px;
    padding-bottom: 20px;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`

const SwitchPageComp = styled.div`
    text-align: center;

    .ant-btn{
        background: transparent;
        font-size: 20px;
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
            const driverQuery = JSON.parse(localStorage.getItem(DRIVER_QUERY_STORAGEKEY))
            if(!isEmpty(driverQuery)) {
                setPage(driverQuery.page || 1)
                setSearch(driverQuery.search || '')
            } else {
                setPage(1)
                setSearch('')
            }
        }
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
            // put page value / search value to url query and localStorage
            localStorage.setItem(DRIVER_QUERY_STORAGEKEY, JSON.stringify(queryJson))
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
        setPage(currPage)
    }

    //handle search driver from input box
    const handleSearchDriver = (value) => {
        setSearch(value)
    }

    const isDesktopWidth = useWindowWide(mobileWidth)
    
    return (
        <Fragment>
            <DriverHeader
                onSearch={handleSearchDriver}
            />
            {isDesktopWidth &&
                <ScrollComp>
                    {map(showedDrivers, (driver, key) => <ProfileCard key={key} profile={driver}/>)}
                </ScrollComp>
            }
            {!isDesktopWidth &&
                map(showedDrivers, (driver, key) => <ProfileCard key={key} profile={driver}/>)
            }
            <SwitchPageComp size='large'>
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
        </Fragment>
    )
}

export default DriverManagement