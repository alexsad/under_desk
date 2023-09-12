import styled from "styled-components";

const FormGroup = styled.div`
    display: flex;
    width: 100%;
    padding:1rem;
    box-sizing: border-box;
    justify-content: space-between;
`;

const FormInput = styled.input`
    width: 100%;
    margin-left: .5rem;
`;

const FormLabel = styled.label`
    width: 120px;
    text-align: left;
    color: #222;
    font-size:.9rem;
`;

const FormButton = styled.button`
    padding: .3rem .4rem .3rem .4rem;
    border-radius: 2px;
    border: 1px solid #828282;
`;

export { FormButton, FormGroup, FormInput, FormLabel };

