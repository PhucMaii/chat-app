import React from 'react'
import { Modal, Form, Select, Spin, Avatar } from 'antd'
import styled from 'styled-components'
import {debounce} from 'lodash'
import {AppContext} from '../../Context/AppProvider'
import {db} from '../../firebase/config'

const ModalStyled = styled(Modal)`
    .ant-modal-header {
        border-bottom: 1px solid rgba(230, 230, 230);
        margin-bottom: 20px;

    }
`

function DebounceSelect({fetchOptions, debounceTimeout = 300 ,...props}) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching? <Spin size="small"/> : null}
            {...props}>
            {
                options.map((opt) => {
                    // opt: [{label, photoURL, value}]
                    return (
                       <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}

                       </Select.Option> 

                    )
                })
            }
                

        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => {
                return {
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL
                }
            }).filter(opt => !curMembers.includes(opt.value));
        });
}


export default function InviteMemberModal() {
    // const {user: {uid}} = React.useContext(AuthContext);

    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = React.useContext(AppContext);
    const [value, setValue] = React.useState();

    const [form] = Form.useForm();

    const handleOk = () => {
        // reset form value
        form.resetFields();

        // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })

        setIsInviteMemberVisible(false);
    }

    const handleCancel = () => {
        setIsInviteMemberVisible(false);
    }

    console.log(value, 'value');
  return (
    <div>
        <ModalStyled title="Moi them thanh vien" open={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout='vertical'>
              <DebounceSelect 
                mode="multiple"
                label="Ten cac thanh vien"
                value={value}
                placeholder="Nhap ten thanh vien..."
                fetchOptions={fetchUserList}
                onChange={newValue => setValue(newValue)}
                style={{width: '100%'}}
                curMembers={selectedRoom.members}

              />
            </Form>
        </ModalStyled>
    </div>
  )
}