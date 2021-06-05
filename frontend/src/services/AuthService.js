
import {API_URL} from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api_url = API_URL
const AuthService = {
    Login: async (email, password) => {
        //alert(`${api_url} \n ${email} \n ${password}`)
        let url = `${api_url}/api/users/login`
        let rtnjson = {}
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(json => rtnjson = json)
        .catch(err => {
            alert('Error on http request'); 
            console.log('Error on fetch login')
            console.log(err)
        })
        
        return rtnjson
    },
    Register: async (data) => {
        let url = `${api_url}/api/users/register`
        let rtnjson = {}
        console.log(data);
        console.log(url);
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({...data}),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(json => rtnjson = json)
        .catch(err => {
            alert('Error on http request'); 
            console.log('Error On fetch Register')
            console.log(err)
        })
        // console.log(rtnjson)
        return rtnjson
    }
    ,
    TestGet: async () => {

        let url = `${api_url}/api/users`
        let accessToken = await AsyncStorage.getItem('token');
        let rtnjson = {}
        await fetch(url, {
            method: "GET",
            // body: JSON.stringify({...data}),
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => res.json())
        .then(json => rtnjson = json)
        .catch(err => {
            alert('Error on http request'); 
            console.log('Error on fetch get')
            console.log(err)
        })
        // console.log(rtnjson)
        return rtnjson
    }
}

export default AuthService

