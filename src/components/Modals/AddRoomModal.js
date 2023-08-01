import React from 'react'
import { Input, Modal, Form } from 'antd'
import styled from 'styled-components'
import {AppContext} from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

const ModalStyled = styled(Modal)`
    .ant-modal-header {
        border-bottom: 1px solid rgba(230, 230, 230);
        margin-bottom: 20px;

    }
`
export default function AddRoomModal() {
    const {user: {uid}} = React.useContext(AuthContext);
    // const [visible, setVisible] = React.useState(false)
    const { isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        // handle logic
        // add new room to firestore
        addDocument('rooms', {...form.getFieldsValue(), members: [uid]});

        // reset form
        form.resetFields();
        setIsAddRoomVisible(false)
    }

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    }
  return (
    <div>
        <ModalStyled title="Tao phong" open={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical'>
                <Form.Item label="Ten phong: " name='name'>
                    <Input placeholder="Nhap ten phong..."/>
                </Form.Item>
                <Form.Item label="Mo ta: " name='description'>
                    <Input.TextArea placeholder="Nhap mo ta..."/>
                </Form.Item>
            </Form>
        </ModalStyled>
    </div>
  )
}
