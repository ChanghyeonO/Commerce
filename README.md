<br />
<br />

<div align="center">
<img width="1000" src="https://firebasestorage.googleapis.com/v0/b/commerce-204d5.appspot.com/o/funditLogo%2FFUNDIT%20LOGO.png?alt=media&token=3031a550-f0d8-4e72-8955-5fe935be4283" alt="FUNDIT LOGO"/>
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

<!-- ## 📌 시연 영상

### [▶️ 시연 영상 바로가기](https://www.youtube.com/watch?v=1TeH3DO5bOA) -->

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

### 유저기능

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

<!-- ## 📌 디렉토리 파일구조 -->

<!-- <details><summary>Backend</summary>

```bash
📦backend

 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣📜imgAPI 2.js
 ┃ ┃ ┣📜imgAPI.js
 ┃ ┃ ┣📜s3 2.js
 ┃ ┃ ┗📜s3.js
 ┃ ┣ 📂controller
 ┃ ┃ ┣📜chat_controller.js
 ┃ ┃ ┣📜comment_controller.js
 ┃ ┃ ┣📜friendChat_controller.js
 ┃ ┃ ┣📜friendMessage_controller.js
 ┃ ┃ ┣📜like_controller.js
 ┃ ┃ ┣📜mainhomeFriends_controller.js
 ┃ ┃ ┣📜mainhomeSecret_controller.js
 ┃ ┃ ┣📜message_controller.js
 ┃ ┃ ┣📜post_controller.js
 ┃ ┃ ┗📜user_controller.js
 ┃ ┣ 📂database/models
 ┃ ┃ ┣📜chat_model.js
 ┃ ┃ ┣📜comment_model.js
 ┃ ┃ ┣📜friendChat_model.js
 ┃ ┃ ┣📜friendMessage_model.js
 ┃ ┃ ┣📜index.js
 ┃ ┃ ┣📜like_model.js
 ┃ ┃ ┣📜mainhomeFriends_model.js
 ┃ ┃ ┣📜mainhomeSecret_model.js
 ┃ ┃ ┣📜message_model.js
 ┃ ┃ ┣📜post_model.js
 ┃ ┃ ┗📜user_model.js
 ┃ ┣ 📂lib
 ┃ ┃ ┣📜constant.js
 ┃ ┃ ┣📜socket.js
 ┃ ┃ ┗📜utils.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣📜adminCheck.js
 ┃ ┃ ┣📜asyncHandler.js
 ┃ ┃ ┣📜index.js
 ┃ ┃ ┣📜login_required.js
 ┃ ┃ ┗📜registerMail.js
 ┃ ┣ 📂routers
 ┃ ┃ ┣📜chat_router.js
 ┃ ┃ ┣📜comment_router.js
 ┃ ┃ ┣📜like_router.js
 ┃ ┃ ┣📜mainhome_router.js
 ┃ ┃ ┣📜message_router.js
 ┃ ┃ ┣📜post_router.js
 ┃ ┃ ┗📜user_router.js
 ┃ ┣ 📂services
 ┃ ┃ ┣📜chat_service.js
 ┃ ┃ ┣📜comment_service.js
 ┃ ┃ ┣📜friendChat_service.js
 ┃ ┃ ┣📜friendMessage_service.js
 ┃ ┃ ┣📜like_service.js
 ┃ ┃ ┣📜mainhomeFriends_service.js
 ┃ ┃ ┣📜mainhomeSecret_service.js
 ┃ ┃ ┣📜message_service.js
 ┃ ┃ ┣📜post_service.js
 ┃ ┃ ┗📜user_service.js
 ┣ 📜.env
 ┣ 📜gitignore
 ┣ 📜package-lock.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
``` -->

<!-- </details>
<details><summary>Frontend</summary>

