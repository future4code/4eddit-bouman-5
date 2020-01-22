import styled from 'styled-components';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

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

export const Container = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;

`

export const CardContainer = styled.div `
    width: 300px;
    min-height: 150px;
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

export const CardHeader = styled.header `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`

export const CardMain = styled.main `
    width: 100%;
    border-bottom: 1px ridge black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    :hover {
        cursor: pointer;
    }
`

export const CardFooter = styled.footer `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const FormContainer = styled.div `
    width: 300px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
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
    background-color: none;
    margin-bottom: 20px;
    :hover {
        cursor: text;
    }
`

export const Label = styled.label `
    font-weight: bolder;
    font-size: 15px;
`