import Header from "../../components/Header/Header";
import FindAccountSuccessComponent from "../../components/FindAccountComponent/FindAccountSuccess";

const FindEmailSuccess = () => {
  return (
    <>
      <Header />
      <FindAccountSuccessComponent pageType="email" />
    </>
  );
};

export default FindEmailSuccess;
