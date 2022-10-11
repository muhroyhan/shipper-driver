import Head from 'next/head'
import Header from '../components/header'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { map } from 'lodash'
import { menuTabs, mobileWidth, SECOND_PAGE_PATH } from '../constants/constants'
import colors from '../constants/colors'
import useWindowWide from '../utility/user-window-wide'
import { TabListDiv } from '../styles/global.styled-components'
import MobileContent from '../components/mobile-content'
import MobileDrawer from '../components/mobile-drawer'

const HomeComp = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${colors.shipperBackGrey}
`

const ShipperTabs = styled(Tabs)`
    .ant-tabs-left > .ant-tabs-content-holder, 
    .ant-tabs-left > div > .ant-tabs-content-holder {
        margin: 0;
        border: none;
    }

    .ant-tabs-tabpane {
      padding: 0 !important;
    }

    .ant-tabs-nav {
      background-color: ${colors.shipperWhite};
    }

    .ant-tabs-content-holder {
        background-color: ${colors.shipperBackGrey};
    }

    .ant-tabs-ink-bar {
      z-index: 5;
      left: 0;
      width: 5px !important;
    }
`


const Home = () => {
  const [path, setPath] = useState(SECOND_PAGE_PATH)
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeContent = (newPath) => {
    setPath(newPath)
  }

  const tabItems = () => map(menuTabs(path), tab => {
    return {
      label: (
          <TabListDiv>
              {tab.icon}
              <span>{tab.label}</span>
          </TabListDiv>
      ),
      key: tab.path,
      children: tab.content,
    }
  })

  const isDesktopWidth = useWindowWide(mobileWidth)

  const handleOpenDrawer = (drawerStatus) => setIsOpen(drawerStatus)
  
  return (
    <HomeComp>
      <Head>
        <title>Shipper Drivers</title>
        <meta name="description" content="Welcome to Shipper Drivers" />
        <link rel="icon" href="/shipper-icon.png" />
      </Head>
      <Header
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      {!isDesktopWidth &&
          <MobileDrawer path={path} isOpen={isOpen} setIsOpen={setIsOpen}/>
      }
      {!isDesktopWidth &&
          <MobileContent path={path} />
      }
      {isDesktopWidth &&
          <ShipperTabs
            defaultActiveKey={path}
            tabPosition='left'
            onTabClick={(val, e) => handleChangeContent(val)}
            items={tabItems()}
          />
      }
    </HomeComp>
  )
}

export default Home