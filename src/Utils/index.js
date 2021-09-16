import axios from 'axios'

export const checkUserIsAdmin = currentUser => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
    const { userRoles } = currentUser
    if (userRoles.includes('admin')) return true

    return false
}

export const apiInstance = axios.create({
    baseURL: 'https://us-central1-react-ecommerce-4adb7.cloudfunctions.net/api'
})

// https://us-central1-react-ecommerce-4adb7.cloudfunctions.net/api/spgateway_return

// export const apiInstance = axios.create({
//     baseURL: 'http://localhost:5001/react-ecommerce-4adb7/us-central1/api'
// })

// https://us-central1-react-ecommerce-4adb7.cloudfunctions.net/api


