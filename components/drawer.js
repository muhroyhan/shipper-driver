import { HomeFilled, CalendarOutlined } from '@ant-design/icons';
import React from 'react'
import styled from 'styled-components'
import { Image, Space } from 'antd';

const MenuComp = styled(Space)`
    padding: 10px 0;
    width: 100%;
`

const DrawerComp = styled.div`
    padding: 20px;
    position: sticky;
    height: 85vh;
`

function ShipperDrawer() {
    return (
        <DrawerComp>
            <MenuComp direction='horizontal'>
                <HomeFilled />
                <div>Beranda</div>
            </MenuComp>
            <MenuComp direction='horizontal'>
                <Image src='/profile-user.png' alt='Profile User' preview={false} height={16}/>
                <div>Driver Management</div>
            </MenuComp>
            <MenuComp direction='horizontal'><CalendarOutlined /><div>Pickup</div></MenuComp>
        </DrawerComp>
    )
}

export default ShipperDrawer