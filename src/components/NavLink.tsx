import { useNavigate } from "react-router-dom";

function NavLink({ children, name, path, setIsOpen, isOpen }: NavLinkProps) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <a
        onClick={() => {
          navigate(path);
          setIsOpen(false);
        }}
        className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-main stroke-neutral-100 text-neutral-100 hover:text-main place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
      >
        <div
          className={`${!isOpen ? " tooltip tooltip-right mr-4" : ""}`}
          data-tip={name}
        >
          {children}
        </div>

        <p className="text-inherit font-poppins overflow-hidden whitespace-nowrap tracking-wide">
          {name}
        </p>
      </a>
    </div>
  );
}

export default NavLink;
