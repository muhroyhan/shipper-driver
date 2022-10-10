import { Col } from 'antd'
import { Row } from 'antd'
import Head from 'next/head'
import Header from '../components/header'
import ShipperDrawer from '../components/drawer'
import Content from '../components/content'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

const HomeComp = styled.div`
  height: 100%;
`

const Home = () => {
  return (
    <HomeComp>
      <Head>
        <title>Shipper Drivers</title>
        <meta name="description" content="Welcome to Shipper Drivers" />
        <link rel="icon" href="/shipper-icon.png" />
      </Head>
      <Header/>      
      <Row>
        <Col span={5}><ShipperDrawer/></Col>
        <Col span={19}><Content/></Col>
      </Row>
    </HomeComp>
  )
}

export default Home