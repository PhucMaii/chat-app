import { Avatar, Button, Input, Tooltip, Form, Alert } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons'
import Message from './Message'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services'
import { AuthContext } from '../../Context/AuthProvider'
import useFirestore from '../hooks/useFirestore'
import {formatRelative} from 'date-fns'


const WrapperStyled = styled.div`
    height: 100vh;
    overflow: hidden;

`
const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230);
    
    .header{
        &__info{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title{
            margin: 0;
            font-weight: bold;
        }
        &__description{
            font-size: 12px;
        }
    }
`
const ButtonGroupStyled = styled.div`
    display: flex;
    justify-content: center
`


const ContentStyled = styled.div`
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgba(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex: 1;
        margin-bottom: 0;
    }
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`


export default function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = React.useContext(AppContext);
    const {
        user: {uid, photoURL, displayName} 
    } = React.useContext(AuthContext);

    const [inputValue, setInputValue] = React.useState('');

    const [form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })

        form.resetFields(['message']);
    }

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id])

    const messages = useFirestore('messages', condition);

    return (
        <WrapperStyled>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{selectedRoom.name}</p>
                                <span className='header__description'>{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyled>
                                <Button icon={<UserAddOutlined />} type='text' onClick={(() => setIsInviteMemberVisible(true))}>Moi</Button>
                                <Avatar.Group size="small" maxCount={2}>
                                    {
                                        members.map((member) => {
                                            return <Tooltip title={member.displayName} key={member.uid}>
                                                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                            </Tooltip>
                                        })
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled>
                                {
                                    messages.map((mess) => {
                                        return (
                                            <Message 
                                                key={mess.id} 
                                                text={mess.text} 
                                                photoURL={mess.photoURL} 
                                                displayName={mess.displayName} 
                                                createdAt={mess.createdAt} /> 
                                        )
                                    })

                                    
                                }
                            </MessageListStyled>
                            <FormStyled form={form}>
                                <Form.Item name='message'>
                                    <Input 
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        placeholder="Nhap tin nhan..." 
                                        bordered={false} 
                                        autoComplete='off' />
                                </Form.Item>
                                <Button onClick={handleOnSubmit} type="primary">Gui</Button>
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : <Alert message="Hay chon phong" type='info' showIcon style={{margin: 5}} closable/>
        }

        </WrapperStyled>
    )
}
