import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

const navVariants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
  },
};

function ExpandedNavigation({
  selectedNavLink,
  links,
  isOpen,
  setIsOpen,
  setSelectedNavLink,
}: ExpandedNavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = links.filter((el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLinks(filtered);
  }, [searchQuery, links]);

  return (
    <motion.nav
      variants={navVariants}
      initial="close"
      animate={isOpen ? "open" : "close"}
      exit="close"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`h-full flex flex-col gap-8 w-[17rem] z-40 absolute bg-neutral-900 ml-0 ${
        isOpen ? "left-64" : "left-20"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <h1 className="tracking-wide text-neutral-100 text-lg">
          {selectedNavLink}
        </h1>
        <button
          onClick={() => {
            setSelectedNavLink(null);
          }}
        >
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="px-3 py-2 tracking-wide rounded-lg bg-neutral-600/40 text-neutral-100"
        onChange={handleSearchChange}
      />
      <div className="flex flex-col gap-3">
        {filteredLinks
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((link) => {
            const path = link.name.toLowerCase().replace(/\s+/g, "");
            return (
              <NavLink
                key={link.name}
                name={link.name}
                path={path}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              >
                {link.icon}
              </NavLink>
            );
          })}
      </div>
    </motion.nav>
  );
}

export default ExpandedNavigation;
