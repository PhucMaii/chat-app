import React from 'react'
import { Row, Col } from "antd"
import styled from 'styled-components'
import UserInfo from './UserInfo'
import RoomList from './RoomList'

const SidebarStyled = styled.div`
background: #212328;
color: #3f0e40;
height: 100vh;
overflow: hidden;
`;
export default function Sidebar() {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SidebarStyled>
    )
}
