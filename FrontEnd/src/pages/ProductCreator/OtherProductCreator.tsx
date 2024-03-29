import Header from "../../components/Header/Header";
import ProductCreatorComponent from "../../components/ProductCreatorComponent/ProductCreatorComponent";
import Footer from "../../components/Footer/Footer";

const OtherProductCreator = () => {
  return (
    <>
      <Header />
      <ProductCreatorComponent pageType="other" />
      <Footer />
    </>
  );
};

export default OtherProductCreator;
