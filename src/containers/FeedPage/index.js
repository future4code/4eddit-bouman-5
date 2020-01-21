import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'
import { getPosts, createPost, setPostDetailsAction } from '../../actions'

// Estilização

const Container = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;

`

const CardContainer = styled.div `
    width: 300px;
    min-height: 230px;
    display: grid;
    grid-template-rows: 40px 1.5fr 30px 40px;
    justify-items: center;
    align-content: center;
    text-align: center; 
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px;
`

const CardHeader = styled.header `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CardMain = styled.main `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CardFooter = styled.footer `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormContainer = styled.div `
    width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    margin: 10px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

const P = styled.p `
    margin: 5px;
    padding: 0;
`

const Input = styled.input `
    outline: none;
    border: 0;
    width: 90%;
    border-bottom: 1px solid black;
    background-color: none;
    margin-bottom: 20px;
    :hover {
        cursor: text;
    }
`

const Label = styled.label `
    font-weight: bolder;
    font-size: 15px;
`

// inputs do formulário

const createPostForm = [
    {
        name: "title",
        type: "text",
        label: "Título",
        required: true
    },
    {
        name: "text",
        type: "text",
        label: "Post",
        required: true
    }
]

// Código
class FeedPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: {}
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token")
        if(token === null){
          this.props.goToLoginPage()
        } else {
            this.props.getPosts()
        }
    }

    handleInputOnChange = event => {
        const { name, value } = event.target;

        this.setState ({ form: { ...this.state.form, [name]: value }});
    }

    handleCreatePost = event => {
        event.preventDefault();

        const { text, title } = this.state.form

        this.props.createPost ( text, title )
    }

    handleTripId = (postId) => {
        this.props.setPostId(postId)

        this.props.goToPostPageDetails()
    }

    render() {

        return(
            <Container>
                <FormContainer>
                    <form>
                        {createPostForm.map (input => (
                            <div key = {input.name}>
                                <Label htmlFor = {input.name}>{input.label}</Label>
                                <Input
                                    id = {input.id}
                                    name = {input.name}
                                    type = {input.type}
                                    value = {this.state.form[input.name] || ""}
                                    required = {input.required}
                                    onChange = {this.handleInputOnChange}
                                    pattern = {input.pattern}
                                />
                            </div>
                        ))}
                        <Button onClick = {this.handleCreatePost}> Enviar</Button>
                    </form>
                </FormContainer>
                {this.props.posts.map((post) =>
                  <CardContainer>
                      <CardHeader>
                        <P>{post.username}</P>
                      </CardHeader>
                      <CardMain>
                        <P>{post.text}</P>
                      </CardMain>
                      <CardFooter>
                          <P>Likes 0</P>
                          <P>1 Comments</P>
                      </CardFooter>
                      <Button onClick = {() => this.handleTripId(post.id)}>Post Details</Button>
                  </CardContainer>  
                )}
            </Container>
        )
    }

}

const mapStateToProps = (state) =>({
    posts: state.posts.allPosts
})

const mapDispatchToProps = (dispatch) => ({
    goToPostPageDetails: () => dispatch(push(routes.postDetails)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPosts: () => dispatch(getPosts()),
    createPost: ( text, title ) => dispatch(createPost( text, title )),
    setPostId: (postId) => dispatch(setPostDetailsAction(postId))
})



export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);