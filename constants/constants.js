import { HomeFilled, CalendarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styled from 'styled-components';
import DriverManagement from '../components/driver-management/driver-management';

export const DRIVER_QUERY_STORAGEKEY = 'driver-query'
export const FIRST_PAGE_PATH = '/dashboard'
export const SECOND_PAGE_PATH = '/driver-management'
export const THIRD_PAGE_PATH = '/pickup'

export const mobileWidth = 768

const ContentDiv = styled.div`
`

export const menuTabs = (pathSelected) => [
    {
        icon: <HomeFilled />,
        label: 'Beranda',
        path: FIRST_PAGE_PATH,
        content: <ContentDiv>Dashboard</ContentDiv>
    },
    {
        icon: <Image 
            src={
                pathSelected === SECOND_PAGE_PATH
                    ? '/profile-user-red.png'
                    :'/profile-user.png'
            }
            alt='Profile User'
            width={16}
            height={16}
        />,
        label: 'Driver Management',
        path: SECOND_PAGE_PATH,
        content: <DriverManagement/>
    },
    {
        icon: <CalendarOutlined />,
        label: 'Pickup',
        path: THIRD_PAGE_PATH,
        content: <ContentDiv>Pickup</ContentDiv>
    }
]