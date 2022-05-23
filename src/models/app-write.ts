export enum Role {
  ALL = 'role:all',
}

export interface BaseModel {
  $id?: string;
  $collection: string;
  $internalId: string;
  $read: Role[];
  $write: Role[];
}

export interface TimeTrace {
  createdAt: string;
  modifiedAt: string;
}

export interface ListResponse<T = any> {
  sum?: number;
  total?: number;
  documents: T[];
}

export enum ImageGravity {
  CENTER = 'center',
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}
