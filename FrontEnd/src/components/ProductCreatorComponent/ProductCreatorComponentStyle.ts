import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddButtonIcon from "../../assets/icons/add-button.png";

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const InnerContent = styled.div`
  width: 70%;
  margin: 0 auto;
  @media (max-width: 1180px) {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
`;

export const IntroText = styled.h3`
  font-size: 20px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

const InputDesign = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 15px;
  font-weight: bold;
`;

const TextAreaDesign = styled.textarea`
  width: 320px;
  height: 100px;
  box-sizing: border-box;
  background-color: #eee;
  border: none;
  overflow: scrolled;
  outline: none;
  resize: none;
  border-radius: 12px;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const ButtonDesign = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: #38b6ff;
`;

export const ProductNameInput = styled(InputDesign)``;

export const ProductDescriptionTextArea = styled(TextAreaDesign)``;

export const OptionInputArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const OptionInput = styled(InputDesign)``;

export const OptionDeleteButton = styled(ButtonDesign)`
  background-color: #e01040;
`;

export const OptionAddButton = styled(ButtonDesign)``;

export const PriceAddInput = styled(InputDesign)`
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const ProductCountInput = styled(InputDesign)`
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const StyledCalendarArea = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: start;
`;

export const StyledCalendar = styled(Calendar)``;

export const Body = styled.div`
  margin-bottom: 10px;
`;

export const ContentAddButton = styled(ButtonDesign)``;

export const IntroContentArea = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  @media (max-width: 1180px) {
    flex-direction: column;
  }
`;

export const ImageArea = styled.div`
  position: relative;
  width: 70%;
  min-height: 300px;
  background-color: #eee;
  border-radius: 12px;
  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export const DescriptionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

export const AddLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-image: url(${AddButtonIcon});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const AddInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const TextArea = styled.div``;

export const DescriptionText = styled(TextAreaDesign)`
  width: 30%;
  height: 300px;
  @media (max-width: 1180px) {
    width: 100%;
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  @media (min-width: 1180px) {
  }
`;
