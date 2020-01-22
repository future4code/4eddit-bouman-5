import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index';
import { getPostDetails, createComment, voteComment } from "../../actions";
import Comment from "@material-ui/icons/Comment";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { StyledArrowUpward, StyledArrowDownward, Container, CardContainer, CardHeader, CardMain, CardFooter, FormContainer, PostContainer, P, Input, Label } from "../PostDetailsPage/styled"

// array do input
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

    render() {

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
                            <P>
                                <StyledArrowUpward 
                                onClick={() => this.props.voteComment(selectedPost.id, comment.id, 1, this.props.userVoteDirection)}
                                color={comment.userVoteDirection > 1 ? "secondary" : ""}
                            />
                                    {comment.votesCount}
                                <StyledArrowDownward
                                onClick={() => this.props.voteComment(selectedPost.id, comment.id, 0, this.props.userVoteDirection)}
                                color={comment.userVoteDirection > 0 ? "primary" : ""}
                             />
                             </P>
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
    voteComment: ( postId, commentId, direction, userVoteDirection ) => dispatch (voteComment ( postId, commentId, direction, userVoteDirection ))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);