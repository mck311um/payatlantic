import {
  Briefcase,
  Building2,
  Calendar,
  CalendarMinus,
  CircleMinus,
  DollarSign,
  Gift,
  Landmark,
  MapPin,
  UserCog,
  UserPlus,
} from "lucide-react";
import PageLayout from "../../components/PageLayout";
import ManagementCard from "../../components/ManagementCard";

const AdminPage = () => {
  return (
    <PageLayout>
      <h1 className="text-header text-center">Administration</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adminCards
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((card, i) => (
            <ManagementCard
              key={i}
              title={card.title}
              description={card.description}
              icon={card.icon}
              path={card.path}
            />
          ))}
      </div>
    </PageLayout>
  );
};

export default AdminPage;

const adminCards = [
  {
    title: "Departments",
    description: "Manage department structure and hierarchies",
    icon: <Building2 className="w-6 h-6 text-main" />,
    path: "departments",
  },
  {
    title: "Positions",
    description: "Define and manage job positions",
    icon: <Briefcase className="w-6 h-6 text-main" />,
    path: "/positions",
  },
  {
    title: "Locations",
    description: "Manage office locations and facilities",
    icon: <MapPin className="w-6 h-6 text-main" />,
    path: "/locations",
  },
  {
    title: "Holidays",
    description: "Manage public holidays",
    icon: <Calendar className="w-6 h-6 text-main" />,
    path: "/holidays",
  },
  {
    title: "Users",
    description: "Create, update, and delete user accounts",
    icon: <UserPlus className="w-6 h-6 text-main" />,
    path: "/users",
  },
  {
    title: "Roles",
    description: "Assign roles and permissions to users",
    icon: <UserCog className="w-6 h-6 text-main" />,
    path: "/roles",
  },
  {
    title: "Leave Types",
    description: "Define and manage leave types (e.g., sick, vacation)",
    icon: <CalendarMinus className="w-6 h-6 text-main" />,
    path: "/leave-types",
  },
  {
    title: "Attendance Statues",
    description: "Define and manage attendance statues (e.g., present, absent)",
    icon: <Calendar className="w-6 h-6 text-main" />,
    path: "/attendance-statues",
  },
  {
    title: "Allowances",
    description: "Define and manage allowances (e.g., vacation, sick days)",
    icon: <Gift className="w-6 h-6 text-main" />,
    path: "/allowances",
  },
  {
    title: "Deductions",
    description: "Define and manage deductions (e.g., taxes, insurance)",
    icon: <CircleMinus className="w-6 h-6 text-main" />,
    path: "/deductions",
  },
  {
    title: "Financial Institutions",
    description: "Manage financial institutions and accounts",
    icon: <Landmark className="w-6 h-6 text-main" />,
    path: "/financial-institutions",
  },
];