```bash
📦frontend
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┗ 📂images
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂AdminDetail
 ┃ ┃ ┃ ┣ 📂MemberDetail
 ┃ ┃ ┃ ┃ ┣ 📜MemberDetail.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MemberDetailStyle.ts
 ┃ ┃ ┃ ┗ 📂ReportDetail
 ┃ ┃ ┃ ┃ ┣ 📜ReportDetail.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ReportDetailStyle.ts
 ┃ ┃ ┣ 📂AdminHeader
 ┃ ┃ ┃ ┣ 📜AdminHeader.tsx
 ┃ ┃ ┃ ┗ 📜AdminHeaderStyle.ts
 ┃ ┃ ┣ 📂Buttons
 ┃ ┃ ┃ ┣ 📜DefaultButton.tsx
 ┃ ┃ ┃ ┗ 📜DefaultButtonStyle.ts
 ┃ ┃ ┣ 📂Chat
 ┃ ┃ ┃ ┣ 📜Chat.tsx
 ┃ ┃ ┃ ┣ 📜FriendChat.tsx
 ┃ ┃ ┃ ┗ 📜ChatStyle.ts
 ┃ ┃ ┣ 📂ChatBox
 ┃ ┃ ┃ ┣ 📜ChatBox.tsx
 ┃ ┃ ┃ ┣ 📜FriendChatBox.tsx
 ┃ ┃ ┃ ┗ 📜ChatBoxStyle.ts
 ┃ ┃ ┣ 📂DMList
 ┃ ┃ ┃ ┣ 📜DMList.tsx
 ┃ ┃ ┃ ┣ 📜FriendDMList.tsx
 ┃ ┃ ┃ ┗ 📜DMListStyle.ts
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📜FooterStyle.ts
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📂DetailHeader
 ┃ ┃ ┃ ┃ ┣ 📜DetailHeader.tsx
 ┃ ┃ ┃ ┃ ┗ 📜DeatailHeaderStyle.ts
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜HeaderStyle.ts
 ┃ ┃ ┣ 📂MainHomeContent
 ┃ ┃ ┃ ┣ 📂MainHomeContentDetail
 ┃ ┃ ┃ ┃ ┣ 📜MainHomeContentImage.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MainHomeContentInnerContent.ts
 ┃ ┃ ┃ ┣ 📜MainHomeContent.tsx
 ┃ ┃ ┃ ┗ 📜MainHomeContentStyle.ts
 ┃ ┃ ┣ 📂MainHomeSendBox
 ┃ ┃ ┃ ┣ 📜MainHomeSendBox.tsx
 ┃ ┃ ┃ ┗ 📜MainHomeSendBoxStyle.ts
 ┃ ┃ ┣ 📂MessageBubble
 ┃ ┃ ┃ ┗ 📜MessageBubble.tsx
 ┃ ┃ ┣ 📂ProfileUpdateModal
 ┃ ┃ ┃ ┣ 📜arrow_back_icon.svg
 ┃ ┃ ┃ ┣ 📜media_icon.svg
 ┃ ┃ ┃ ┣ 📜ProfileUpdateModal.tsx
 ┃ ┃ ┃ ┗ 📜ProfileUpdateModalStyle.ts
 ┃ ┃ ┣ 📂SearchBar
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┗ 📜SearchBarStyle.ts
 ┃ ┃ ┣ 📂SearchModal
 ┃ ┃ ┃ ┣ 📜SearchModal.tsx
 ┃ ┃ ┃ ┗ 📜SearchModalStyle.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAutoScroll.ts
 ┃ ┃ ┣ 📜useMainHomePost.ts
 ┃ ┃ ┗ 📜useSocket.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Admin
 ┃ ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┃ ┣ 📜AdminMain.tsx
 ┃ ┃ ┃ ┃ ┗ 📜AdminMainStyle.ts
 ┃ ┃ ┃ ┣ 📂ReportManagement
 ┃ ┃ ┃ ┃ ┣ 📜ReportManagement.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ReportManagementStyle.ts
 ┃ ┃ ┃ ┗ 📂MemberManagement
 ┃ ┃ ┃ ┃ ┣ 📜MemberManagement.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MemberManagementStyle.ts
 ┃ ┃ ┣ 📂Chatting
 ┃ ┃ ┃ ┣ 📜Chatting.tsx
 ┃ ┃ ┃ ┣ 📜FriendChatting.tsx
 ┃ ┃ ┃ ┗ 📜ChattingStyle.ts
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┃ ┗ 📜MainStyle.ts
 ┃ ┃ ┣ 📂MainHome
 ┃ ┃ ┃ ┣ 📜MainHomeFriends.tsx
 ┃ ┃ ┃ ┣ 📜MainHomeSecret.tsx
 ┃ ┃ ┃ ┗ 📜MainHomeStyle.ts
 ┃ ┃ ┣ 📂UserAccount
 ┃ ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Register.tsx
 ┃ ┃ ┃ ┃ ┗ 📜LoginStyle.ts
 ┃ ┃ ┃ ┣ 📂UserEdit
 ┃ ┃ ┃ ┃ ┣ 📜UserEdit.tsx
 ┃ ┃ ┃ ┃ ┗ 📜UserEditStyle.ts
 ┃ ┃ ┃ ┗ 📂UserWithdrawal
 ┃ ┃ ┃ ┃ ┗ 📜UserWithdrawal.tsx
 ┃ ┃ ┗ 📂UserMain
 ┃ ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┃ ┃ ┗ 📜DetailStyle.ts
 ┃ ┃ ┃ ┗ 📂UploadPost
 ┃ ┃ ┃ ┃ ┣ 📜UploadPost.tsx
 ┃ ┃ ┃ ┃ ┗ 📜UploadPostStyle.ts
 ┃ ┃ ┃ ┣ 📜UserMain.tsx
 ┃ ┃ ┃ ┗ 📜UserMainStyle.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜GlobalFont.ts
 ┃ ┃ ┣ 📜GlolbalStyles.ts
 ┃ ┃ ┣ 📜Styled.d.ts
 ┃ ┃ ┗ 📜Theme.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜chatType.ts
 ┃ ┃ ┣ 📜dataType.ts
 ┃ ┃ ┗ 📜postType.ts
 ┃ ┣ 📂utils
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.tsx
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

</details>

<br> -->

## 📌 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```

2. 클론한 디렉토리에서 frontend, backend디렉토리로 들어가 아래 명령어를 통해 각각각 필요한 module 설치

```bash
npm install
```

<!-- 3. backend에서 필요한 `.env` 설정

```bash
PORT=<포트번호>
MONGODB_URI=<몽고db url>
ACCESS_SECRET_KEY=<key>
REFRESH_SECRET_KEY=<key>
S3_ACCESS_KEY=<key>
S3_SECRET_ACCESS_KEY=<key>
S3_REGION=<key>
S3_BUCKET_NAME=<key>
``` -->

4. frontend에서 필요한 `.env` 설정

```bash
REACT_APP_API_URL=<백엔드url>
```

4. express 앱과 react앱을 실행

```bash
npm run start
```

<br>
<br>
