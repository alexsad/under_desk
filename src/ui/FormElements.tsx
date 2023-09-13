import styled from "styled-components";

const FormGroup = styled.div`
    display: flex;
    width: 100%;
    padding:1rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
`;

const FormInput = styled.input`
    width: 100%;
    margin-left: .5rem;
    color: #fdfdfd;

    background-color: #090909;
    border: 1px solid #464646;
    padding: .2rem;
`;

const FormLabel = styled.label`
    width: 120px;
    text-align: left;
    color: #fdfdfd;
    font-size:.9rem;
`;

const FormButton = styled.button`
    padding: .3rem .4rem .3rem .4rem;
    border-radius: 2px;
    border: 1px solid #828282;
    background-color: #464646;
    color: #e0e0e0;
`;

export { FormButton, FormGroup, FormInput, FormLabel };

