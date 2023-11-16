import React from "react";
import {
  AiOutlineLinkedin,
  AiFillGithub,
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="py-5 mt-3  bg-amber-50 flex flex-wrap justify-center items-center gap-2 md:gap-10  absolute right-0 left-0 ">
      <p>info@partyshope.com </p>
      <p className="flex gap-3">
        <a href="https://www.linkedin.com/in/sandhya-rajwanshi-a75b331b4/">
          {" "}
          <AiOutlineLinkedin className="text-2xl text-gray-800" />
        </a>
        <a href="https://twitter.com/SandhyaR1007">
          <AiOutlineTwitter className="text-2xl text-gray-800" />
        </a>
        <a href="https://www.facebook.com/your-facebook-page-url">
          <AiFillFacebook className="text-2xl text-gray-800" />
        </a>
        <a href="https://www.instagram.com/your-instagram-account">
          <AiFillInstagram className="text-2xl text-gray-800" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
