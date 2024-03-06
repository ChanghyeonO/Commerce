import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import ItemInfiniteScroll from "../ItemInfiniteScroll/ItemInfiniteScroll";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useSort } from "../../contexts/SortContext";
import { useUser } from "../../contexts/UserContext";

import {
  Container,
  TopContent,
  BottomContent,
  AddItemButtonArea,
  CenterButtonArea,
  SortDropDownArea,
  AddImageButton,
  AddItemButton,
} from "../MainComponent/MainComponentStyle";
import {
  DropdownContainer,
  DropdownOption,
  DropdownOptions,
  DropdownSelected,
} from "../ProductDetailComponent/ProductDetailComponentStyle";

const ProductComponent = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { sortOption, handleSortChange } = useSort();

  const location = useLocation();
  const { user } = useUser();

  const isAdmin = user?.admin ?? false;

  let linkPath = "/funding/create";

  if (location.pathname.includes("/funding")) {
    linkPath = "/funding/create";
  } else if (location.pathname.includes("/other")) {
    linkPath = "/other/create";
  }

  const handleShowImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    handleSortChange(option);
    setIsOpen(false);
  };

  return (
    <Container>
      <TopContent>
        <ImageSlider />
      </TopContent>
      <BottomContent>
        <CenterButtonArea>
          <SortDropDownArea>
            <DropdownContainer>
              <DropdownSelected onClick={toggleDropdown}>
                {sortOption}
              </DropdownSelected>
              {isOpen && (
                <DropdownOptions>
                  <DropdownOption onClick={() => handleOptionSelect("최신순")}>
                    최신순
                  </DropdownOption>
                  <DropdownOption onClick={() => handleOptionSelect("과거순")}>
                    과거순
                  </DropdownOption>
                  <DropdownOption
                    onClick={() => handleOptionSelect("높은 가격순")}
                  >
                    높은 가격순
                  </DropdownOption>
                  <DropdownOption
                    onClick={() => handleOptionSelect("낮은 가격순")}
                  >
                    낮은 가격순
                  </DropdownOption>
                </DropdownOptions>
              )}
            </DropdownContainer>
          </SortDropDownArea>
          {isAdmin && (
            <AddItemButtonArea>
              <AddImageButton onClick={handleShowImageUpload}>
                슬라이드 사진 수정
              </AddImageButton>
              <Link to={linkPath}>
                <AddItemButton>상품 등록</AddItemButton>
              </Link>
            </AddItemButtonArea>
          )}
        </CenterButtonArea>
        <ItemInfiniteScroll />
      </BottomContent>
      {showImageUpload && (
        <ImageUpload onClose={() => setShowImageUpload(false)} />
      )}
    </Container>
  );
};

export default ProductComponent;
