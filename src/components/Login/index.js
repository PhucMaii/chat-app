import {Row, Col, Button, Typography} from 'antd'
import firebase, {auth, db} from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/services';

const {Title}= Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function Login() {
    
    const handlefbLogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider);
        
        if(additionalUserInfo?.isNewUser) {
            const data = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
                keywords: generateKeywords(user.displayName)
            }
            addDocument('users', data);
        }
    }
    
  return (
    <div>
        <Row justify='center' style={{height: '800px'}}>
            <Col span={8}>
                <Title style={{textAlign: 'center'}}>Fun Chat</Title>
                <Button style={{width: '100%', marginBottom: 5}}>
                    Dang nhap bang Google
                </Button>
                <Button onClick={handlefbLogin} style={{width: '100%'}}>
                    Dang nhap bang Facebook
                </Button>
            </Col>
        </Row>

        <h1>Login</h1>

    </div>
  )
}
