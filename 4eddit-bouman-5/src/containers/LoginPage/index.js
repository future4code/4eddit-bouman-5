import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'




class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){

      const { goToFeedScreen , goToSignUpScreen } = this.props

        return(
            <div>
              <Button onClick={goToFeedScreen}>Entrar</Button>
              <Button onClick={goToSignUpScreen}>Cadastrar</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) =>({
    
})

const mapDispatchToProps = (dispatch) =>({
    goToFeedScreen: () => dispatch(push(routes.feed)) ,
    goToSignUpScreen: () => dispatch(push(routes.signUp)) 
})



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);