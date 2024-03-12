<br />
<br />

<div align="center">
<img width="500" src="https://firebasestorage.googleapis.com/v0/b/commerce-204d5.appspot.com/o/funditLogo%2FFUNDIT%20LOGO.png?alt=media&token=3031a550-f0d8-4e72-8955-5fe935be4283" alt="FUNDIT LOGO"/>
<br />
<br />
</div>

<br />

## 📌 제품 펀딩 사이트 펀딧🛒

#### 프로젝트 기간 : 2023년 2월 ~ 3월

### [🌎 웹사이트 바로가기](https://web-commerce-qrd2als3zw3jc.sel5.cloudtype.app/)

<br />

## 📌 서비스 소개

좋은 아이디어 혹은 제품이 있지만, 자본금이 부족해 미리 투자 받고 싶은 사람들을 위해 만든 펀딩 사이트입니다.
판매자는 펀딩 시스템을 통한 투자를 바탕으로 제품을 판매하고, 구매자는 기발한 아이디어를 가진 제품을 구매할 수 있습니다.

### 👥 페르소나

👩🏻이현지 (32세)

역할 : 판매자

“좋은 아이디어를 가지고 있지만 자본금이 부족해요.“

판매자 현지님은 좋은 아이디어를 바탕으로 제품을 판매해보고 싶지만, 자본금이 부족해 엄두조차 내지 못하고 있는 상황입니다.

👦🏻오창현 (26세)

역할 : 구매자

“흥미로운 제품을 구경하고 구매하고 싶어요.“

구매자 창현님은 인터넷 쇼핑몰에 판매하지 않는 독특한 제품을 구경하고 구매하고 싶습니다.

<br />

## 📌 시연 영상

### [▶️ 시연 영상 바로가기](https://www.youtube.com/watch?v=1TeH3DO5bOA)

## 📌 기술 스택

| **Language** |

TypeScript

| **Frontend** |

React, StyledComponents, Context API, Tanstack Query

| **Backend** |

Firebase(Auth, DB, Storage, Functions)

| **Release** |

CloudType(AWS S3로 변경 예정)

<br/>

<br>

## 📌 서비스 기능 명세

### 구매자 기능

#### 회원가입

1. 회원가입 약관 동의 여부 확인
2. 이메일 중복 체크 및 유효성 검사 기능
3. 다음 주소지 검색 기능
4. 회원가입시 이메일 유효성 검사 (이메일 확인 후 로그인 가능)

#### 로그인

1. 로그인 및 구글 간편 로그인 기능
2. 로그인 실패 시 FirebaseError를 통해 실패 사유 알림

#### 메인페이지

1. 카테고리 별 제품 최신순 4개씩 확인
2. 더보기 버튼을 통해 카테고리로 이동
3. 품절 처리 된 제품 확인, 펀딩 제품은 펀딩 마감 여부 확인

#### 카테고리 페이지

##### - 펀딩 페이지

1. 무한스크롤로 제품 전체 확인
2. 정렬 기능을 통해 최신순, 과거순, 높은 가격순, 낮은 가격순 확인
3. 품절 처리 된 제품 확인, 펀딩 마감 여부 확인

##### - 기타 페이지

1. 무한스크롤로 제품 전체 확인
2. 정렬 기능을 통해 최신순, 과거순, 높은 가격순, 낮은 가격순 확인
3. 품절 처리 된 제품 확인 가능

#### 제품 상세 페이지

##### - 펀딩 제품 상세 페이지

1. 제품 사진 및 정보 확인
2. 제품 옵션 선택
3. 펀딩 마감일, 펀딩 목표 판매량 확인
4. 현재까지 펀딩 진행 상황 %게이지로 확인
5. 재고 수량 확인
6. 판매 금액 확인
7. 제품 장바구니 저장, 바로 구매

##### - 기타 제품 상세 페이지

1. 제품 사진 및 정보 확인
2. 제품 옵션 선택
3. 재고 수량 확인
4. 판매 금액 확인
5. 제품 장바구니 저장, 바로 구매

#### 마이페이지

##### - 프로필 수정

1. 회원정보 수정 전 재인증 절차
2. 이메일을 제외한 회원정보 수정

##### - 장바구니

1. 장바구니 추가 및 삭제
2. 장바구니 주문 할 제품 갯수 수정하기

##### - 주문내역

1. 제품 주문 내역 확인하기
2. 제품 주문 취소 요청하기 (주문 취소 사유 입력)

##### - 회원탈퇴

1. 회원탈퇴시 약관 확인 후 동의 시 회원탈퇴

#### 제품 주문 페이지

