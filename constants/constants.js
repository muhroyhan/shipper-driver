import { HomeFilled, CalendarOutlined } from '@ant-design/icons';
import Image from 'next/image';
import DriverManagement from '../components/driver-management/driver-management';

export const DRIVER_QUERY_STORAGEKEY = 'driver-query'

export const mobileWidth = 758

export const menuTabs = (pathSelected) => [
    {
        icon: <HomeFilled />,
        label: 'Beranda',
        path: '/dashboard',
        content: <div>Dashboard</div>
    },
    {
        icon: <Image 
            src={
                pathSelected === '/driver-management'
                    ? '/profile-user-red.png'
                    :'/profile-user.png'
            }
            alt='Profile User'
            width={16}
            height={16}
        />,
        label: 'Driver Management',
        path: '/driver-management',
        content: <DriverManagement/>
    },
    {
        icon: <CalendarOutlined />,
        label: 'Pickup',
        path: '/pickup',
        content: <div>Pickup</div>
    }
]