/** @format */

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  // {
  //   name: "about",
  //   path: "#about",
  // },
  {
    name: "map",
    path: "/map",
  },
  {
    name: "chat",
    path: "/chat",
  },
];

const Nav = () => {
  const pathname = usePathname();
  console.log("Nav component is rendering with pathname:", pathname);

  const handleSmoothScroll = (event, link) => {
    if (link.startsWith("#")) {
      event.preventDefault(); // Prevent default anchor behavior
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
      }
    }
  };

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            onClick={(event) => handleSmoothScroll(event, link.path)} // Add smooth scroll handler
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
