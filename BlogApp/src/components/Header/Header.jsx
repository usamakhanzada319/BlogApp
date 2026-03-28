import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutBtn, Container, Logo } from "../index";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const navigate = useNavigate();

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // active depand on authStatus
    },
    {
      name: "Singup",
      slug: "/singup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flax">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
              {
                //its all upto us k hum ny bydefault width dani h ya yaha over write karni h
              }
            </Link>
          </div>

          <ul className=" flex ml-auto">
            {navItem.map(
              (item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null, // jo html element repete horaha hota h us pr key lagti h loop ki waja sy
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
