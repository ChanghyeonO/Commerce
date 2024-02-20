import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, storage } from "../../api/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";

import {
  Container,
  InnerContent,
  Title,
  IntroText,
  Header,
  ProductNameInput,
  ProductDescriptionTextArea,
  OptionInputArea,
  OptionInput,
  OptionDeleteButton,
  OptionAddButton,
  PriceAddInput,
  Body,
  ContentAddButton,
  IntroContentArea,
  AddInput,
  AddLabel,
  ImageArea,
  DescriptionImage,
  DescriptionText,
  UploadButtonArea,
  UploadButton,
} from "./ProductCreatorComponentStyle";

interface IntroContent {
  id: number;
  value: string;
  imageUrl: string;
  imageFile?: File;
}

const ProductCreatorComponent = () => {
  const [options, setOptions] = useState([{ id: 1, value: "" }]);
  const [introContents, setIntroContents] = useState<IntroContent[]>([
    { id: 1, value: "", imageUrl: "" },
  ]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const getCollectionName = () => {
    if (location.pathname.includes("/funding/create")) {
      return "fundingItems";
    } else if (location.pathname.includes("/other/create")) {
      return "otherItems";
    }
    return "defaultCollection";
  };

  const addOption = () => {
    if (options.length < 6) {
      const newId = options.length > 0 ? options[options.length - 1].id + 1 : 1;
      setOptions([...options, { id: newId, value: "" }]);
    }
  };

  const removeOption = (id: number) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleChange = (id: number, value: string) => {
    const newOptions = options.map(option => {
      if (option.id === id) {
        return { ...option, value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const addIntroContent = () => {
    if (introContents.length < 5) {
      const newId =
        introContents.length > 0
          ? introContents[introContents.length - 1].id + 1
          : 1;
      setIntroContents([
        ...introContents,
        { id: newId, value: "", imageUrl: "" },
      ]);
    }
  };

  const removeIntroContent = async (id: number) => {
    const contentToRemove = introContents.find(content => content.id === id);
    if (contentToRemove && contentToRemove.imageUrl) {
      const imagePath = extractStoragePathFromUrl(contentToRemove.imageUrl);
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef).catch(error =>
        console.error("Failed to delete image from storage:", error),
      );
    }

    const newIntroContents = introContents.filter(content => content.id !== id);
    setIntroContents(newIntroContents);
  };

  const handleIntroContentChange = (id: number, value: string) => {
    const newIntroContents = introContents.map(content => {
      if (content.id === id) {
        return { ...content, value };
      }
      return content;
    });
    setIntroContents(newIntroContents);
  };

  const extractStoragePathFromUrl = (url: string) => {
    const urlParts = url.split("/o/")[1].split("?")[0];
    return decodeURIComponent(urlParts);
  };

  const handleImageChange = (id: number, file: File) => {
    const previewUrl = URL.createObjectURL(file);

    const newIntroContents = introContents.map(content => {
      if (content.id === id) {
        return {
          ...content,
          imageFile: file,
          imageUrl: previewUrl,
        };
      }
      return content;
    });
    setIntroContents(newIntroContents);
  };

  const uploadPostWithImages = async () => {
    if (
      !productName ||
      !productDescription ||
      !price ||
      introContents.some(content => !content.value)
    ) {
      Swal.fire(alertList.infoMessage("모든 내용을 입력해주세요"));
      return;
    }

    const uploads = introContents
      .filter(content => content.imageFile)
      .map(async content => {
        const imageRef = ref(storage, `images/${content.id}_${Date.now()}`);
        const snapshot = await uploadBytes(imageRef, content.imageFile as File);
        return getDownloadURL(snapshot.ref);
      });

    try {
      const imageUrls = await Promise.all(uploads);
      const updatedIntroContents = introContents.map((content, index) => ({
        description: content.value,
        imageUrl: content.imageFile ? imageUrls[index] : content.imageUrl,
      }));

      const postData = {
        name: productName,
        description: productDescription,
        price: Number(price),
        itemDescription: updatedIntroContents,
        option: options.map(option => option.value),
        createdAt: serverTimestamp(),
      };

      const collectionName = getCollectionName();
      const postRef = doc(collection(db, collectionName));
      await setDoc(postRef, postData);

      Swal.fire(
        alertList.successMessage("제품이 성공적으로 업로드 되었습니다."),
      );
      if (collectionName === "fundingItems") {
        navigate("/funding");
      } else if (collectionName === "otherItems") {
        navigate("/other");
      }
    } catch (error) {
      console.error("게시글 업로드 중 오류 발생:", error);
      Swal.fire(
        alertList.errorMessage("게시글 업로드 중 오류가 발생했습니다."),
      );
    }
  };

  return (
    <Container>
      <InnerContent>
        <Header>
          <Title>제품 정보 작성하기</Title>
          <ProductNameInput
            type="text"
            placeholder="제품명을 입력해주세요."
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
          <ProductDescriptionTextArea
            placeholder="제품에 대해 간단하게 소개해주세요"
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
          />
          <IntroText>추가할 옵션을 작성해주세요</IntroText>
          {options.map(option => (
            <OptionInputArea key={option.id}>
              <OptionInput
                type="text"
                value={option.value}
                placeholder="추가할 옵션에 대해 작성해주세요"
                onChange={e => handleChange(option.id, e.target.value)}
              />
              {options.length > 1 && (
                <OptionDeleteButton onClick={() => removeOption(option.id)}>
                  삭제
                </OptionDeleteButton>
              )}
            </OptionInputArea>
          ))}
          <OptionAddButton onClick={addOption}>추가</OptionAddButton>
          <PriceAddInput
            type="number"
            placeholder="판매 금액을 작성해주세요"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Header>
        <Body>
          <IntroText>제품에 대한 추가 정보를 작성해주세요</IntroText>
          {introContents.map((content, index) => (
            <IntroContentArea key={index}>
              <ImageArea>
                {content.imageUrl && (
                  <DescriptionImage src={content.imageUrl} />
                )}
                <AddLabel htmlFor={`file-upload-${content.id}`} />
                <AddInput
                  id={`file-upload-${content.id}`}
                  multiple
                  onChange={e =>
                    e.target.files &&
                    handleImageChange(content.id, e.target.files[0])
                  }
                />
              </ImageArea>
              <DescriptionText
                placeholder="제품에 대해 상세하게 설명해주세요"
                value={content.value}
                onChange={e =>
                  handleIntroContentChange(content.id, e.target.value)
                }
              />
              {introContents.length > 1 && (
                <OptionDeleteButton
                  onClick={() => removeIntroContent(content.id)}
                >
                  삭제
                </OptionDeleteButton>
              )}
            </IntroContentArea>
          ))}
          <ContentAddButton onClick={addIntroContent}>추가</ContentAddButton>
        </Body>
        <UploadButtonArea>
          <UploadButton onClick={uploadPostWithImages}>
            제품 추가하기
          </UploadButton>
        </UploadButtonArea>
      </InnerContent>
    </Container>
  );
};

export default ProductCreatorComponent;
