import { Image, Row, Col } from 'antd'
import Hamburger from 'hamburger-react'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import { mobileWidth } from '../constants/constants'
import useWindowWide from '../utility/user-window-wide'
import PropTypes from 'prop-types'

const HeaderComp = styled.div`
  height: ${(props) => props.$height}px;
  padding: 0 20px;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:first-child {
    flex: 1;
  }
  div:nth-child(2) {
    flex: 8;
  }
  div:last-child {
    flex: 1;
    text-align: right;

    span {
      color: ${colors.shipperRed};
      margin-right: 10px;
    }
  }
`

const HamburgerDiv = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1001;
    height: 60px;
    display: flex;
    align-items: center;
`

const Header = (props) => {
  const { setIsOpen, isOpen } = props
  const isDesktopWidth = useWindowWide(mobileWidth)
  
  return (
    <Fragment>
        {!isDesktopWidth &&
            <HamburgerDiv>
                <Hamburger
                    color={colors.shipperTitleGrey}
                    rounded
                    size={20}
                    toggle={setIsOpen}
                    toggled={isOpen}
                />
            </HamburgerDiv>
        }
        <HeaderComp $height={isDesktopWidth ? 80 : 60}>
            {!isDesktopWidth &&<div></div> }
            <div><Image src="/shipper-header.png" alt="Shipper Header" preview={false} height={25}/></div>
            <div>
                {isDesktopWidth && <Fragment>Hello, <span>Shipper User</span></Fragment>}
                <Image src='/profile-user.png' alt='Profile User' preview={false} height={30}/>
            </div>
        </HeaderComp>
    </Fragment>
  );
}

Header.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool
}

export default Header