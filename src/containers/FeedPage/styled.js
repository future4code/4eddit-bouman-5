import styled from "styled-components";
import Comment from "@material-ui/icons/Comment"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Button from "@material-ui/core/Button";

// containers

export const StyledHeader = styled.header `
    width: 100%;
    min-height: 100px;
    background-color: rgb(237, 127, 97);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: absolute;
    top: 0px;
`

export const StyledMain = styled.main `
    width: 100%;
    min-height: 689px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #ffa485;
    position: absolute;
    top: 120px;

` 

export const LogoContainer = styled.div `
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const MenuContainer = styled.div `
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export const Container = styled.div `
    width: 100%;
    min-height: 689px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffa485;

`

export const CardContainer = styled.div `
    width: 300px;
    min-height: 230px;
    display: grid;
    grid-template-rows: 40px 2fr 40px;
    justify-items: center;
    align-content: center;
    text-align: center; 
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

export const FormContainer = styled.div `
    width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    margin: 10px;
    background-color: white;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

export const FormContainer2 = styled.div `
    width: 300px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    margin: 10px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

export const PostContainer = styled.div `
    width: 300px;
    min-height: 200px;
    display: flex;
    display: grid;
    grid-template-rows: 40px 2fr 30px;
    justify-items: center;
    align-content: center;
    text-align: center; 
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px;
    :hover {
        box-shadow: 0px 0px 10px;
    }
`

// Card Containers

export const CardHeader = styled.header `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgb(237, 127, 97);
    border-radius: 5px;
`

export const CardMain = styled.main `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    :hover {
        cursor: pointer;
        color: black;
        background-color: #e0e0de;
    }
`

export const CardFooter = styled.footer `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: rgb(237, 127, 97);
    border-radius: 5px;
`

// inputs do formulário

export const P = styled.p `
    margin: 5px;
    padding: 0;
    font-size: 15px;
`

export const Input = styled.input `
    outline: none;
    border: 0;
    width: 90%;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
    :hover {
        cursor: text;
    }
`

export const Label = styled.label `
    font-weight: bolder;
    font-size: 15px;
`

// Botões

export const BackToTopButton = styled(Button) `
    position: fixed;
    right: 50px;
    bottom: 5%;
    color: white;
    width: auto;
    :hover {
        cursor: pointer;
        border: 1px solid white;
        background-color: rgb(237, 127, 97);
    }
` 

export const StyledButton = styled(Button) `
    cursor: pointer;
    color: white;
    width: auto;
    margin-right: 40px;
    :hover {
        border: 1px solid white;
        background-color: rgb(237, 127, 97);
    }
`

// icones material ui

export const StyledArrowUpward = styled(ArrowUpward) `
    :hover {
        cursor: pointer;
    }
` 

export const StyledArrowDownward = styled(ArrowDownward) `
    :hover {
        cursor: pointer;
    }
` 

export const StyledComment = styled(Comment) `
    :hover {
        cursor: pointer;
    }
` 

// Imagem


export const StyledImg = styled.img `
    width: 100px;
    height: 100px;
    display: grid;
    grid-column-start: 2;
    margin-left: 20px;
`