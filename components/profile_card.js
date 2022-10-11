import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Divider, Image } from 'antd';
import colors from '../constants/colors';
import { EllipsisOutlined } from '@ant-design/icons';
import { Space, Col, Row } from 'antd';
import moment from 'moment';
import useWindowWide from '../utility/user-window-wide';
import { mobileWidth } from '../constants/constants';

const ProfileCardComp = styled.div`
    min-width: 280px;
    margin: 0 20px;
    @media (max-width: ${props => props.$currMobWidth}px) {
        margin: 0;
    }
    @media (max-width: 425px) {
        min-width: 90%;
    }
    display: inline-block;
    text-align: left;
    background-color: ${colors.shipperWhite}
`

const DriverIdSec = styled(Row)`
    padding: 10px 20px;

    .ant-col > .driver-id {
        color: ${colors.shipperRed};
    }
`
const ProfileCardSec = styled.section`
    padding: 20px;
`

const ImageComp = styled(Image)`
    border-radius: 50px;
`

const DividerComp = styled(Divider)`
    margin: 0;
`

const DetailSection = styled.div`
    padding: 0 20px;
    margin: 10px 0;

    .title {
        color: ${colors.shipperTitleGrey};
        font-weight: 600;
    }
    .value {        
        font-weight: 600;
    }
`

const DetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: ${props => props.$currMobWidth}px) {
        flex-direction: row;
    }
`

const detailRowSection = ({ title = '', value = '' }) => {
    return <DetailSection>
        <div className='title' >{title}</div>
        <div className='value' >{value}</div>
    </DetailSection>
}

const ProfileCard = (props) => {
    const { profile } = props
    const { id = {}, name = {}, picture = {}, dob = {} } = profile

    const isDesktopWidth = useWindowWide(mobileWidth)

    return (
        <ProfileCardComp
            $currMobWidth={mobileWidth}
        >
            <DriverIdSec justify='space-between'>
                <Col>
                    Driver ID: <span className='driver-id'>{id.value}</span>
                </Col>
                <Col>
                    <EllipsisOutlined />
                </Col>
            </DriverIdSec>
            <DividerComp/>
            <DetailDiv
                $currMobWidth={mobileWidth}
            >
                <ProfileCardSec>
                    <ImageComp src={picture.medium} alt='Profile User' preview={false}/>
                </ProfileCardSec>
                <div>
                {detailRowSection({
                    title: 'Nama Driver',
                    value: `${name.first} ${name.last}`
                })}
                {detailRowSection({
                    title: 'Telepon',
                    value: profile.phone
                })}
                {isDesktopWidth && detailRowSection({
                    title: 'Email',
                    value: profile.email
                })}
                {isDesktopWidth && detailRowSection({
                    title: 'Tanggal Lahir',
                    value: moment(dob.date).format('DD-MM-YYYY')
                })}
                </div>
            </DetailDiv>
        </ProfileCardComp>
    )
}

ProfileCard.propTypes = {
    profile: PropTypes.object
}

export default ProfileCard