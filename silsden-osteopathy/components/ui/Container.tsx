import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  narrow?: boolean;
  className?: string;
};

export default function Container({
  children,
  as: Tag = "div",
  narrow = false,
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-6 md:px-10 lg:px-12 ${
        narrow ? "max-w-(--container-narrow)" : "max-w-(--container-content)"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
