import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index';
import { getPostDetails, createComment, voteComment } from "../../actions";
import Comment from "@material-ui/icons/Comment";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Foureddit from "../images/4eddit.png";
import Loader from "../../components/Loader"
import { BackToTopButton,ArrowContainer, CommentContainer, StyledButton, StyledImg, StyledMain, StyledHeader, LogoContainer, MenuContainer, StyledArrowUpward, StyledArrowDownward, Container, CardContainer, CardHeader, CardMain, CardFooter, FormContainer2, PostContainer, P, Input, Label } from "../../style/styled"

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

    handleScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {

        const { goBackToFeed, voteComment, userVoteDirection, selectedPost } = this.props

        const commentIsReady = selectedPost.comments && selectedPost.comments.length === 0 ? <Loader/> :  (
            <div>
                {selectedPost.comments && selectedPost.comments.sort((a,b) => {
                    if (a.votesCount < b.votesCount) {
                        return 1;
                    } else {
                        return -1;
                    }
                }).map((comment) =>
                    <CardContainer key={comment.id}>
                        <CardHeader>
                            <P>{comment.username}</P>
                        </CardHeader>
                        <CardMain>
                            <P>{comment.text}</P>
                        </CardMain>
                        <CardFooter>
                            <ArrowContainer>
                                <StyledArrowUpward 
                                onClick={() => voteComment(selectedPost.id, comment.id, 1, userVoteDirection)}
                                color={comment.userVoteDirection > 0 ? "secondary" : "inherit"}
                            />
                                    {comment.votesCount}
                                <StyledArrowDownward
                                onClick={() => voteComment(selectedPost.id, comment.id, -1, userVoteDirection)}
                                color={comment.userVoteDirection < 0 ? "primary" : "inherit"}
                            />  
                            </ArrowContainer>
                        </CardFooter>
                    </CardContainer>
                )}
            </div>
        )

        console.log(selectedPost.comments && selectedPost.comments.length)
        
        return(
            <Container>
                <StyledHeader>
                    <LogoContainer>
                        <StyledImg src = {Foureddit}/>
                    </LogoContainer>
                    <MenuContainer>
                        <StyledButton onClick = {goBackToFeed}>Voltar</StyledButton>
                    </MenuContainer>
                </StyledHeader>
                <StyledMain>
                    <BackToTopButton onClick={this.handleScrollToTop}>voltar pro topo</BackToTopButton>
                    <PostContainer>
                        <CardHeader>
                            <P>{selectedPost.username}</P>
                        </CardHeader>
                        <CardMain>
                            <P>{selectedPost.text}</P>
                        </CardMain>
                        <CardFooter>
                            <ArrowContainer>
                                <ArrowUpward/>{selectedPost.votesCount}<ArrowDownward/>
                            </ArrowContainer>
                            <CommentContainer>
                                {selectedPost.commentsNumber} <Comment/>
                            </CommentContainer>
                        </CardFooter>
                    </PostContainer>
                    <FormContainer2>
                        <form>
                            {createCommentForm.map (input => (
                                <div key={input.name}>
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
                    </FormContainer2>
                    {commentIsReady}
                </StyledMain>
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