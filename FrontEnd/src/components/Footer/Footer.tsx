import { Link } from "react-router-dom";
import FUNDITLOGO from "../../assets/icons/FUNDITHEADERFOOTER.png";
import InstagramLogo from "../../assets/icons/instagram.png";
import EMailLogo from "../../assets/icons/gmail.png";
import TelephoneLogo from "../../assets/icons/telephone-call.png";

import {
  Container,
  LeftContainer,
  MainLogo,
  RightContainer,
  Contact,
  ContactInfomationText,
  Instagram,
  Email,
  TelephoneNumber,
  CopyRight,
} from "./FooterStyle";

const Footer = () => {
  return (
    <Container>
      <LeftContainer>
        <Link to={"/"}>
          <MainLogo src={FUNDITLOGO} alt="FUNDIT 로고" />
        </Link>
      </LeftContainer>
      <RightContainer>
        <ContactInfomationText>Contact</ContactInfomationText>
        <Contact>
          <a
            href="https://www.instagram.com/5_changhyeon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram src={InstagramLogo} alt="Instagram" />
          </a>
          <a
            href="mailto:ckdgus5189@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Email src={EMailLogo} alt="Email" />
          </a>
          <a
            href="tel:+8210-4402-6623"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelephoneNumber src={TelephoneLogo} alt="Phone" />
          </a>
        </Contact>
        <CopyRight>©2024 FUNIT Company. All right reserved.</CopyRight>
      </RightContainer>
    </Container>
  );
};

export default Footer;
