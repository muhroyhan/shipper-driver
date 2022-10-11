import Head from 'next/head'
import Header from '../components/header'
import styled from 'styled-components'
import { useState } from 'react'
import { Tabs } from 'antd'
import { map } from 'lodash'
import { menuTabs } from '../constants/constants'
import colors from '../constants/colors'

const HomeComp = styled.div`
  height: 100%;
`

const MenuComp = styled.div`
    width: 100%;
    text-align: left;

    span {
        padding-left: 10px;
    }
`

const ShipperTabs = styled(Tabs)`
    height: 90vh;
    .ant-tabs-left > .ant-tabs-content-holder, 
    .ant-tabs-left > div > .ant-tabs-content-holder {
        margin: 0;
        border: none;
    }

    .ant-tabs-content-holder {
        background-color: ${colors.shipperBackGrey}
    }

    .ant-tabs-ink-bar {
      z-index: 5;
      left: 0;
      width: 5px !important;
    }
`

const Home = () => {
  const [path, setPath] = useState('/driver-management')
  const handleChangeContent = (newPath) => {
    setPath(newPath)
  }

  const tabItems = () => map(menuTabs(path), tab => {
    return {
      label: (
          <MenuComp>
              {tab.icon}
              <span>{tab.label}</span>
          </MenuComp>
      ),
      key: tab.path,
      children: tab.content,
    }
  })

  return (
    <HomeComp>
      <Head>
        <title>Shipper Drivers</title>
        <meta name="description" content="Welcome to Shipper Drivers" />
        <link rel="icon" href="/shipper-icon.png" />
      </Head>
      <Header/>
      <ShipperTabs
        defaultActiveKey={path}
        tabPosition='left'
        onTabClick={(val, e) => handleChangeContent(val)}
        items={tabItems()}
      />
    </HomeComp>
  )
}

export default Home