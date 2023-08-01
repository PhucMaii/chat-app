import React from "react"
import { db } from "../../firebase/config"

const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createdAt');

        /* condition
            {
                fieldName: 'abc',
                operator: '==',
                compareValue: 'adb'
            }
        */
        if(condition) {
            if(!condition.compareValue || condition.compareValue.length === 0) {
                return;
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue );
        }

        const unsubscribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setDocuments(documents);
        })
        return () => {
            unsubscribed();
        }

    }, [collection, condition])

    return documents
}

export default useFirestore;