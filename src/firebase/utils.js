import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from './config'


firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

//img測試
// export const storage = firebase.storage()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })
// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)


export const handleUserProfile = async ({userAuth, additionalDate}) => {
    if(!userAuth) return
    const { uid } = userAuth

    const userRef = firestore.doc(`users/${ uid }`)
    const snapshot = await userRef.get()

    if(!snapshot.exists){
        const { displayName, email } = userAuth
        const timestamp = new Date()
        const userRoles = ['user']

        try{
            await userRef.set({
                displayName,
                email,
                createDate: timestamp,
                userRoles,
                ...additionalDate
            })
        }catch(err){
            //console.log(err)
        }
    }
    return userRef   
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}