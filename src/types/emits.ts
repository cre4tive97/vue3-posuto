export interface EmitSizeType {
  width: number;
  height: number;
  index: number;
}
export interface EmitPositionType {
  x: number;
  y: number;
  index: number;
}

export interface EmitZIndexType {
  z: number;
  index: number;
}

export type EmitIdType = string;

export interface EmitChangeDraggableStatusType {
  status: boolean;
  index: number;
}

export interface EmitSavePostType {
  index: number;
}

export interface EmitChangeTitle {
  title: string;
  index: number;
}

export interface EmitChangeContents {
  contents: string;
  index: number;
}
