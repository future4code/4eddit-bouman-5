import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'
import { signUp } from '../../actions/index'
import {StyledTextField, StyledButtonForms} from "../FeedPage/styled"

const signUpForm = [
    {
       name: 'username',
       type: 'text',
       label: 'Usuário ',
       required: true,
       pattern: "[A-Za-z]"
    },
    {
       name: 'email',
       type: 'email',
       label: 'E-mail: ',
       required: true,
       pattern: "[A-Za-^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$]{3,}"
    },
    {
        name: 'password',
        type: 'password',
        label: 'password',
        required: true,
    },

]

const SignUpWrapper = styled.form`
  width: 100%;
  height: 100vh;
  gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
  background-color: rgb(237, 127, 97);
  color: white;
`;


class SignUpPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            form: {}
        }
    }

    handleFieldChange = event => {
        const { name, value } = event.target
        console.log(name,value)
        this.setState({
          form: { ...this.state.form, [name]: value }
        });
    };

    handleOnSubmit = event => {
        event.preventDefault();
        console.log(this.state.form)
    }

    onHandleSignUp = () =>{
        const { email, password, username } = this.state.form
        this.props.signUp(email, password, username)
        this.setState({form: {}})
    }

    render(){

        const { goToLoginPage } = this.props

        return(
            <div>
                <SignUpWrapper onSubmit={this.handleOnSubmit}>
                    <h1>Cadastre-se</h1>
                    {signUpForm.map(input =>(
                        <StyledTextField
                            onChange={this.handleFieldChange}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            required={input.required}
                            pattern={input.pattern}
                        />
                    ))}
                    <StyledButtonForms onClick={this.onHandleSignUp}> Sign Up </StyledButtonForms>
                    <StyledButtonForms onClick={goToLoginPage}> Voltar </StyledButtonForms>
                </SignUpWrapper>
                
            </div>
        )
    }

}

const mapStateToProps = (state) =>({
    
})

const mapDispatchToProps = (dispatch) =>({
    goToLoginPage: () => dispatch(push(routes.root)),
    signUp: (email, password, username) => dispatch(signUp(email, password, username))
})



export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);