import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import {
  Building2,
  CalendarDays,
  ClipboardPenLine,
  DollarSign,
  FolderOpen,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import ExpandableNavLink from "./ExpandableNavLink";
import ExpandedNavigation from "./ExpandedNavigation";

const navVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const buttonVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNavLink, setSelectedNavLink] = useState<string | null>();

  const navControls = useAnimationControls();
  const buttonControls = useAnimationControls();

  useEffect(() => {
    navControls.start(isOpen ? "open" : "close");
    buttonControls.start(isOpen ? "open" : "close");
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    setSelectedNavLink(null);
  };

  const getSecondaryLinks = (): Link[] => {
    return [];
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={navControls}
        initial="close"
        className="bg-neutral-900 flex flex-col z-50 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
          <button className="p-1 rounded-full flex" onClick={() => toggleNav()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={buttonVariants}
                animate={buttonControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <NavLink
            name={"Dashboard"}
            path={"/app"}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          >
            <LayoutDashboard
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </NavLink>
          <ExpandableNavLink
            name="Employees"
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            path="employees"
          >
            <Users
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <ExpandableNavLink
            name="Recruiting"
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            path="recruiting"
          >
            <ClipboardPenLine
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <ExpandableNavLink
            name="Attendance"
            path="attendance"
            isOpen={isOpen}
            setSelectedNavLink={setSelectedNavLink}
          >
            <CalendarDays
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <ExpandableNavLink
            name="Payroll"
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            path="payroll"
          >
            <DollarSign
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <ExpandableNavLink
            name="Company"
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            path="company"
          >
            <Building2
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <ExpandableNavLink
            name="Administration"
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            path="administration"
          >
            <Wrench
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </ExpandableNavLink>
          <NavLink
            name="Files"
            path="/app"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          >
            <FolderOpen
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </NavLink>
          <NavLink
            name="Settings"
            path="/app"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          >
            <Settings
              size={30}
              className="stroke-inherit stoke-[0.75] min-w-8 w-8"
            />
          </NavLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedNavLink && (
          <ExpandedNavigation
            selectedNavLink={selectedNavLink}
            setSelectedNavLink={setSelectedNavLink}
            isOpen={isOpen}
            links={getSecondaryLinks()}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
