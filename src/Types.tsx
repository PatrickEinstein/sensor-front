export interface MessageData {
  message: number;
  status: number;
  sensor: string;
  timestamp: Date;
  room: number;
}

export interface IApiData {
  nameOfClient: string;
  sensors: Sensors[];
}
interface Sensors {
  message: number;
  room: string;
  sensor: string;
  status: number;
  timestamp: Date;
}
export type typeUserDetails = {
  token: string;
  canAssignAdmin: boolean;
  canDeleteAdmin: boolean;
  canUpload: boolean;
  role: string;
};