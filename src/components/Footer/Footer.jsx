import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© Amanda Kim</p>
        <p className="footer__year">{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
