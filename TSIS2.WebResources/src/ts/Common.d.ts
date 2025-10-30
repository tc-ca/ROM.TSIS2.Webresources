// Type declarations for Common.js global functions and constants

declare const TEAM_SCHEMA_NAMES: {
    AVIATION_SECURITY_DOMESTIC: string;
    AVIATION_SECURITY_INTERNATIONAL: string;
    ISSO_TEAM: string;
};

declare function userHasRole(rolesName: string): boolean;
declare function isBusinessUnit(buId: string, schemaNames: string[]): Promise<boolean>;
declare function isAvSecBU(buId: string): Promise<boolean>;
declare function isISSOBU(buId: string): Promise<boolean>;
declare function getEnvironmentVariableValue(schemaName: string): Promise<string | null>;
declare function isOwnedByAvSec(ownerValue: any): Promise<boolean>;
declare function isOwnedByISSO(ownerValue: any): Promise<boolean>;
declare function setOwnerToUserBusinessUnit(formContext: any): void;
declare function getAvSecBUGUIDs(): Promise<string[]>;
declare function getISSOBUGUIDs(): Promise<string[]>;

declare const BU_SCHEMA_NAMES: {
    AVIATION_SECURITY_DOMESTIC: string;
    AVIATION_SECURITY_INTERNATIONAL: string;
    AVIATION_SECURITY_DIRECTORATE: string;
    ISSO: string;
};
declare function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext: any): boolean;
declare function getAvSecBUName(): Promise<string>;
declare function getISSOBUName(): Promise<string>;

