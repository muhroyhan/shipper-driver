import { Image, Row, Col } from 'antd';
import React from 'react';
import styled from 'styled-components'
import colors from '../constants/colors'
  
const HeaderComp = styled(Row)`
  height: 10vh;
  padding: 0 20px;
  top: 0;
  background-color: white;
`

const ShipperComp = styled(Col)`
  color: black;
  text-align: right;

  span {
    color: ${colors.shipperRed};
    margin-right: 10px;
  }
`


const Header = () => {
  return (
      <HeaderComp align='middle' justify='space-between'>
          <Col span={6}>
              <Image src="/shipper-header.png" alt="Shipper Header" preview={false} height={25}/>
          </Col>
          <ShipperComp span={6}>
              Hello, <span>Shipper User</span>
              <Image src='/profile-user.png' alt='Profile User' preview={false} height={30}/>
          </ShipperComp>
      </HeaderComp>
  );
}

export default Header