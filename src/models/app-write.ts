export enum Role {
  ALL = 'role:all',
}

export interface BaseModel {
  $id: string;
  $collection: string;
  $internalId: string;
  $read: Role[];
  $write: Role[];
}

export interface ListResponse<T = any> {
  sum?: number;
  total?: number;
  documents: T[];
}
