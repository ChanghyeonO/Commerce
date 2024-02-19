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
  OptionButton,
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
            setItem(itemData as Item);
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
    const newCount = parseInt(e.target.value);
    if (!isNaN(newCount) && newCount > 0) {
      setItemCount(newCount);
    }
  };

  const addToCart = (navigateToCart: boolean) => {
    if (item) {
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.itemDescription[0].imageUrl,
        description: item.description,
        count: itemCount,
        totalPrice: item.price * itemCount,
      };

      const currentCart: CartItem[] = JSON.parse(
        sessionStorage.getItem("cart") || "[]",
      );

      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].count += newItem.count;
        currentCart[existingItemIndex].totalPrice += newItem.totalPrice;
      } else {
        currentCart.push(newItem);
      }

      sessionStorage.setItem("cart", JSON.stringify(currentCart));
      if (navigateToCart) {
        navigate("/cart");
      } else {
        Swal.fire({
          ...alertList.doubleCheckMessage("장바구니에 추가되었습니다."),
          title: `${item.name}가 장바구니에 추가되었습니다.`,
          confirmButtonText: "장바구니 이동",
          cancelButtonText: "쇼핑 계속하기",
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/cart");
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

  return (
    <Container>
      <TopContent>
        <LeftContent>
          <ImageSlider />
        </LeftContent>
        <RightContent>
          <DescriptionArea>
            <Title>{item?.name}</Title>
            <Description>{item?.description}</Description>
          </DescriptionArea>
          <OptionArea>
            <OptionButton>옵션1</OptionButton>
            <OptionButton>옵션2</OptionButton>
            <OptionButton>옵션3</OptionButton>
            <OptionButton>옵션4</OptionButton>
            <OptionButton>옵션5</OptionButton>
            <OptionButton>옵션6</OptionButton>
          </OptionArea>
          <ProductCountArea>
            <MinusButton
              onClick={() => setItemCount(prev => Math.max(1, prev - 1))}
            >
              -
            </MinusButton>
            <CountInput
              type="number"
              value={itemCount}
              onChange={handleItemCountChange}
            />
            <PlusButton onClick={() => setItemCount(prev => prev + 1)}>
              +
            </PlusButton>
          </ProductCountArea>
          <TotalPriceArea>
            <TotalPrice>{totalPrice} 원</TotalPrice>
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
