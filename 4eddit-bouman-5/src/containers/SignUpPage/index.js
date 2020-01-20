import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router/index'

const signUpForm = [
    {
       name: 'name',
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

    render(){

        const { goToLoginPage } = this.props

        return(
            <div>
                <SignUpWrapper onSubmit={this.handleOnSubmit}>
                    <h1>Cadastre-se</h1>
                    {signUpForm.map(input =>(
                        <TextField
                            onChange={this.handleFieldChange}
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            required={input.required}
                            pattern={input.pattern}
                        />
                    ))}
                    <Button onClick={goToLoginPage}> Sign Up </Button>
                </SignUpWrapper>
                
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