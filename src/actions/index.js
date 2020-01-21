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

export const setPostIdAction = (postId) => ({
    type: "SET_POST_ID_ACTION",
    payload: {
        postId
    }
})

export const setPostDetailAction = (postDetail) => ({
    type: "SET_POST_DETAIL",
    payload: {
        postDetail,
    }
})

export const setCommentIdAction = (commentId) => ({
    type: "SET_COMMENT_ID_ACTION",
    payload: {
        commentId,
    }
})



// Votar no post

export const votePost = (postId, direction) => async (dispatch) => {

    const token = window.localStorage.getItem("token")

    const newPostVoteDirection = {
        direction,
    }

    try {
        await axios.put (`${baseUrl}/posts/${postId}`, newPostVoteDirection, {
            headers: {
                auth: token
            }
        })
        dispatch(getPosts(postId))
    } catch (error) {
        window.alert("Erro ao votar")
    }
    
}

// votar no Comentário

export const voteComment = (postId, commentId, direction) => async (dispatch) => {

    const token = window.localStorage.getItem("token")

    const newCommentVoteDirection = {
        direction,
    }
    try {
        await axios.put (`${baseUrl}/posts/${postId}/comment/${commentId}/vote`, newCommentVoteDirection, {
            headers: {
                auth: token
            }
        })

        dispatch(getPostDetails(postId, commentId))

    } catch (error) {
        window.alert("Erro ao votar")
    }
    
}

// ver detalhes de um post

export const getPostDetails = (postId) => async (dispatch) => {

    const token = window.localStorage.getItem("token")
    try {
        const response = await axios.get (`${baseUrl}/posts/${postId}`, {
            headers: {
                auth: token
            }
        })

        dispatch(setPostDetailAction(response.data.post))

    } catch (error) {
        window.alert("Falha na renderização dos detalhes")
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

// criar comentário

export const createComment = (text, postId) => async (dispatch) => {

    const newComment = {
        text,
    }

    const token = window.localStorage.getItem("token")

    try {
        await axios.post (`${baseUrl}/posts/${postId}/comment`, newComment, {
            headers: {
                auth: token
            }
        })
        window.alert("Comentário Criado com sucesso")
        
        dispatch(getPostDetails(postId))
    } catch (error) {
        window.alert("Falha ao criar o Comentário")
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

// logar na conta

export const login = (email, password) => async (dispatch) => {

    const login = {
        email,
        password,
    }
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