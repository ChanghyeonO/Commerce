import styled from "styled-components";
import CheckedImage from "../../../assets/images/CheckBox.png";

export const Container = styled.div`
  max-width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 900px;
`;

export const MainLogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const MainLogo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 12px;
`;

export const TermsIntroTextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TermsIntroText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

export const InnerContent = styled.div`
  width: 100%;
  height: 500px;
`;

export const TermsTextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const TermsTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
  border: none;
  overflow: scrolled;
  outline: none;
  resize: none;
  border-radius: 12px;
  font-size: 15px;
  padding: 30px;
`;

export const AgreeInputArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;
const checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid #999;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  &:checked {
    width: 23px;
    height: 23px;
    margin-right: 2px;
    margin-bottom: 4px;
    border: none;
    background-image: url(${CheckedImage});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const AgreeInput = styled(checkbox)`
  width: 20px;
  height: 20px;
`;

export const AgreeText = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const NextButtonArea = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NextButton = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: #5271ff;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
