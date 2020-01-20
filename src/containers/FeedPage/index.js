import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'
import { getPosts } from '../../actions'

const Container = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const Div = styled.div `
    width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; 
    margin: 10px;
    border: 1px dotted black;
`


class FeedPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {

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

    render(){

        const {goToPostPageDetails} = this.props
        return(
            <Container>
                <form>
                    <TextField placeholder = "Faça seu Post"></TextField>
                    <br/>
                    <Button onClick={goToPostPageDetails}>Post Details</Button>
                </form>
                {this.props.posts.map((post) =>
                  <Div>
                      <p>{post.username}</p>
                      <p>{post.text}</p>
                      <Button onClick={goToPostPageDetails}>Post Details</Button>
                  </Div>  
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
    getPosts: () => dispatch(getPosts())
})



export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);