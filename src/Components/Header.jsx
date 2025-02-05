import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navbar, Avatar } from "flowbite-react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import defaultAvatar from "../assets/nav-avatar.jpg";
const Header = () => {
  const { user, setUser, LogOutUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isSticky, setIsSticky] = useState(false);
  const userEmail = user?.email;
  const { data: registeredUser = [] } = useQuery({
    queryKey: ["registeredUser"],
    queryFn: async () => {
      if (!userEmail) return null;
      const response = await axiosPublic.get(`/users/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  const regEmployee = registeredUser?.role === "employee";
  const regUser = registeredUser?.role === "user";
  const regHr = registeredUser?.role === "hr";
  const isHrPaymentPending = registeredUser.paymentStatus === "pending";
  const isHrPaymentPaid = registeredUser.paymentStatus === "paid";
  const pendingHr = regHr && isHrPaymentPending;
  const paidHr = regHr && isHrPaymentPaid;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        setUser(null);
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        Swal.fire({
          position: "center",
          icon: "error",
          title: { errorCode },
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const links = [
    !user || pendingHr || (!regEmployee && !regUser && !paidHr) ? (
      <NavLink to="/" key="home" className="text-white hover:text-gray-300">
        Home
      </NavLink>
    ) : null,
    !user || pendingHr || (!regEmployee && !regUser && !paidHr) ? (
      <NavLink
        to="/join-as-employee"
        key="join-as-employee"
        className="text-white hover:text-gray-300"
      >
        Join as Employee
      </NavLink>
    ) : null,
    !user || pendingHr || (!regEmployee && !regUser && !paidHr) ? (
      <NavLink
        to="/join-as-hr-manager"
        key="join-as-hr-manager"
        className="text-white hover:text-gray-300"
      >
        Join as HR Manager
      </NavLink>
    ) : null,

    (regEmployee || regUser) && (
      <NavLink
        to="/employee"
        key="employee-home"
        className="text-white hover:text-gray-300"
      >
        Home
      </NavLink>
    ),
    (regEmployee || regUser) && (
      <NavLink
        to="/employee/my-assets"
        key="employee-my-assets"
        className="text-white hover:text-gray-300"
      >
        My Assets
      </NavLink>
    ),
    (regEmployee || regUser) && (
      <NavLink
        to="/employee/my-team"
        key="employee-my-team"
        className="text-white hover:text-gray-300"
      >
        My Team
      </NavLink>
    ),
    (regEmployee || regUser) && (
      <NavLink
        to="/employee/request-asset"
        key="employee-request-asset"
        className="text-white hover:text-gray-300"
      >
        Request for an Asset
      </NavLink>
    ),
    (regEmployee || regUser) && (
      <NavLink
        to="/employee/profile"
        key="employee-profile"
        className="text-white hover:text-gray-300"
      >
        Profile
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr"
        key="hr-home"
        className="text-white hover:text-gray-300"
      >
        Home
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/asset-list"
        key="hr-asset-list"
        className="text-white hover:text-gray-300"
      >
        Asset List
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/add-asset"
        key="hr-add-asset"
        className="text-white hover:text-gray-300"
      >
        Add an Asset
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/all-requests"
        key="hr-all-requests"
        className="text-white hover:text-gray-300"
      >
        All Requests
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/employee-list"
        key="hr-employee-list"
        className="text-white hover:text-gray-300"
      >
        My Employee List
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/add-employee"
        key="hr-add-employee"
        className="text-white hover:text-gray-300"
      >
        Add an Employee
      </NavLink>
    ),
    user && paidHr && (
      <NavLink
        to="/hr/hr-profile"
        key="hr-profile"
        className="text-white hover:text-gray-300"
      >
        Profile
      </NavLink>
    ),
  ];

  return (
    <>
      {user && registeredUser ? (
        <div
          className={`bg-btn w-full ${isSticky ? "fixed top-0 z-50 shadow-md" : ""
            }`}
        >
          <div className="bg-btn w-11/12 mx-auto">
            <p className="text-center text-black font-semibold text-xs md:text-base py-1">
              {registeredUser?.fullName ? `Welcome Back, ${registeredUser?.fullName}` : null}
            </p>
          </div>
        </div>
      ) : null}
      <div
        className={`bg-nav w-full ${isSticky ? "fixed top-6 z-40 shadow-md" : ""
          }`}
      >
        <Navbar fluid rounded className="bg-nav w-11/12 mx-auto">
          <Link
            to={
              user
                ? paidHr
                  ? "/hr"
                  : pendingHr
                    ? "/"
                    : regEmployee || regUser
                      ? "/employee"
                      : "/"
                : "/"
            }
          >
            <div>
              <img
                src={logo}
                className="mr-3 h-10 md:h-16"
                alt="Asset Orbit Logo"
              />
            </div>
          </Link>

          <div className="flex md:order-2 gap-2  items-center">
            {user && (
              <Avatar
                img={
                  registeredUser?.photo ? registeredUser?.photo : defaultAvatar
                }
                rounded
                bordered
              />
            )}

            {user && (regEmployee || regUser || paidHr || pendingHr) ? (
              <button
                onClick={handleLogOut}
                className="text-black bg-btn px-3 md:px-6 py-0.5 md:py-2 text-sm md:text-base font-bold rounded-md"
              >
                logout
              </button>
            ) : (
              <div>
                <NavLink
                  to={`/login`}
                  className="text-black bg-btn px-3 md:px-6 py-2 text-sm md:text-base font-bold rounded-md"
                >
                  Login
                </NavLink>
              </div>
            )}

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {links
              .filter((link) => {
                if (!link) return false;
                if (
                  !user ||
                  pendingHr ||
                  (!regEmployee && !regUser && !paidHr)
                ) {
                  return (
                    link.key === "home" ||
                    link.key === "join-as-employee" ||
                    link.key === "join-as-hr-manager"
                  );
                }
                if ((regEmployee || regUser) && link.key?.includes("employee"))
                  return true;
                if (paidHr && link.key?.includes("hr")) return true;

                return false;
              })
              .map((link, index) => (
                <li key={index}>{link}</li>
              ))}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
