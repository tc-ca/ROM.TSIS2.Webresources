// Type declarations for Common.js global functions and constants

declare const TEAM_SCHEMA_NAMES: {
    AVIATION_SECURITY_DOMESTIC: string;
    AVIATION_SECURITY_INTERNATIONAL: string;
    ISSO_TEAM: string;
    RAIL_SAFETY: string;
    ROM_RAIL_SAFETY_ADMINISTRATOR: string;
};

declare const BU_SCHEMA_NAMES: {
    AVIATION_SECURITY_DOMESTIC: string;
    AVIATION_SECURITY_INTERNATIONAL: string;
    ISSO: string;
    TRANSPORT_CANADA: string;
};

declare const DEV_SPECIFIC_IDS: {
    AVSEC_TEAM_DEV: string;
    AVSEC_BU_DEV: string;
    ISSO_TEAM_DEV: string;
};

declare function userHasRole(rolesName: string): boolean;
declare function lockFields(executionContext: Xrm.ExecutionContext<any, any>, fields: string[]): void;
declare function lockFieldsInspectorHoursEditableGrid(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function lockFieldsDutyInspectorsEditableGrid(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function showButtonBasedOnPlanStatus(primaryControl: Xrm.FormContext): boolean;
declare function isFormTypeCreate(): boolean;
declare function isFormTypeUpdate(): boolean;
declare function openLookupModalDialogWOForm(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function openLookupModalDialogCaseForm(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function openLookupModalDialogFindingForm(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function openLookupModalDialogEmailForm(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function openLookupModalDialogSecurityIncidentForm(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function onLookupClick(executionContext: Xrm.ExecutionContext<any, any>): void;
declare function setOwnerToUserBusinessUnit(formContext: Xrm.FormContext): void;
declare function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext: Xrm.FormContext): Promise<boolean>;
declare function isUserInTeam(userId: string, teamId: string): Promise<boolean>;
declare function isUserInTeamByEnvVar(teamSchemaName: string): Promise<boolean>;
declare function getEnvironmentVariableValue(schemaName: string): Promise<string | null>;
declare function getOwnerIdFromRecord(record: any): string | null;
declare function isOwnedBy(ownerValue: any, schemaNames: string[]): Promise<boolean>;
declare function isOwnedByAvSec(ownerValue: any): Promise<boolean>;
declare function isOwnedByISSO(ownerValue: any): Promise<boolean>;
declare function isBusinessUnit(buId: string, schemaNames: string[]): Promise<boolean>;
declare function isAvSecBU(buId: string): Promise<boolean>;
declare function isISSOBU(buId: string): Promise<boolean>;
declare function isTCBU(buId: string): Promise<boolean>;
declare function getAvSecBUGUIDs(): Promise<string[]>;
declare function getISSOBUGUIDs(): Promise<string[]>;
declare function isUserInAvSecBU(userBuId: string): Promise<boolean>;
declare function isUserInISSOBU(userBuId: string): Promise<boolean>;
declare function isUserInTCBU(userBuId: string): Promise<boolean>;
declare function isUserInAvSecTeam(userId?: string): Promise<boolean>;
declare function isUserInISSOTeam(userId?: string): Promise<boolean>;
declare function getAvSecBUName(): Promise<string>;
declare function getISSOBUName(): Promise<string>;
declare function toggleDocumentCenter(executionContext: Xrm.ExecutionContext<any, any>, tabName: string, sectionName: string): Promise<void>;
declare function getTeamNameById(teamId: string): Promise<string | null>;
declare function setOwnerToTeamAndSave(formContext: any, teamSchemaName: string): Promise<void>;
declare function applyTabVisibilityForTeam(formContext: any, teamSchemaName: string, visibleTabs: string[]): Promise<void>;
