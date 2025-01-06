import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ExpandableNavLink({
  children,
  name,
  isOpen,
  path,
  setSelectedNavLink,
}: ExpandableNavLinkProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    setSelectedNavLink(name);
  };

  const handleNavigation = () => {
    if (isOpen) {
      handleClick();
    } else {
      navigate(path);
    }
  };

  return (
    <a
      onClick={handleNavigation}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-main stroke-neutral-100 text-neutral-100 hover:text-main place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      <div
        className={`${!isOpen ? " tooltip tooltip-right mr-4" : ""}`}
        data-tip={name}
      >
        {children}
      </div>
      <div className="flex overflow-hidden place-items-center justify-between w-full">
        <p className="text-inherit truncate whitespace-nowrap tracking-wide">
          {name}
        </p>
        <ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
      </div>
    </a>
  );
}

export default ExpandableNavLink;
