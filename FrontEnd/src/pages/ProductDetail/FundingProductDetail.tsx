import Header from "../../components/Header/Header";
import MainDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import Footer from "../../components/Footer/Footer";

const FundingProductDetail = () => {
  return (
    <>
      <Header />
      <MainDetailComponent pageType="funding" />
      <Footer />
    </>
  );
};

export default FundingProductDetail;
