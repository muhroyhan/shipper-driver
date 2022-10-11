import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import PropTypes from 'prop-types'
import { FIRST_PAGE_PATH, menuTabs, mobileWidth, SECOND_PAGE_PATH, THIRD_PAGE_PATH } from '../constants/constants'
import DriverManagement from './driver-management/driver-management'
import { find } from 'lodash'

const MainComp = styled.div`
    background-color: ${colors.shipperBackGrey};
    text-align: center;
    min-height: 86vh;
`

const MobileContent = (props) => {
    const { path = '' } = props

    const currentContent = find(menuTabs(path), content => content.path === path)
    
    return (
        <MainComp>
            {currentContent.content || <div/>}
        </MainComp>
    )
}

MobileContent.propTypes = {
    path: PropTypes.string
}

export default MobileContent