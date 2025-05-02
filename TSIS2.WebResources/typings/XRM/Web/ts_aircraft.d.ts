interface ts_aircraft_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_aircraft_statecode | null;
  statuscode?: ts_aircraft_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_aircraftid?: string | null;
  ts_manufacturer?: ts_aircraftmanufacturer | null;
  ts_mark?: string | null;
  ts_model?: ts_aircraftmodel | null;
  ts_name?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_aircraft_Relationships {
  ts_RegisteredOwner?: Account_Result | null;
  ts_aircraft_workorder_registration?: msdyn_workorder_Result[] | null;
}
interface ts_aircraft extends ts_aircraft_Base, ts_aircraft_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_RegisteredOwner_bind$accounts?: string | null;
}
interface ts_aircraft_Create extends ts_aircraft {
}
interface ts_aircraft_Update extends ts_aircraft {
}
interface ts_aircraft_Select {
  createdby_guid: WebAttribute<ts_aircraft_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_aircraft_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_aircraft_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_aircraft_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_aircraft_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_aircraft_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_aircraft_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_aircraft_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_aircraft_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_aircraft_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_aircraft_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_aircraft_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_aircraft_Select, { statecode: ts_aircraft_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_aircraft_Select, { statuscode: ts_aircraft_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_aircraft_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_aircraftid: WebAttribute<ts_aircraft_Select, { ts_aircraftid: string | null }, {  }>;
  ts_manufacturer: WebAttribute<ts_aircraft_Select, { ts_manufacturer: ts_aircraftmanufacturer | null }, { ts_manufacturer_formatted?: string }>;
  ts_mark: WebAttribute<ts_aircraft_Select, { ts_mark: string | null }, {  }>;
  ts_model: WebAttribute<ts_aircraft_Select, { ts_model: ts_aircraftmodel | null }, { ts_model_formatted?: string }>;
  ts_name: WebAttribute<ts_aircraft_Select, { ts_name: string | null }, {  }>;
  ts_registeredowner_guid: WebAttribute<ts_aircraft_Select, { ts_registeredowner_guid: string | null }, { ts_registeredowner_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_aircraft_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_aircraft_Select, { versionnumber: number | null }, {  }>;
}
interface ts_aircraft_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ts_aircraft_statecode;
  statuscode: ts_aircraft_statuscode;
  timezoneruleversionnumber: number;
  ts_aircraftid: XQW.Guid;
  ts_manufacturer: ts_aircraftmanufacturer;
  ts_mark: string;
  ts_model: ts_aircraftmodel;
  ts_name: string;
  ts_registeredowner_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_aircraft_Expand {
  createdby: WebExpand<ts_aircraft_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_aircraft_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_aircraft_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_aircraft_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_aircraft_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_aircraft_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_aircraft_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_RegisteredOwner: WebExpand<ts_aircraft_Expand, Account_Select, Account_Filter, { ts_RegisteredOwner: Account_Result }>;
  ts_aircraft_workorder_registration: WebExpand<ts_aircraft_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_aircraft_workorder_registration: msdyn_workorder_Result[] }>;
}
interface ts_aircraft_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_manufacturer_formatted?: string;
  ts_model_formatted?: string;
  ts_registeredowner_formatted?: string;
}
interface ts_aircraft_Result extends ts_aircraft_Base, ts_aircraft_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_registeredowner_guid: string | null;
}
interface ts_aircraft_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_RegisteredOwner: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_aircraft_RelatedMany {
  ts_aircraft_workorder_registration: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_aircrafts: WebMappingRetrieve<ts_aircraft_Select,ts_aircraft_Expand,ts_aircraft_Filter,ts_aircraft_Fixed,ts_aircraft_Result,ts_aircraft_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_aircrafts: WebMappingRelated<ts_aircraft_RelatedOne,ts_aircraft_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_aircrafts: WebMappingCUDA<ts_aircraft_Create,ts_aircraft_Update,ts_aircraft_Select>;
}
