import React, { useState, useEffect, ChangeEvent } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";
import { storage, db } from "../../api/firebase";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
import alertList from "../../utils/Swal";
import Loading from "../Loading/Loading";

import {
  Container,
  ContentArea,
  CloseButtonArea,
  CloseButton,
  ImageUploadArea,
  ImageContainer,
  UploadedImage,
  AddLabel,
  AddInput,
  DeleteButton,
  ImageUploadButton,
} from "./ImageUploadStyle";

interface Props {
  onClose: () => void;
}

const ImageUpload = ({ onClose }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resizeImage = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        2560, // 최대 너비를 더 크게 설정
        1440, // 최대 높이를 더 크게 설정
        "WEBP", // 파일 포맷
        80, // 품질
        0, // 회전
        (uri) => {
          resolve(uri);
        },
        "file", // 출력 타입
      );
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImage(newFiles[0]);
      setPreviewImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);

    if (previewImages.length === 0) {
      setIsLoading(false);
      Swal.fire(alertList.infoMessage("업로드할 이미지를 추가해주세요."));
      return;
    }

    const uploadPromises = previewImages.map(async (file) => {
      try {
        const resizedImage = await resizeImage(file);
        if (!(resizedImage instanceof Blob)) {
          throw new Error("Resizing failed");
        }

        const imageRef = ref(storage, `images/${file.name}_${Date.now()}`);
        const snapshot = await uploadBytes(imageRef, resizedImage);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const mainDocRef = doc(db, "slideImages", "main");
        await updateDoc(mainDocRef, { images: arrayUnion(downloadURL) });

        return downloadURL;
      } catch (error) {
        console.error("Upload error", error);
        throw new Error("Image upload failed");
      }
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        setUploadedImages((prev) => [...prev, ...urls]);
        setPreviewImages([]);
        Swal.fire(
          alertList.successMessage(
            "모든 이미지가 성공적으로 업로드되었습니다.",
          ),
        );
      })
      .catch(() => {
        Swal.fire(alertList.errorMessage("일부 이미지 업로드에 실패했습니다."));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (urlToDelete: string) => {
    setIsLoading(true);
    const mainDocRef = doc(db, "slideImages", "main");
    try {
      await updateDoc(mainDocRef, { images: arrayRemove(urlToDelete) });
      setUploadedImages(uploadedImages.filter((url) => url !== urlToDelete));
      const imageRef = ref(storage, urlToDelete);
      await deleteObject(imageRef);
      setIsLoading(false);
      Swal.fire(alertList.successMessage("이미지 삭제에 성공했습니다."));
    } catch (error) {
      setIsLoading(false);
      Swal.fire(alertList.errorMessage("이미지 삭제에 실패했습니다."));
    }
  };

  const handleDeletePreview = (indexToDelete: number) => {
    setPreviewImages(
      previewImages.filter((_, index) => index !== indexToDelete),
    );
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = collection(db, "slideImages");
      const snapshot = await getDocs(imagesRef);
      const imagesList: string[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.images) {
          imagesList.push(...data.images);
        }
      });
      setUploadedImages(imagesList);
    };

    fetchImages();
  }, []);
  return (
    <Container>
      <ContentArea>
        <ImageUploadArea>
          {uploadedImages.map((url, index) => (
            <ImageContainer key={index}>
              <UploadedImage src={url} alt={`Uploaded ${index}`} />
              <DeleteButton onClick={() => handleDelete(url)} />
            </ImageContainer>
          ))}

          {previewImages.map((file, index) => (
            <ImageContainer key={index}>
              <UploadedImage
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
              />
              <DeleteButton onClick={() => handleDeletePreview(index)} />
            </ImageContainer>
          ))}
        </ImageUploadArea>

        {uploadedImages.length + previewImages.length < 5 && (
          <>
            <AddLabel htmlFor="file-upload" />
            <AddInput
              id="file-upload"
              type="file"
              multiple
              onChange={handleChange}
            />
          </>
        )}
        <CloseButtonArea>
          <ImageUploadButton onClick={handleUpload}>업로드</ImageUploadButton>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </CloseButtonArea>
      </ContentArea>
      {isLoading && <Loading />}
    </Container>
  );
};

export default ImageUpload;
