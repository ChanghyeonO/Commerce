import Header from "../../components/Header/Header";
import ProductCreatorComponent from "../../components/ProductCreatorComponent/ProductCreatorComponent";
import Footer from "../../components/Footer/Footer";

const FundingProductCreator = () => {
  return (
    <>
      <Header />
      <ProductCreatorComponent pageType="funding" />
      <Footer />
    </>
  );
};

export default FundingProductCreator;
