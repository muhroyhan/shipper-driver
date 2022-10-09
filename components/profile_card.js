import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Divider, Image } from 'antd';
import colors from '../constants/colors';
import { EllipsisOutlined } from '@ant-design/icons';
import { Space, Col, Row } from 'antd';
import moment from 'moment';

const ProfileCardComp = styled.div`
    display: inline-block;
    text-align: left;
    margin: 0 20px;
    background-color: ${colors.shipperWhite}
`

const DriverIdSec = styled(Row)`
    padding: 10px 20px;

    section > span {
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

const detailRowSection = ({ title = '', value = '' }) => {
    return <DetailSection>
        <div className='title' >{title}</div>
        <div className='value' >{value}</div>
    </DetailSection>
}

const ProfileCard = (props) => {
    const { profile } = props
    const { id = {}, name = {}, picture = {}, dob = {} } = profile

    return (
        <ProfileCardComp>
            <DriverIdSec justify='space-between'>
                <Col>
                    Driver ID: <span>{id.value}</span>
                </Col>
                <Col>
                    <EllipsisOutlined />
                </Col>
            </DriverIdSec>
            <DividerComp/>
            <ProfileCardSec>
                <ImageComp src={picture.medium} alt='Profile User' preview={false}/>
            </ProfileCardSec>
            {detailRowSection({
                title: 'Nama Driver',
                value: `${name.title}. ${name.first} ${name.last}`
            })}
            {detailRowSection({
                title: 'Telepon',
                value: profile.phone
            })}
            {detailRowSection({
                title: 'Email',
                value: profile.email
            })}
            {detailRowSection({
                title: 'Tanggal Lahir',
                value: moment(dob.date).format('DD-MM-YYYY')
            })}
        </ProfileCardComp>
    )
}

ProfileCard.propTypes = {
    profile: PropTypes.object
}

export default ProfileCard