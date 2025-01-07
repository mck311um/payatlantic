import React from "react";
import { useNavigate } from "react-router-dom";

interface ManagementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const ManagementCard = ({
  title,
  description,
  icon,
  path,
}: ManagementCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <a
      onClick={handleClick}
      className="block p-6 bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-50 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default ManagementCard;
