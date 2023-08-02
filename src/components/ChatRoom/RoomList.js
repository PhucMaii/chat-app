import React from 'react'
import { Button, Collapse, Typography } from 'antd'
import styled from "styled-components"
import { PlusSquareOutlined} from "@ant-design/icons"
import {AppContext} from '../../Context/AppProvider'
import Room from './Room'

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: white;
        }

        .ant-collapse-content-box{
            padding: 0 40px;
        }

        .add-room{
            color: white;
            padding: 0;
        }
    }
`

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;

`
export default function RoomList() {
    const {rooms, setIsAddRoomVisible, setSelectedRoomId, selectedRoomId} = React.useContext(AppContext);
    
    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    

    return (
    <div>
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sach cac phong" key='1'>
                {
                    rooms.map(room => <Room 
                        key={room.id} 
                        handleOnClick={() => setSelectedRoomId(room.id)}
                        name={room.name}
                        photoURL={room.photoURL}
                        message="hi">
                        
                    </Room> )
                }
              

                <Button type='text' icon={<PlusSquareOutlined/>} className='add-room' onClick={handleAddRoom}>Them Phong</Button>
            </PanelStyled>
        </Collapse>
    </div>
  )
}
