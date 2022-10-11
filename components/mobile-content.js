import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import PropTypes from 'prop-types'
import { FIRST_PAGE_PATH, SECOND_PAGE_PATH, THIRD_PAGE_PATH } from '../constants/constants'
import DriverManagement from './driver-management/driver-management'

const MainComp = styled.div`
    background-color: ${colors.shipperBackGrey};
`

const MobileContent = (props) => {
    const { path = '' } = props
    
    return (
        <MainComp>
            {path === FIRST_PAGE_PATH && <div>Dashboard</div>}
            {path === SECOND_PAGE_PATH && <DriverManagement/>}
            {path === THIRD_PAGE_PATH && <div>Pickup</div>}
        </MainComp>
    )
}

MobileContent.propTypes = {
    path: PropTypes.string
}

export default MobileContent