import { Drawer } from 'antd'
import { map } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { menuTabs } from '../constants/constants'
import styled from 'styled-components'
import colors from '../constants/colors'

const EmptyHeaderDiv = styled.div`
    height: 60px;
`

const TabListDiv = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    ${(props) => {
        if (props.$isPathSelected) {
            return `
                > span {
                    color: ${colors.shipperRed}
                }
            `
        }
        return ''
    }}
    
    .label {
        ${(props) => {
            if (props.$isPathSelected) {
                return `color: ${colors.shipperRed};`
            }
            return ''
        }}
        margin-left: 10px;
    }

`

const MobileDrawer = (props) => {
    const { path = '', isOpen = false, setIsOpen, handleChangeContent } = props
    
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
                return <TabListDiv 
                    key={key}
                    $isPathSelected={path === tab.path}
                    onClick={() => {
                        setIsOpen(false)
                        handleChangeContent(tab.path)
                    }}
                >
                    {tab.icon}
                    <span className='label'>{tab.label}</span>
                </TabListDiv>
            })}
        </Drawer>
    )
}

MobileDrawer.propTypes = {
    isOpen: PropTypes.bool,
    path: PropTypes.string,
    setIsOpen: PropTypes.func,
    handleChangeContent: PropTypes.func
}

export default MobileDrawer