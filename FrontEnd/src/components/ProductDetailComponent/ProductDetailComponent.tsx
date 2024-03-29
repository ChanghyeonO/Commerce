import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import alertList from "../../utils/Swal";
import ImageSlider from "../ImageSlider/ImageSlider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { Item, CartItem } from "../../types/ItemType";

import {
  Container,
  TopContent,
  LeftContent,
  RightContent,
  DescriptionArea,
  Title,
  Description,
  OptionArea,
  DropdownContainer,
  DropdownSelected,
  DropdownOptions,
  DropdownOption,
  IntroDeadLineArea,
  IntroDeadLine,
  FundingGaugeContainer,
  FundingGaugeFiller,
  FundingGaugePercentage,
  IntroProductCountArea,
  IntroProductCount,
  ProductCountArea,
  MinusButton,
  CountInput,
  PlusButton,
  TotalPriceArea,
  TotalPrice,
  CheckoutButtonArea,
  ShoppingBasketButton,
  PurchaseButton,
  BottomContent,
  ProductIntroArea,
  ProductImage,
  ProductDescription,
} from "./ProductDetailComponentStyle";
import { ProductComponentProps } from "../../types/PagePropsType";

const ProductDetailComponent = ({ pageType }: ProductComponentProps) => {
  const [item, setItem] = useState<Item>();
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    item?.option[0] || "옵션을 선택해주세요",
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const getCollectionName = () => {
    if (pageType == "funding") {
      return "fundingItems";
    } else {
      return "otherItems";
    }
  };

  const isFundingPage = pageType === "funding";

  useEffect(() => {
    if (item && item.deadLine) {
      const now = new Date();
      const deadlineDate = item.deadLine.toDate();
      setIsDeadlinePassed(now > deadlineDate);
    }
  }, [item]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const collectionName = getCollectionName();
      if (typeof id === "string") {
        try {
          const itemDoc = doc(db, collectionName, id);
          const itemSnapshot = await getDoc(itemDoc);
          if (itemSnapshot.exists()) {
            const itemData = itemSnapshot.data();
            const itemWithId = {
              ...itemData,
              id: itemSnapshot.id,
            };
            setItem(itemWithId as Item);
          } else {
            console.log("제품 정보를 불러오지 못했습니다");
          }
        } catch (error) {
          console.error("제품 정보를 불러오는 중 오류가 발생했습니다", error);
        }
      }
    };

    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    if (item) {
      setTotalPrice(item.price * itemCount);
    }
  }, [item, itemCount]);

  const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCount = parseInt(e.target.value);
    if (!isNaN(newCount)) {
      if (newCount < 1) {
        newCount = 1;
      } else if (newCount > (item?.productCount || 1)) {
        newCount = item?.productCount || 1;
      }
      setItemCount(newCount);
    }
  };

  const getCartKey = () => {
    return location.pathname.includes("funding")
      ? "fundingItemsCart"
      : "otherItemsCart";
  };

  const addToCart = (navigateToCart: boolean) => {
    if (selectedOption === "옵션을 선택해주세요") {
      Swal.fire(alertList.infoMessage("옵션을 선택해주세요."));
      return;
    }
    if (item) {
      const newItem = {
        id: item.id,
        name: item.name,
        option: selectedOption,
        price: item.price,
        image: item.itemDescription[0].imageUrl,
        description: item.description,
        count: itemCount,
        totalPrice: item.price * itemCount,
      };

      const cartKey = getCartKey();
      const currentCart: CartItem[] = JSON.parse(
        sessionStorage.getItem(cartKey) || "[]",
      );

      if (cartKey === "fundingItemsCart") {
        if (currentCart.length > 0) {
          Swal.fire(
            alertList.doubleCheckTitkeMsg(
              "기존 펀딩 제품을 변경하시겠습니까?",
              "펀딩 제품은 장바구니에 하나만 추가가 가능합니다.",
            ),
          ).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.setItem(cartKey, JSON.stringify([newItem]));
              afterCartUpdated(navigateToCart);
            }
          });
        } else {
          sessionStorage.setItem(cartKey, JSON.stringify([newItem]));
          afterCartUpdated(navigateToCart);
        }
      } else {
        const existingItemIndex = currentCart.findIndex(
          (cartItem) =>
            cartItem.id === newItem.id && cartItem.option === newItem.option,
        );

        if (existingItemIndex !== -1) {
          currentCart[existingItemIndex] = {
            ...currentCart[existingItemIndex],
            count: currentCart[existingItemIndex].count + newItem.count,
            totalPrice:
              currentCart[existingItemIndex].totalPrice + newItem.totalPrice,
          };
        } else {
          currentCart.push(newItem);
        }
        sessionStorage.setItem(cartKey, JSON.stringify(currentCart));
        afterCartUpdated(navigateToCart);
      }
    }
  };

  function afterCartUpdated(navigateToCart: boolean) {
    window.dispatchEvent(new Event("sessionStorageChanged"));

    if (navigateToCart) {
      navigate("/mypage/cart");
    } else {
      Swal.fire({
        ...alertList.doubleCheckMessage("장바구니에 추가되었습니다."),
        title: `${item?.name}가 장바구니에 추가되었습니다.`,
        confirmButtonText: "장바구니 이동",
        cancelButtonText: "쇼핑 계속하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/mypage/cart");
        }
      });
    }
  }

  const addToCartHandler = () => {
    if (isDeadlinePassed) {
      Swal.fire(alertList.infoMessage("펀딩 마감일이 지났습니다."));
    } else {
      addToCart(false);
    }
  };

  const purchaseHandler = () => {
    if (isDeadlinePassed) {
      Swal.fire(alertList.infoMessage("펀딩 마감일이 지났습니다."));
    } else {
      addToCart(true);
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const fundingProgress =
    item && item.targetSales > 0
      ? (item.salesCount / item.targetSales) * 100
      : 0;

  return (
    <Container>
      <TopContent>
        <LeftContent>
          <ImageSlider
            images={item?.itemDescription.map((desc) => desc.imageUrl)}
          />
        </LeftContent>
        <RightContent>
          <DescriptionArea>
            <Title>{item?.name}</Title>
            <Description>{item?.description}</Description>
          </DescriptionArea>
          <OptionArea>
            <DropdownContainer>
              <DropdownSelected onClick={toggleDropdown}>
                {selectedOption}
              </DropdownSelected>
              {isOpen && (
                <DropdownOptions>
                  {item?.option?.map((option, index) => (
                    <DropdownOption
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </DropdownOption>
                  ))}
                </DropdownOptions>
              )}
            </DropdownContainer>
          </OptionArea>
          {isFundingPage && (
            <>
              <IntroDeadLineArea>
                <IntroDeadLine>
                  펀딩 마감일 :
                  {item?.deadLine?.toDate().toLocaleDateString("ko-KR")}
                </IntroDeadLine>
                <IntroDeadLine>
                  목표 판매량 :{item?.targetSales} 개
                </IntroDeadLine>
              </IntroDeadLineArea>
              <FundingGaugeContainer>
                <FundingGaugeFiller style={{ width: `${fundingProgress}%` }} />
                <FundingGaugePercentage>
                  {fundingProgress.toFixed(2)}%
                </FundingGaugePercentage>
              </FundingGaugeContainer>
            </>
          )}
          <IntroProductCountArea>
            <IntroProductCount>
              재고 수량 :{item?.productCount} 개
            </IntroProductCount>
          </IntroProductCountArea>
          <ProductCountArea>
            <MinusButton
              onClick={() => setItemCount((prev) => Math.max(1, prev - 1))}
            >
              -
            </MinusButton>
            <CountInput
              type="number"
              value={itemCount}
              onChange={handleItemCountChange}
            />
            <PlusButton
              onClick={() =>
                setItemCount((prev) =>
                  Math.min(prev + 1, item?.productCount || 1),
                )
              }
            >
              +
            </PlusButton>
          </ProductCountArea>
          <TotalPriceArea>
            <TotalPrice>{totalPrice.toLocaleString()} 원</TotalPrice>
          </TotalPriceArea>
          <CheckoutButtonArea>
            <ShoppingBasketButton onClick={addToCartHandler}>
              장바구니
            </ShoppingBasketButton>
            <PurchaseButton onClick={purchaseHandler}>구매</PurchaseButton>
          </CheckoutButtonArea>
        </RightContent>
      </TopContent>
      <BottomContent>
        {item?.itemDescription?.map((desc, index) => (
          <ProductIntroArea key={index}>
            <ProductImage src={desc.imageUrl} />
            <ProductDescription>{desc.description}</ProductDescription>
          </ProductIntroArea>
        ))}
      </BottomContent>
    </Container>
  );
};

export default ProductDetailComponent;
