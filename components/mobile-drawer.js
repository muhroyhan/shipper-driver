import { Drawer } from 'antd'
import { map } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { menuTabs } from '../constants/constants'
import { TabListDiv } from '../styles/global.styled-components'
import styled from 'styled-components'

const EmptyHeaderDiv = styled.div`
    height: 60px;
`

const MobileDrawer = (props) => {
    const { path = '', isOpen = false, setIsOpen } = props
    
    return (
        <Drawer
            closable={false}
            placement='left'
            open={isOpen}
            width={250}
            onClose={() => setIsOpen(!isOpen)}
        >
            <EmptyHeaderDiv/>
            {map(menuTabs(path), (tab, key) => {
                return <TabListDiv key={key}>
                    {tab.icon}
                    <span>{tab.label}</span>
                </TabListDiv>
            })}
        </Drawer>
    )
}

MobileDrawer.propTypes = {
    isOpen: PropTypes.bool,
    path: PropTypes.string,
    setIsOpen: PropTypes.func
}

export default MobileDrawer