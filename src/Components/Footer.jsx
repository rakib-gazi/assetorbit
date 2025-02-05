import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import logo from "../assets/logo.png";
const FooterComponent = () => {
  return (
    <div>
      <div className="bg-nav">
        <div className="w-11/12 mx-auto py-8 px-4">
          <div className="flex justify-center items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-auto h-32" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white mt-12">
            <div className="">
              <h1 className="text-2xl font-bold">Company</h1>
              <ul className="py-4 flex flex-col gap-2">
                <Link>About Us</Link>
                <Link>Our Mission</Link>
                <Link>Careers</Link>
                <Link>Blog</Link>
                <Link>Contact Us</Link>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-bold"> Resources</h1>
              <ul className="py-4 flex flex-col gap-2">
                <Link>Help Center</Link>
                <Link>FAQs</Link>
                <Link>Terms of Service</Link>
                <Link>Privacy Policy</Link>
                <Link>Pricing</Link>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-bold"> Connect with Us</h1>
              <ul className="py-4 flex flex-col gap-2 ">
                <Link className="flex gap-2 items-center">
                  <MdOutlineEmail className="text-xl" /> info@assetorbit.com
                </Link>
                <Link className="flex gap-2 items-center">
                  <FaPhoneSquareAlt className="text-xl" /> +8801876987622
                </Link>
                <Link className="flex gap-2 items-center">
                  <FaGlobe className="text-xl" /> assetorbit.com
                </Link>
                <div className="flex items-center gap-4 py-4">
                  <a href="https://www.facebook.com/bd.gazi97/" target="_blank">
                    <FaFacebook className="text-3xl " />
                  </a>
                  <a href="https://www.facebook.com/bd.gazi97/" target="_blank">
                    <FaWhatsapp className="text-3xl " />
                  </a>
                  <a href="https://www.facebook.com/bd.gazi97/" target="_blank">
                    <FaGithub className="text-3xl " />
                  </a>
                  <a href="https://www.facebook.com/bd.gazi97/" target="_blank">
                    <CiLinkedin className="text-3xl " />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-btn">
        <div className="w-11/12 mx-auto py-6">
          <div className="flex justify-center items-center">
            <p className="font-bold text-black">
              @ 2025 Asset Orbit. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
