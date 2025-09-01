import React from "react";
import clsx from "clsx";

interface MetaItemProps {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  isBlock?: boolean;
  isBold?: boolean;
}

const MetaItem = ({ label, icon, content, isBlock = false, isBold = false }: MetaItemProps) => {
  return (
    <div className="flex items-start gap-2">
      {!isBlock && icon && <div className="shrink-0">{icon}</div>}

      <div className={clsx("flex", isBlock ? "flex-col gap-1" : "items-center gap-2")}>
        <p className={clsx("flex items-center", isBold && "font-semibold")}>
          {isBlock && icon && <span className="mr-1">{icon}</span>}
          {label}
        </p>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default MetaItem;
