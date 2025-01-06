interface AuthContextType {
  user: any;
  dispatch: React.Dispatch<any>;
  isLoading: boolean;
}

interface NavLinkProps {
  children: React.ReactNode;
  name: string;
  path: string;
  setIsOpen: (boolean) => void;
  isOpen: boolean;
}

interface ExpandableNavLinkProps {
  children: React.ReactNode;
  name: string;
  path: string;
  isOpen: boolean;
  setSelectedNavLink: (value: string | null) => void;
}

interface ExpandedNavigationProps {
  selectedNavLink: string;
  links: Link[];
  isOpen: boolean;
  setSelectedNavLink: (value: string | null) => void;
  setIsOpen: (boolean) => void;
}

interface Link {
  name: string;
  selectedNavLink: string;
  icon: ReactElement;
}
