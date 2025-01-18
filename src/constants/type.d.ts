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
  positions: Position[];
  branches: Branch[];
  countries: Country[];
  villages: Village[];
  employees: Employee[];
}

interface Department {
  departmentId: string;
  department: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  modifiedBy: string;
  headCount: number;
  departmentHead: string;
  description: string;
}

interface Position {
  positionId: string;
  position: string;
  isActive: boolean;
  department: string;
  departmentId: string;
  headCount: number;
  createdAt?: string;
  updatedAt?: string;
  modifiedBy: string;
  description: string;
}

interface Branch {
  branchId: string;
  branch: string;
  isActive: boolean;
  isMain: boolean;
  address: Address;
  isDeleted?: boolean;
  modifiedBy: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface Benefit {
  benefitId: string;
  benefit: string;
  description: string;
  unit: string;
  isDeleted?: boolean;
  modifiedBy: string;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

interface Country {
  countryId: string;
  country: string;
  countryCode: string;
}

interface Village {
  villageId: string;
  village: string;
  countryCode: string;
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
  placeholder?: string;
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
  placeholder?: string;
}

interface FormAutoCompleteProps {
  value: string;
  handleInputChange: (name: string) => (e: any) => void;
  data: any[];
  valueField: string;
  placeholder: string;
  name: string;
  labelFields: string[];
  required?: boolean;
  isValid?: boolean;
  label: string;
}
