import { ISignupForm, ISignupFormVaild, ISignupItem } from "interface/auth";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import {
  checkEmail,
  checkPassword,
  dobbleCheckPassword,
  checkNickName,
} from "utils/signupValidation";

interface FormInputValue {
  setSignupValues: Dispatch<SetStateAction<Object>>;
  signupValues: ISignupForm;
  data: ISignupItem;
  setIsValid: Dispatch<SetStateAction<Object>>;
  isValid: ISignupFormVaild;
  [key: string]: any;
}
const FormInput: FC<FormInputValue> = ({
  setSignupValues,
  signupValues,
  data,
  setIsValid,
  isValid,
  ...rest
}) => {
  const validateInputValue = (value: string, name: string) => {
    switch (name) {
      case "email":
        setIsValid({
          ...signupValues,
          [data.valueName]: checkEmail(value),
        });
        break;
      case "password":
        setIsValid({
          ...signupValues,
          [data.valueName]: checkPassword(value),
        });
        break;
      case "passwordCheck":
        setIsValid({
          ...signupValues,
          [data.valueName]: dobbleCheckPassword(value, signupValues.password),
        });
        break;
      case "nickName":
        setIsValid({
          ...signupValues,
          [data.valueName]: checkNickName(value),
        });
        break;
    }
  };

  // let timer;
  // const debouncInputValue = (event:HTMLInputElement<>) => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(function () {
  //     console.log("여기에 ajax 요청", event.target.value);
  //     setSignupValues({
  //       ...signupValues,
  //       [data.valueName]: event.target.value,
  //     });

  //     validateInputValue(event.target.value, data.valueName);
  //   }, 800);
  // };

  const handleValueimmediately = (event: any) => {
    setSignupValues({
      ...signupValues,
      [data.valueName]: event.target.value,
    });

    validateInputValue(event.target.value, data.valueName);
  };

  return (
    <FormWrapper>
      <InputLable>
        {data?.name}
        <sup>&nbsp;*</sup>
      </InputLable>
      <InputText>
        <SignupInput
          placeholder={data.placeholder}
          type={data.type}
          onChange={(e) => {
            e.preventDefault();
            if (data.valueName === ("email" || "nickName")) {
              // debouncInputValue(e);
            } else {
              handleValueimmediately(e);
            }
          }}
        />
        {/* {isValid[data.valueName] && (
          <IconValid className="material-symbols-rounded">done</IconValid>
        )} */}
      </InputText>
      {/* {isValid[data.valueName] !== null &&
        (isValid[data.valueName] ? (
          <ValidMsg>{data?.validation?.isValied}</ValidMsg>
        ) : (
          <ValidationMsg>{data?.validation?.inValied}</ValidationMsg>
        ))} */}
    </FormWrapper>
  );
};

export default FormInput;

const FormWrapper = styled.div`
  margin: 8px 0;
  width: 100%;
`;

const SignupInput = styled.input`
  border: none;
  border-bottom: 1px solid #cccccd;
  margin-bottom: 1rem;
  height: 35px;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid #4d23d6;
  }

  &::placeholder {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 3px;
  }
`;

// const ValidationMsg = styled.div`
//   width: 100%;
//   color: #fa3030;
//   font-size: 10px;
// `;

// const ValidMsg = styled.div`
//   width: 100%;
//   color: black;
//   font-size: 10px;
// `;

const InputText = styled.div`
  position: relative;
`;

const InputLable = styled.div`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: start;
`;

// const IconValid = styled.span`
//   position: absolute;
//   right: 3px;
// `;
