import logo from "../assets/logo.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import katsapp from "../assets/katsapp.svg";

export default function Footer() {
  return (
    <footer className="footer" id="contacts">
      <img className="footer_logo" src={logo} alt="24/7 forecast" height="40" />

      <div className="footer_address">
        <h3 className="footer_title">Address</h3>
        <p className="footer_text">
          Svobody str. 35
          <p />
          Kyiv
          <p />
          Ukraine
        </p>
      </div>

      <div className="footer_contacts">
        <h3 className="footer_title">Contact us</h3>
        <div className="footer_social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img className="footer_icon" src={instagram} alt="Instagram" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img className="footer_icon" src={facebook} alt="Facebook" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
            <img className="footer_icon" src={katsapp} alt="WhatsApp" />
          </a>
        </div>
      </div>
    </footer>
  );
}
