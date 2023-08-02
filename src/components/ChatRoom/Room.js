
import { styled } from "styled-components"
import { Avatar, Typography } from "antd"

export default function Room({photoURL, name, message, handleOnClick}) {
    const WrapperStyled = styled.div`
        display: grid;
        grid-template-columns: 20% 80%;
        margin-bottom: 10px;
        padding: 10px 20px;
        border-radius: 10px;

        &:hover{
            background: #2e333d;
            cursor: pointer;
        }

        .avatar{
            grid-column: 1/2;
            grid-row: 1/3;
        }

        .name{
            grid-column: 2/3;
            grid-row: 1/2;
        }

        message{
            grid: column: 2/3;
            grid-row: 2/3;
        }
        

    `
    const TitleStyled = styled(Typography.Text)`
        color: #ececee;
        font-weight: bold;
    `
    const MessageStyled = styled(Typography.Text)`
        color: #9c9ea1;
    `

    return (
        <WrapperStyled onClick={handleOnClick}>
            <Avatar shape="square" size='large' className="avatar" src={photoURL}> {photoURL ? "" : name?.charAt(0)?.toUpperCase()} </Avatar>
            <TitleStyled className="name">{name}</TitleStyled>
            <MessageStyled className="message">{message}</MessageStyled>


        </WrapperStyled>
    )
}