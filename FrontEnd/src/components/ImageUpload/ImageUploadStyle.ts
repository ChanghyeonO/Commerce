import styled from "styled-components";
import AddButtonIcon from "../../assets/icons/add-button.png";
import DeleteButtonIcon from "../../assets/icons/delete-button.png";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.5);
  z-index: 3;
`;

export const ContentArea = styled.div`
  width: 50%;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  @media (max-width: 1180px) {
    width: 80%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const CloseButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  gap: 10px;
`;

export const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 550px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: auto;
`;
export const AddLabel = styled.label`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-image: url(${AddButtonIcon});
  background-size: cover;
  display: inline-block;
`;

export const AddInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-image: url(${DeleteButtonIcon});
  background-size: cover;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
`;

const ButtonDesign = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: #eee;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
`;

export const ImageUploadButton = styled(ButtonDesign)`
  background-color: #5271ff;
`;

export const CloseButton = styled(ButtonDesign)`
  background-color: #e01040;
`;
