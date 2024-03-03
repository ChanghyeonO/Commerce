import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

const ProductDetailComponent = () => {
  const [item, setItem] = useState<Item>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    item?.option[0] || "옵션을 선택해주세요",
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getCollectionName = () => {
    if (location.pathname.includes("funding")) {
      return "fundingItems";
    } else {
      return "otherItems";
    }
  };

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
      } else if (newCount > (item?.count || 1)) {
        newCount = item?.count || 1;
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

      const existingItemIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.id === newItem.id && cartItem.option === newItem.option,
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...currentCart[existingItemIndex],
          count: currentCart[existingItemIndex].count + newItem.count,
          totalPrice:
            currentCart[existingItemIndex].totalPrice + newItem.totalPrice,
        };
        currentCart[existingItemIndex] = updatedItem;
      } else {
        currentCart.push(newItem);
      }

      sessionStorage.setItem(cartKey, JSON.stringify(currentCart));

      if (navigateToCart) {
        navigate("/mypage/cart");
      } else {
        Swal.fire({
          ...alertList.doubleCheckMessage("장바구니에 추가되었습니다."),
          title: `${item.name}가 장바구니에 추가되었습니다.`,
          confirmButtonText: "장바구니 이동",
          cancelButtonText: "쇼핑 계속하기",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/mypage/cart");
          }
        });
      }
    }
  };

  const addToCartHandler = () => {
    addToCart(false);
  };

  const purchaseHandler = () => {
    addToCart(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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
          <IntroProductCountArea>
            <IntroProductCount>재고 수량</IntroProductCount>
            <IntroProductCount>{item?.count} 개</IntroProductCount>
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
                setItemCount((prev) => Math.min(prev + 1, item?.count || 1))
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
