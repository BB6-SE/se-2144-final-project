import React from "react";

interface UserManualCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

const UserManualCard: React.FC<UserManualCardProps> = ({
  image,
  alt,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/50 p-8 rounded-2xl mb-4">
        <img
          src={`${image}`}
          alt={`${alt}`}
          className="w-64 h-64 object-contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-secondaryRegular text-white mb-4 px-20">
          <div className="bg-lime-400">{title}</div>
        </h3>
        <p className="text-xl font-primaryMedium max-w-xs">{description}</p>
      </div>
    </div>
  );
};

export default UserManualCard;