import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { db, storage } from "../../api/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  DocumentReference,
  Timestamp,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
import alertList from "../../utils/Swal";
import Loading from "../Loading/Loading";
import DefaultButton from "../DefaultButton/DefaultButton";

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
  ProductCountInput,
  StyledCalendarArea,
  StyledCalendar,
  Body,
  ContentAddButton,
  IntroContentArea,
  AddInput,
  AddLabel,
  ImageArea,
  DescriptionImage,
  DescriptionText,
} from "./ProductCreatorComponentStyle";
import { PostData } from "../../types/ItemType";

interface IntroContent {
  id: number;
  value: string;
  imageUrl: string;
  imageFile?: File;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ProductCreatorComponent = () => {
  const queryClient = useQueryClient();
  const [options, setOptions] = useState([{ id: 1, value: "" }]);
  const [introContents, setIntroContents] = useState<IntroContent[]>([
    { id: 1, value: "", imageUrl: "" },
  ]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productCount, setProductCount] = useState("");
  const [targetSalesCount, setTargetSalesCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const getCollectionName = () => {
    if (location.pathname.includes("/funding/create")) {
      return "fundingItems";
    } else if (location.pathname.includes("/other/create")) {
      return "otherItems";
    }
    return "defaultCollection";
  };

  const isFundingCreatePage = location.pathname.includes("/funding/create");

  const addOption = () => {
    if (options.length < 6) {
      const newId = options.length > 0 ? options[options.length - 1].id + 1 : 1;
      setOptions([...options, { id: newId, value: "" }]);
    }
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  const handleChange = (id: number, value: string) => {
    const newOptions = options.map((option) => {
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
    const contentToRemove = introContents.find((content) => content.id === id);
    if (contentToRemove && contentToRemove.imageUrl) {
      const imagePath = extractStoragePathFromUrl(contentToRemove.imageUrl);
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef).catch((error) =>
        console.error("Failed to delete image from storage:", error),
      );
    }

    const newIntroContents = introContents.filter(
      (content) => content.id !== id,
    );
    setIntroContents(newIntroContents);
  };

  const handleIntroContentChange = (id: number, value: string) => {
    const newIntroContents = introContents.map((content) => {
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

    const newIntroContents = introContents.map((content) => {
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

  const addToExpiredFundingItems = async (
    postData: PostData,
    expiredPostRef: DocumentReference,
  ) => {
    try {
      await setDoc(expiredPostRef, {
        name: postData.name,
        salesCount: postData.salesCount,
        targetSales: postData.targetSales || null,
        deadLine: postData.deadLine || null,
        emailSendCheck: postData.emailSendCheck || null,
      });

      console.log("expiredFundingItems에 항목 추가 성공");
    } catch (error) {
      console.error("expiredFundingItems에 항목 추가 실패:", error);
    }
  };

  const resizeImage = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1980, // 최대 너비를 더 크게 설정
        1080, // 최대 높이를 더 크게 설정
        "WEBP", // 파일 포맷
        80, // 품질
        0, // 회전
        (uri) => {
          resolve(uri);
        },
        "file", // 출력 타입
      );
    });

  const uploadPostWithImages = async () => {
    setIsLoading(true);

    if (
      !productName ||
      !productDescription ||
      !price ||
      introContents.some((content) => !content.value)
    ) {
      setIsLoading(false);
      Swal.fire(alertList.infoMessage("모든 내용을 입력해주세요"));
      return;
    } else if (parseInt(productCount) <= 0 || !parseInt(productCount)) {
      setIsLoading(false);
      Swal.fire(alertList.infoMessage("제품 갯수는 1개 이상이어야 합니다."));
      return;
    }

    const uploads = introContents
      .filter((content) => content.imageFile)
      .map(async (content) => {
        const resizedImageBlob = await resizeImage(content.imageFile as File);
        if (!(resizedImageBlob instanceof Blob)) {
          throw new Error("Resizing failed");
        }
        const imageRef = ref(storage, `images/${content.id}_${Date.now()}`);
        const snapshot = await uploadBytes(imageRef, resizedImageBlob);
        return getDownloadURL(snapshot.ref);
      });

    const selectedDate = Array.isArray(date) ? date[0] : date;
    let firestoreTimestamp = null;
    if (selectedDate) {
      firestoreTimestamp = Timestamp.fromDate(selectedDate);
    }

    try {
      const imageUrls = await Promise.all(uploads);
      const updatedIntroContents = introContents.map((content, index) => ({
        description: content.value,
        imageUrl: content.imageFile ? imageUrls[index] : content.imageUrl,
      }));

      let postData: PostData = {
        name: productName,
        description: productDescription,
        price: Number(price),
        productCount: Number(productCount),
        itemDescription: updatedIntroContents,
        option: options.map((option) => option.value),
        createdAt: serverTimestamp(),
        salesCount: 0,
      };

      if (isFundingCreatePage) {
        postData = {
          ...postData,
          targetSales: Number(targetSalesCount),
          deadLine: firestoreTimestamp,
        };
      }

      const collectionName = getCollectionName();
      const postRef = doc(collection(db, collectionName));
      const docId = postRef.id;
      await setDoc(postRef, postData).then(() => {
        const expiredPostRef = doc(db, "expiredFundingItems", docId);
        addToExpiredFundingItems(postData, expiredPostRef);
      });
      setIsLoading(false);
      Swal.fire(
        alertList.successMessage("제품이 성공적으로 업로드 되었습니다."),
      );

      queryClient.invalidateQueries(["items", collectionName]);
      queryClient.invalidateQueries("items");
      if (collectionName === "fundingItems") {
        navigate("/funding");
      } else if (collectionName === "otherItems") {
        navigate("/other");
      }
    } catch (error) {
      setIsLoading(false);
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
            onChange={(e) => setProductName(e.target.value)}
          />
          <ProductDescriptionTextArea
            placeholder="제품에 대해 간단하게 소개해주세요."
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <IntroText>추가할 옵션을 작성해주세요.</IntroText>
          {options.map((option) => (
            <OptionInputArea key={option.id}>
              <OptionInput
                type="text"
                value={option.value}
                placeholder="추가할 옵션에 대해 작성해주세요."
                onChange={(e) => handleChange(option.id, e.target.value)}
              />
              {options.length > 1 && (
                <OptionDeleteButton onClick={() => removeOption(option.id)}>
                  삭제
                </OptionDeleteButton>
              )}
            </OptionInputArea>
          ))}
          {options.length < 5 && (
            <OptionAddButton onClick={addOption}>추가</OptionAddButton>
          )}

          <PriceAddInput
            type="number"
            placeholder="판매 금액을 작성해주세요. 단위(원)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <ProductCountInput
            type="number"
            placeholder="제품 재고 수량을 입력해주세요."
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
          />

          {isFundingCreatePage && (
            <>
              <IntroText>목표 판매량 및 마감일을 설정해주세요.</IntroText>
              <ProductCountInput
                type="number"
                placeholder="목표 판매 수량을 입력해주세요."
                value={targetSalesCount}
                onChange={(e) => setTargetSalesCount(e.target.value)}
              />
              <StyledCalendarArea>
                <StyledCalendar
                  value={date}
                  onChange={handleDateChange}
                  formatDay={(locale, date) => moment(date).format("D")}
                  formatYear={(locale, date) => moment(date).format("YYYY")}
                  formatMonthYear={(locale, date) =>
                    moment(date).format("YYYY. MM")
                  }
                  calendarType="gregory"
                  showNeighboringMonth={false}
                  next2Label={null}
                  prev2Label={null}
                  minDetail="year"
                  minDate={tomorrow}
                />
              </StyledCalendarArea>
            </>
          )}
        </Header>
        <Body>
          <IntroText>제품에 대한 추가 정보를 작성해주세요.</IntroText>
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
                  onChange={(e) =>
                    e.target.files &&
                    handleImageChange(content.id, e.target.files[0])
                  }
                />
              </ImageArea>
              <DescriptionText
                placeholder="제품에 대해 상세하게 설명해주세요."
                value={content.value}
                onChange={(e) =>
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
          {introContents.length < 5 && (
            <ContentAddButton onClick={addIntroContent}>추가</ContentAddButton>
          )}
        </Body>
        <DefaultButton
          name={"제품 추가하기"}
          onClick={uploadPostWithImages}
          style={{ height: "100px" }}
          buttonStyle={{ height: "50px" }}
        />
      </InnerContent>
      {isLoading && <Loading />}
    </Container>
  );
};

export default ProductCreatorComponent;
