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

interface AdminData {
  departments: Department[];
}

interface Department {
  departmentId: string;
  department: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
  headCount: number;
  departmentHead: string;
}

interface ManageItemModalProp {
  onClose: () => void;
  itemToEdit?: any;
  itemToDelete?: any;
  lowercaseTitle: string;
  title: string;
}

interface FormSelectProps {
  value: string;
  data: any;
  handleInputChange: (name: string) => (e: any) => void;
  label: string;
  labelField: string;
  name: string;
  placeholder: string;
  valueField: string;
  required: boolean;
  isValid: boolean;
}

interface FormMultiSelectProps {
  value: string[];
  data: any;
  handleInputChange: (name: string) => (e: any) => void;
  label: string;
  labelField: string;
  name: string;
  placeholder: string;
  valueField: string;
  required: boolean;
  isValid: boolean;
}

interface FormInputProps {
  handleInputChange: (name: string) => (e: any) => void;
  label: string;
  name: string;
  readOnly: boolean;
  type: string;
  value: string;
  required: boolean;
  isValid: boolean;
}

interface FormCheckboxProps {
  handleInputChange: (name: string) => (e: any) => void;
  checked: boolean;
  label: string;
  name: string;
}

interface FormTextAreaProps {
  value: string;
  handleInputChange: (name: string) => (e: any) => void;
  label: string;
  name: string;
  required: boolean;
  isValid: boolean;
  readOnly: boolean;
  rows: number;
}