1. 주문할 제품 확인
2. 최종 금액 확인
3. 받는 사람 정보 확인 및 수정
4. 결제하기(포트원으로 결제 서비스 구현)

#### 제품 주문 확인

1. 이메일을 통한 결제 성공 확인
2. 펀딩 날짜 경과 시 이메일로 펀딩 성공 여부 확인

### 판매자 기능

#### 판매자 권한 부여

1. 판매자 권한은 Firestore에서 admin 값 true로 변경 시 부여

#### 베너 슬라이더 이미지 수정

1. 배너 슬라이더 이미지 수정
2. 이미지 수정 시 이미지 미리보기 가능
3. 이미지 추가 삭제 가능

#### 펀딩 상품 등록 및 삭제

1. 제품명 및 간단 설명 입력
2. 옵션 추가하기 최대 5개 입력
3. 판매 금액 지정 및 제품 재고 수량 입력
4. 목표 판매수량 및 마감일은 달력에서 설정
5. 제품 상세 정보 및 이미지 작성란 최대 5개 입력
6. 제품 등록 시 펀딩 기간 이후 제품 삭제 가능

#### 기타 상품 등록 및 삭제

1. 제품명 및 간단 설명 입력
2. 옵션 추가하기 최대 5개 입력
3. 판매 금액 지정 및 제품 재고 수량 입력
4. 제품 상세 정보 및 이미지 작성란 최대 5개 입력
5. 제품 등록 시 제품 삭제 가능

## 📌 디렉토리 파일구조

</details>
<details><summary>Frontend</summary>

