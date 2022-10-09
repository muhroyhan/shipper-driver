import { Col } from 'antd'
import { Row } from 'antd'
import Head from 'next/head'
import Header from '../components/header'
import ShipperDrawer from '../components/drawer'
import Content from '../components/content'
import styled from 'styled-components'

const HomeComp = styled.div`
  height: 100vh;
`

const BodyComp = styled.div`
  display: flex;

  .drawer {
    flex-grow: 1;
  }
  .content {
    flex-grow: 3;
  }
`

const Home = ({ drivers }) => {
  return (
    <HomeComp>
      <Head>
        <title>Shipper Drivers</title>
        <meta name="description" content="Welcome to Shipper Drivers" />
        <link rel="icon" href="/shipper-icon.png" />
      </Head>
      <Header/>      
      <BodyComp>
        <div className='drawer'><ShipperDrawer/></div>
        <div className='content'><Content drivers={drivers}/></div>
      </BodyComp>
    </HomeComp>
  )
}

// server-side rentdering function
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://randomuser.me/api/?page=1&results=5`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { drivers: data.results } }
}

export default Home