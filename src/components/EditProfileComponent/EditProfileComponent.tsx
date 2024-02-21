import React from "react";
import MyPageNav from "../MyPageNav/MyPageNav";

import {
  Container,
  RightContent,
  Title,
  InnerContent,
  EmailInputArea,
  EmailInput,
  PasswordInputArea,
  PasswordInput,
  PasswordCheckInput,
  NameInputArea,
  NameInput,
  PhoneNumberInputArea,
  PhoneNumberInput,
  AddressInputArea,
  MainAddressArea,
  AddressInput,
  FindAddressButton,
  AddressDetailInput,
  EditButtonArea,
  EditButton,
} from "./EditProfileComponentStyle";

const EditProfileComponent = () => {
  return (
    <Container>
      <MyPageNav />
      <RightContent>
        <Title>프로필 수정</Title>
        <InnerContent>
          <EmailInputArea>
            <EmailInput type="text" placeholder="이메일" />
          </EmailInputArea>
          <PasswordInputArea>
            <PasswordInput type="password" placeholder="패스워드" />
            <PasswordCheckInput type="password" placeholder="패스워드 확인" />
          </PasswordInputArea>
          <NameInputArea>
            <NameInput type="text" placeholder="이름" />
          </NameInputArea>
          <PhoneNumberInputArea>
            <PhoneNumberInput type="text" placeholder="전화번호" />
          </PhoneNumberInputArea>
          <AddressInputArea>
            <MainAddressArea>
              <AddressInput type="text" placeholder="주소" readOnly />
              <FindAddressButton>검색</FindAddressButton>
            </MainAddressArea>
            <AddressDetailInput type="text" placeholder="상세 주소" />
          </AddressInputArea>
          <EditButtonArea>
            <EditButton>수정하기</EditButton>
          </EditButtonArea>
        </InnerContent>
      </RightContent>
    </Container>
  );
};

export default EditProfileComponent;
