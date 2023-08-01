import React from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../components/hooks/useFirestore';


export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState("");

  const {user: {uid}} = React.useContext(AuthContext);

  /** room documents
   * {
   *  name: 'room name',
   *  description: 'mo ta',
   *  members: [uid1, uid2,...]
   * }
   */

  const roomsCondition = React.useMemo(() => {
      return {
          fieldName: 'members',
          operator: 'array-contains',
          compareValue: uid
      }
  }, [uid])

  const rooms = useFirestore('rooms', roomsCondition);

  const selectedRoom = React.useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {}
  }, [rooms, selectedRoomId])

  const usersCondition = React.useMemo(() => {
    return {
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members
    }
  }, [selectedRoom.members])

  const members = useFirestore('users', usersCondition);

    return (
    <AppContext.Provider 
      value={
        {
          rooms,
          members,
          selectedRoom, 
          isAddRoomVisible, 
          setIsAddRoomVisible,
          isInviteMemberVisible,
          setIsInviteMemberVisible,
          selectedRoomId,
          setSelectedRoomId
          
        }}>
       {children}
    </AppContext.Provider>
  )
}
