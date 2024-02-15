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
import alertList from "../../utils/Swal";

import {
  Container,
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
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (typeof result === "string") {
          setPreviewImages(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = async () => {
    if (!image) {
      Swal.fire("이미지를 추가해주세요.");
      return;
    }

    const imageRef = ref(storage, `images/${image.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const mainDocRef = doc(db, "slideImages", "main");
      await updateDoc(mainDocRef, { images: arrayUnion(downloadURL) });

      setUploadedImages(prevImages => [...prevImages, downloadURL]);
      setPreviewImages([]);
      Swal.fire(alertList.successMessage("이미지 업로드에 성공했습니다."));
    } catch (error) {
      Swal.fire(alertList.errorMessage("이미지 업로드에 실패했습니다."));
    }
  };

  const handleDelete = async (urlToDelete: string) => {
    const mainDocRef = doc(db, "slideImages", "main");
    try {
      await updateDoc(mainDocRef, { images: arrayRemove(urlToDelete) });
      setUploadedImages(uploadedImages.filter(url => url !== urlToDelete));
      const imageRef = ref(storage, urlToDelete);
      await deleteObject(imageRef);
      Swal.fire(alertList.successMessage("이미지 삭제에 성공했습니다."));
    } catch (error) {
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
      snapshot.forEach(doc => {
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
      <ImageUploadArea>
        {uploadedImages.map((url, index) => (
          <ImageContainer key={index}>
            <UploadedImage src={url} alt={`Uploaded ${index}`} />
            <DeleteButton onClick={() => handleDelete(url)} />
          </ImageContainer>
        ))}

        {previewImages.map((src, index) => (
          <ImageContainer key={index}>
            <UploadedImage src={src} alt={`Preview ${index}`} />
            <DeleteButton onClick={() => handleDeletePreview(index)} />
          </ImageContainer>
        ))}
      </ImageUploadArea>

      <AddLabel htmlFor="file-upload" />
      <AddInput id="file-upload" type="file" onChange={handleChange} />
      <CloseButtonArea>
        <ImageUploadButton onClick={handleUpload}>업로드</ImageUploadButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </CloseButtonArea>
    </Container>
  );
};

export default ImageUpload;