```bash
📦FrontEnd
 ┣ 📂public
 ┃ ┗ 📜vite.svg
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┗ 📜firebase.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┗ 📂images
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂CheckoutComponent
 ┃ ┃ ┃ ┣ 📜CheckoutComponent.tsx
 ┃ ┃ ┃ ┗ 📜CheckoutComponentStyle.ts
 ┃ ┃ ┣ 📂CheckPasswordBeforeEdit
 ┃ ┃ ┃ ┣ 📜CheckPasswordBeforeEdit.tsx
 ┃ ┃ ┃ ┗ 📜CheckPasswordBeforeEditStyle.ts
 ┃ ┃ ┣ 📂DefaultButton
 ┃ ┃ ┃ ┣ 📜DefaultButton.tsx
 ┃ ┃ ┃ ┗ 📜DefaultButtonStyle.ts
 ┃ ┃ ┣ 📂DeleteAccountComponent
 ┃ ┃ ┃ ┣ 📜DeleteAccountComponent.tsx
 ┃ ┃ ┃ ┗ 📜DeleteAccountComponentStyle.ts
 ┃ ┃ ┣ 📂EditProfileComponent
 ┃ ┃ ┃ ┣ 📜EditProfileComponent.tsx
 ┃ ┃ ┃ ┗ 📜EditProfileComponentStyle.ts
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📜FooterStyle.ts
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜HeaderStyle.ts
 ┃ ┃ ┣ 📂EditProfileComponent
 ┃ ┃ ┃ ┣ 📜EditProfileComponent.tsx
 ┃ ┃ ┃ ┗ 📜EditProfileComponentStyle.ts
 ┃ ┃ ┣ 📂ImageSlider
 ┃ ┃ ┃ ┣ 📜ImageSlider.tsx
 ┃ ┃ ┃ ┗ 📜ImageSliderStyle.ts
 ┃ ┃ ┣ 📂ImageUpload
 ┃ ┃ ┃ ┣ 📜ImageUpload.tsx
 ┃ ┃ ┃ ┗ 📜ImageUploadStyle.ts
 ┃ ┃ ┣ 📂ItemInfiniteScroll
 ┃ ┃ ┃ ┣ 📜ItemInfiniteScroll.tsx
 ┃ ┃ ┃ ┗ 📜ItemInfiniteScrollStlye.ts
 ┃ ┃ ┣ 📂Loading
 ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┗ 📜LoadingStyle.ts
 ┃ ┃ ┣ 📂LoginComponent
 ┃ ┃ ┃ ┣ 📜LoginComponent.tsx
 ┃ ┃ ┃ ┗ 📜LoginComponentStyle.ts
 ┃ ┃ ┣ 📂MainComponent
 ┃ ┃ ┃ ┣ 📜MainComponent.tsx
 ┃ ┃ ┃ ┗ 📜MainComponentStyle.ts
 ┃ ┃ ┣ 📂MyPageNav
 ┃ ┃ ┃ ┣ 📜MyPageNav.tsx
 ┃ ┃ ┃ ┗ 📜MyPageNavStyle.ts
 ┃ ┃ ┣ 📂OrderHistoryComponent
 ┃ ┃ ┃ ┣ 📜OrderHistoryComponent.tsx
 ┃ ┃ ┃ ┗ 📜OrderHistoryComponentStyle.ts
 ┃ ┃ ┣ 📂ProductComponent
 ┃ ┃ ┃ ┗ 📜ProductComponent.tsx
 ┃ ┃ ┣ 📂ProductCreactorComponent
 ┃ ┃ ┃ ┣ 📜ProductCreatorComponent.tsx
 ┃ ┃ ┃ ┗ 📜ProductCreatorComponentStyle.ts
 ┃ ┃ ┣ 📂ProductDetailComponent
 ┃ ┃ ┃ ┣ 📜ProductDetailComponent.tsx
 ┃ ┃ ┃ ┗ 📜ProductDetailComponentStyle.ts
 ┃ ┃ ┣ 📂RegisterComponent
 ┃ ┃ ┃ ┣ 📂RegisterDetailComponent
 ┃ ┃ ┃ ┃ ┣ 📜RegisterDetailComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RegisterDetailComponentStyle.ts
 ┃ ┃ ┃ ┣ 📂RegisterSuccessComponent
 ┃ ┃ ┃ ┃ ┣ 📜RegisterSuccessComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RegisterSuccessComponentStyle.ts
 ┃ ┃ ┃ ┗ 📂RegisterTermsComponent
 ┃ ┃ ┃   ┣ 📜RegisterTermsComponent.tsx
 ┃ ┃ ┃   ┗ 📜RegisterTermsComponentStyle.ts
 ┃ ┃ ┗ 📂ShoppingBasketComponent
 ┃ ┃    ┣ 📜ShoppingBasketComponent.tsx
 ┃ ┃    ┗ 📜ShoppingBasketComponentStyle.ts
 ┃ ┣ 📂contexts
 ┃ ┃ ┣ 📜SortContext.tsx
 ┃ ┃ ┗ 📜UserContext.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂CheckOut
 ┃ ┃ ┃ ┗ 📜CheckOut.tsx
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┗ 📜Login.tsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┗ 📜Main.tsx
 ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┣ 📜CheckPassword.tsx
 ┃ ┃ ┃ ┣ 📜DeleteAccount.tsx
 ┃ ┃ ┃ ┣ 📜EditProfile.tsx
 ┃ ┃ ┃ ┣ 📜OrderHistory.tsx
 ┃ ┃ ┃ ┗ 📜ShoppingBasket.tsx
 ┃ ┃ ┣ 📂Product
 ┃ ┃ ┃ ┣ 📜FundingProduct.tsx
 ┃ ┃ ┃ ┗ 📜OtherProduct.tsx
 ┃ ┃ ┣ 📂ProductCreator
 ┃ ┃ ┃ ┣ 📜FundingProductCreator.tsx
 ┃ ┃ ┃ ┗ 📜OtherProductCreator.tsx
 ┃ ┃ ┣ 📂ProductDetail
 ┃ ┃ ┃ ┣ 📜FundingProductDetail.tsx
 ┃ ┃ ┃ ┗ 📜OtherProductDetail.tsx
 ┃ ┃ ┗ 📂Register
 ┃ ┃    ┣ 📜RegisterDetail.tsx
 ┃ ┃    ┣ 📜RegisterSuccess.tsx
 ┃ ┃    ┗ 📜RegisterTerms.tsx
 ┃ ┣ 📂router
 ┃ ┃ ┗ 📜routerConfig.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜GlobalFont.ts
 ┃ ┃ ┣ 📜GlobalStyles.ts
 ┃ ┃ ┗ 📜Styled.d.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜ItemType.ts
 ┃ ┃ ┣ 📜PortOneType.ts
 ┃ ┃ ┗ 📜UserDataType.ts
 ┃ ┣ 📂Utils
 ┃ ┃ ┗ 📜Swal.ts
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```

</details>

<br>

## 📌 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```

2. 클론한 디렉토리에서 FrontEnd 디렉토리로 들어가 아래 명령어를 통해 각각각 필요한 module 설치

```bash
npm install
```

3. FrontEnd에서 필요한 `.env` 설정

```bash
VITE_FIREBASE_API_KEY=<>
VITE_FIREBASE_AUTH_DOMAIN=<>
VITE_FIREBASE_PROJECT_ID=<>
VITE_FIREBASE_STORAGE_BUCKET=<>
VITE_FIREBASE_MESSAGING_SENDER_ID=<>
VITE_FIREBASE_APP_ID=<>
VITE_SHOPPINGMALL_ID=<>
```

4. react앱을 실행

```bash
npm run start
```

<br>
<br>
