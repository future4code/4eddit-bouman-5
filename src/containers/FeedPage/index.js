import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'




class FeedPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){

        const {goToPostPageDetails} = this.props
        return(
            <div>
                <Button onClick={goToPostPageDetails}>Detalhes</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) =>({
    
})

const mapDispatchToProps = (dispatch) =>({
    goToPostPageDetails: () => dispatch(push(routes.postDetails))
})



export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);