import axios from 'axios';
import  { push } from 'connected-react-router'
import { routes } from '../containers/Router';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"


const setPostAction = (posts) => ({
    type: "SET_POSTS_ACTION",
    payload: {
        posts,
    }
}) 

export const getPosts = () => async (dispatch) => {

    const token = window.localStorage.getItem("token")

    try {
        const response = await axios.get (`${baseUrl}/posts`, {
            headers: {
                auth: token
            }
        })
        dispatch(setPostAction(response.data.posts))
    } catch (error) {
        window.alert ("Erro de renderização")
    }
}

export const login = (email, password) => async (dispatch) => {

    const login = {
        email,
        password,
    }
    console.log(login)
    try {
        const response = await axios.post (`${baseUrl}/login`, login)
        window.localStorage.setItem("token", response.data.token)
        dispatch(push(routes.feed))
    } catch (error) {
        window.alert("Usuário ou senha inválidos")
    }

}

export const signUp = (email, password, username) => async (dispatch) =>{
    const signUp = {
        email,
        password,
        username,
    }

    
        await axios.post(`${baseUrl}/signup`, signUp)
        dispatch(push(routes.root))
    
}