import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index';
import { getPosts, createPost, setPostIdAction, votePost } from '../../actions'
import { StyledArrowUpward, StyledArrowDownward, StyledComment, Container, CardContainer, CardHeader, CardMain, CardFooter, FormContainer, P, Input, Label } from '../FeedPage/styled'

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

    handleLogOut = () => {
        localStorage.removeItem("token")
        this.props.goToLoginPage()
    }

    handleInputOnChange = event => {
        const { name, value } = event.target;

        this.setState ({ form: { ...this.state.form, [name]: value }});

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


    render() {



        return(
            <Container>
                <Button onClick = {this.handleLogOut}>log Out</Button>
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
                {this.props.posts.sort((a,b) => {
                    if (a.votesCount < b.votesCount) {
                        return 1;
                    } else {
                        return -1;
                    }
                }).map((post) =>
                  <CardContainer>
                      <CardHeader>
                        <P>{post.username}</P>
                      </CardHeader>
                      <CardMain onClick = {() => this.handleSetPostId(post.id)}>
                        <P>{post.text}</P>
                      </CardMain>
                      <CardFooter>
                          <P>
                              <StyledArrowUpward 
                              onClick={() => this.props.votePost(post.id, 1, this.props.userVoteDirection)}
                              color={post.userVoteDirection > 0 ? "secondary" : ""}
                              />
                              {post.votesCount}
                              <StyledArrowDownward 
                              onClick={() => this.props.votePost(post.id, -1, this.props.userVoteDirection )}
                              color={post.userVoteDirection < 0 ? "primary" : ""}
                              />
                          </P>
                          <P>{post.commentsNumber} <StyledComment onClick = {() => this.handleSetPostId(post.id)}/></P>
                      </CardFooter>
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
    setPostId: (postId) => dispatch(setPostIdAction(postId)),
    votePost: (postId, direction, userVoteDirection) => (dispatch(votePost(postId, direction, userVoteDirection)))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);