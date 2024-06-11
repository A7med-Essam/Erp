import { IRequestStatus } from "../store/appStore";

// ============ DRIVERS =============
export interface IDriverResponse extends IRequestStatus {
  data: IDriver[];
}
export interface IDriver {
    id:         number;
    driverID:   number;
    driverName: string;
    branchName: string;
    branchID:   number;
    phone1:     string;
    phone2:     string;
    phone3:     string;
    adress:     string;
    notes:      string;
    active:     boolean;
    userName:   string;
}

export interface IDriverRequest {
  id?:         number;
  driverName: string;
  branchid:   number;
  phone1:     string;
  phone2:     string;
  phone3:     string;
  adress:     string;
  notes:      string;
  active:     boolean;
}

// ============ Governorates =============

export interface IGovernorateResponse extends IRequestStatus {
  data: IGovernorate[];
}
export interface IGovernorate {
    id:              number;
    governorateID:   number;
    governorateName: string;
}

export interface IGovernorateRequest {
  ID:         number;
  Name:       string;
}

// ============ Areas =============

export interface IAreaResponse extends IRequestStatus {
  data: IArea[];
}
export interface IArea {
    id:            number;
    area_id:       number;
    name:          string;
    city:          string;
    cityID:        number;
    governorate:   string;
    governorateID: number;
    branch:        string;
    branchID:      number;
    driver:        string;
    driverID:      number;
}
export interface IAreaRequest {
  id?:            number;
  name:          string;
  cityID:        number;
  governorateID: number;
  branchID:      number;
  driverID:      number;
}

// ============ Cities =============

export interface ICityResponse extends IRequestStatus {
  data: ICity[];
}
export interface ICity {
  id:        number;
  cityID:    number;
  cityName:  string;
  goverID:   number;
  goverName: string;
}

export interface ICityRequest {
  id?:      number;
  name:    string;
  goverID: number;
}