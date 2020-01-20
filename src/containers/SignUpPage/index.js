import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'




class SignUpPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){

        const { goToLoginPage } = this.props

        return(
            <div>
                <Button onClick={goToLoginPage}> Sign Up </Button>
            </div>
        )
    }

}

const mapStateToProps = (state) =>({
    
})

const mapDispatchToProps = (dispatch) =>({
    goToLoginPage: () => dispatch(push(routes.root))
})



export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);