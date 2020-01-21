import axios from 'axios';
import  { push } from 'connected-react-router'
import { routes } from '../containers/Router';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"


const setPostAction = (posts) => ({
    type: "GET_POSTS_ACTION",
    payload: {
        posts,
    }
}) 

export const setPostDetailsAction = (postId) => ({
    type: "GET_POST_DETAIL_ACTION",
    payload: {
        postId
    }
})


// ver detalhes de um post

export const getPostDetails = (postId) => async (dispatch) => {

    const token = window.localStorage.getItem("token")

    try {
        const response = await axios.get (`${baseUrl}/posts/${postId}`, {
            headers: {
                auth: token
            }
        })

        dispatch(setPostDetailsAction(response.data.postId))

    } catch (error) {
        window.alert("Falha na renderização dos detalhes")
    }


}

// criar post

export const createPost = (text, title) => async (dispatch) => {
    
    const newPost = {
        text,
        title
    }

    const token = window.localStorage.getItem("token")

    try {
        await axios.post (`${baseUrl}/posts`, newPost, {
            headers: {
                auth: token
            }
        })
        window.alert("Post Criado com sucesso")
        dispatch(getPosts())
    } catch (error) {
        window.alert("Falha ao criar o Post")
    }
} 

// mostrar postagens

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

// logar na conta

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

// Função de cadastro

export const signUp = (email, password, username) => async (dispatch) =>{
    const signUp = {
        email,
        password,
        username,
    }

    
        await axios.post(`${baseUrl}/signup`, signUp)
        dispatch(push(routes.root))
    
}