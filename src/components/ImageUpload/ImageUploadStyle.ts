import styled from "styled-components";
import AddButtonIcon from "../../assets/icons/add-button.png";
import DeleteButtonIcon from "../../assets/icons/delete-button.png";

export const Container = styled.div`
  position: fixed;
  width: 1000px;
  height: 700px;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 2px solid #999;
  gap: 10px;
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
  width: 900px;
  height: 550px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 900px;
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
