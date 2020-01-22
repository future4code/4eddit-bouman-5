import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'
import { getPostDetails, createComment, voteComment } from "../../actions";
import Comment from "@material-ui/icons/Comment"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import ArrowDownward from "@material-ui/icons/ArrowDownward"

// Estilização

const StyledArrowUpward = styled(ArrowUpward) `
    :hover {
        cursor: pointer;
    }
` 

const StyledArrowDownward = styled(ArrowDownward) `
    :hover {
        cursor: pointer;
    }
` 

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
    min-height: 150px;
    display: grid;
    grid-template-rows: 40px 2fr 30px;
    justify-items: center;
    align-content: center;
    text-align: center; 
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

const CardHeader = styled.header `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`

const CardMain = styled.main `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    :hover {
        cursor: pointer;
    }
`

const CardFooter = styled.footer `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormContainer = styled.div `
    width: 300px;
    min-height: 100px;
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

const PostContainer = styled.div `
    width: 300px;
    min-height: 200px;
    display: flex;
    display: grid;
    grid-template-rows: 40px 2fr 30px;
    justify-items: center;
    align-content: center;
    text-align: center; 
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

const P = styled.p `
    margin: 5px;
    padding: 0;
    font-size: 15px;
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

// Código

const createCommentForm = [
    {
        name: "text",
        type: "text",
        label: "Comment",
        required: true
    }
]

class PostDetailsPage extends React.Component{
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
        } else if (this.props.selectedPostId !== "") {
            this.props.getPostDetails(this.props.selectedPostId)
        } else {
            this.props.goBackToFeed()
        }
    }

    handleInputOnChange = event => {
        const { name, value } = event.target;

        this.setState ({ form: { ...this.state.form, [name]: value }});

    }

    handleCreateComment = event => {
        event.preventDefault();

        const { text } = this.state.form
        const { selectedPostId } = this.props

        this.props.createComment ( text, selectedPostId  )

        this.setState({form: {}})


    }

    render(){


        const { goBackToFeed, selectedPost } = this.props
        
        return(
            <Container>
                <Button onClick = {goBackToFeed}>Voltar</Button>
                    <PostContainer>
                        <CardHeader>
                            <P>{selectedPost.username}</P>
                        </CardHeader>
                        <CardMain>
                            <P>{selectedPost.text}</P>
                        </CardMain>
                        <CardFooter>
                            <P><ArrowUpward/>{selectedPost.votesCount}<ArrowDownward/></P>
                            <P>{selectedPost.commentsNumber} <Comment/></P>
                        </CardFooter>
                    </PostContainer>
                <FormContainer>
                    <form>
                        {createCommentForm.map (input => (
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
                        <Button onClick = {this.handleCreateComment}> Enviar</Button>
                    </form>
                </FormContainer>
                {selectedPost.comments && selectedPost.comments.map((comment) =>
                    <CardContainer>
                        <CardHeader>
                            <P>{comment.username}</P>
                        </CardHeader>
                        <CardMain>
                            <P>{comment.text}</P>
                        </CardMain>
                        <CardFooter>
                            <P><StyledArrowUpward onClick={() => this.props.voteComment(selectedPost.id, comment.id, 1, this.props.userVoteDirection)}/>
                                {comment.votesCount}
                            <StyledArrowDownward onClick={() => this.props.voteComment(selectedPost.id, comment.id, 0, this.props.userVoteDirection)}/></P>
                        </CardFooter>
                    </CardContainer>
                )}
            </Container>
        )
    }

}

const mapStateToProps = (state) =>({
    selectedPostId: state.posts.selectedPostId,
    selectedPost: state.posts.selectedPost
})

const mapDispatchToProps = (dispatch) =>({
    goBackToFeed: () => dispatch(push(routes.feed)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    createComment: (text, postId) => dispatch(createComment(text, postId)),
    voteComment: ( 
        postId, 
        commentId, 
        direction, 
        userVoteDirection 
    ) => dispatch (
        voteComment ( 
            postId, 
            commentId, 
            direction, 
            userVoteDirection 
        ))
})



export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);