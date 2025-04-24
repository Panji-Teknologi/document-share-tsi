import { ForwardRefExoticComponent, RefAttributes } from "react"

export type ColorType = "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
export type SizeType = "small" | "medium" | "large"
export type MediaQueryType = "xs" | "sm" | "md" | "lg" | "xl"
export type VariantType = "contained" | "light" | "shadow" | "outlined" | "dashed" | "text" | "rounded" | "default"
export type LoadingPositionType = "center" | "start" | "end"
export type PositionType = 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom' | 'top-left'
export type PositioningType = 'fixed' | 'static' | 'sticky'
export type TransitionType = 'grow' | 'collapse' | 'fade' | 'slide' | 'zoom'
export type DirectionType = 'up' | 'down' | 'right' | 'left'
export type TypeType = 'circular' | 'rounded' | 'square' | string
export type ListItemProps = { component: ForwardRefExoticComponent<Omit<any, "ref"> & RefAttributes<unknown>> | string, href?: any, target?: string; }

// EXTRA
export type RoleType = "auditor" | "surveyor" | "client" | string;
export type UserType = {
  email: string | null;
  hashedPassword: string | null
  id: string
  name: string | null
  roleId: string;
  emailVerified: Date | null;
  role?: {
    id: string;
    name: string;
    code: string;
  };
  folders?: FolderType[]
  projects?: ProjectType[]
}

export interface FileWithPreview extends File {
  preview?: string;
  path?: string;
  lastModifiedDate?: string;
}

export type FolderType = {
  id: string;
  createdAt: Date;
  name: string | null;
  isRoot: boolean;
  userId?: string;
  user?: UserType;
  startDate: Date;
  endDate: Date;
  documents?: DocumentType[];
  project?: ProjectType;
};

export type DocumentType = {
  id: string;
  createdAt: Date;
  url: string;
  folderId: string;
  folder?: FolderType;
  userId?: string;
  user?: UserType;
}

export type ProjectType = {
  id: string;
  folderId: string;
  auditors?: UserType[]
}