import React from "react";
import Button from "@material-ui/core/Button";
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index';
import { getPosts, createPost, setPostIdAction, votePost } from '../../actions';
import Foureddit from "../images/4eddit.png";
import Loader from "../../components/Loader"
import { BackToTopButton, ArrowContainer, StyledSearchTextField, CommentContainer, StyledImg, StyledHeader, StyledMain, LogoContainer, MenuContainer, StyledButton, StyledArrowUpward, StyledArrowDownward, StyledComment, Container, CardContainer, CardHeader, CardMain, CardFooter, FormContainer, P, Input, Label } from '../../style/styled'

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

const LoginWrapper = styled.form`
  width: 100%;
  height: auto;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
  color: white;
`;

class FeedPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: {},
            search: "",
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

    handleLogOut = () => {
        localStorage.removeItem("token")
        this.props.goToLoginPage()
    }

    handleInputOnChange = event => {
        const { name, value } = event.target;

        this.setState ({ form: { ...this.state.form, [name]: value }});
    }

    handleFieldChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });

        this.setState({ search: event.target.value })
      }

    handleCreatePost = event => {
        event.preventDefault();

        const { text, title } = this.state.form

        this.props.createPost ( text, title )
        this.setState({form: {}})
    }

    handleSetPostId = (postId) => {
        this.props.setPostId(postId)
        this.props.goToPostPageDetails()
    }

    handleScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {
        const { posts } = this.state;

        const { votePost, userVoteDirection } = this.props;

        let filterPosts = this.props.posts.filter(
            (post) => {
                return post.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || post.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        const postIsReady = this.props.posts.length === 0 ? <Loader/> :  (
            <div>
                {filterPosts.sort((a,b) => {
                    if (a.votesCount < b.votesCount) {
                        return 1;
                    } else {
                        return -1;
                    }
                }).map((post) =>
                    <CardContainer key={post.id}>
                        <CardHeader>
                            <P>{post.username}</P>
                        </CardHeader>
                        <CardMain onClick = {() => this.handleSetPostId(post.id)}>
                            <P>{post.text}</P>
                        </CardMain>
                        <CardFooter>
                            <ArrowContainer>
                                <StyledArrowUpward 
                                onClick={() => votePost(post.id, 1, userVoteDirection)}
                                color={post.userVoteDirection > 0 ? "secondary" : "inherit"}
                                />
                                {post.votesCount}
                                <StyledArrowDownward 
                                onClick={() => votePost(post.id, -1, userVoteDirection )}
                                color={post.userVoteDirection < 0 ? "primary" : "inherit"}
                                />
                            </ArrowContainer>
                            <CommentContainer>{post.commentsNumber}   <StyledComment onClick = {() => this.handleSetPostId(post.id)}/></CommentContainer>
                        </CardFooter>
                    </CardContainer>  
                )}
            </div>
        )

        return(
            <Container>
                <StyledHeader>
                    <LogoContainer>
                        <StyledImg src = {Foureddit}/>
                    </LogoContainer>
                    <MenuContainer>
                        <StyledButton onClick={this.handleLogOut}>log Out</StyledButton>
                    </MenuContainer>
                </StyledHeader>
                <StyledMain>
                    <LoginWrapper>
                        <StyledSearchTextField
                            color="primary"
                            onChange={this.handleFieldChange.bind(this)}
                            name="posts"
                            type="text"
                            label="Search"
                            value={posts}
                        />
                    </LoginWrapper>
                    <BackToTopButton onClick={this.handleScrollToTop}>voltar pro topo</BackToTopButton>
                    <FormContainer>
                        <form>
                            {createPostForm.map (input => (
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
                            <Button onClick = {this.handleCreatePost}> Enviar</Button>
                        </form>
                    </FormContainer>
                    {postIsReady}
                </StyledMain>
            </Container>
        )
    }

}

FeedPage.propTypes = {
    goToPostPageDetails: PropTypes.func.isRequired,
    goToLoginPage: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    setPostId: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    post: PropTypes.object,
}

const mapStateToProps = (state) =>({
    posts: state.posts.allPosts
})

const mapDispatchToProps = (dispatch) => ({
    goToPostPageDetails: () => dispatch(push(routes.postDetails)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPosts: () => dispatch(getPosts()),
    createPost: ( text, title ) => dispatch(createPost( text, title )),
    setPostId: (postId) => dispatch(setPostIdAction(postId)),
    votePost: (postId, direction, userVoteDirection) => (dispatch(votePost(postId, direction, userVoteDirection)))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);