// Type declarations for Common.js global functions and constants

declare const TEAM_SCHEMA_NAMES: {
    [key: string]: string;
};

declare const BU_SCHEMA_NAMES: {
    [key: string]: string;
};

declare function userHasRole(rolesName: string): boolean;
declare function setOwnerToUserBusinessUnit(formContext: Xrm.FormContext): void;
declare function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext: Xrm.FormContext): Promise<boolean>;
declare function isUserInTeam(userId: string, teamId: string): Promise<boolean>;
declare function isUserInTeamByEnvVar(teamSchemaName: string): Promise<boolean>;
declare function getEnvironmentVariableValue(schemaName: string): Promise<string | null>;
declare function getOwnerIdFromRecord(record: any): string | null;
declare function isOwnedBy(ownerValue: any, schemaNames: string[]): Promise<boolean>;
declare function isOwnedByAvSec(ownerValue: any): Promise<boolean>;
declare function isOwnedByAvSecDomestic(ownerValue: any): Promise<boolean>;
declare function isOwnedByAvSecInternational(ownerValue: any): Promise<boolean>;
declare function isOwnedByISSO(ownerValue: any): Promise<boolean>;
declare function isOwnedByRailSafety(ownerValue: any): Promise<boolean>;
declare function isOwnedByRailSafetyAdministrator(ownerValue: any): Promise<boolean>;
declare function isAvSecBU(buId: string): Promise<boolean>;
declare function isISSOBU(buId: string): Promise<boolean>;
declare function isTCBU(buId: string): Promise<boolean>;
declare function isUserInTCBU(userBuId: string): Promise<boolean>;
declare function getAvSecBUGUIDs(): Promise<string[]>;
declare function getISSOBUGUIDs(): Promise<string[]>;
declare function getTeamNameById(teamId: string): Promise<string | null>;
declare function applyTabVisibilityForTeam(formContext: any, teamSchemaName: string, visibleTabs: string[]): Promise<void>;
declare function assignRailSafetyOwnershipOnSave(formContext: any): Promise<boolean>;
declare function logRailSafetyOwnershipStatus(formContext: any): Promise<void>;
