interface msdyn_FunctionalLocation_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_address1?: string | null;
  msdyn_address2?: string | null;
  msdyn_address3?: string | null;
  msdyn_addressname?: string | null;
  msdyn_city?: string | null;
  msdyn_country?: string | null;
  msdyn_functionallocationid?: string | null;
  msdyn_latitude?: number | null;
  msdyn_longitude?: number | null;
  msdyn_name?: string | null;
  msdyn_postalcode?: string | null;
  msdyn_sequence?: number | null;
  msdyn_stateorprovince?: string | null;
  overriddencreatedon?: Date | null;
  statecode?: msdyn_functionallocation_statecode | null;
  statuscode?: msdyn_functionallocation_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_businessunit?: string | null;
  ts_functionallocationnameenglish?: string | null;
  ts_functionallocationnamefrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_FunctionalLocation_Relationships {
  msdyn_FunctionalLocation_ParentFunctional?: msdyn_FunctionalLocation_Result[] | null;
  msdyn_ParentFunctionalLocation?: msdyn_FunctionalLocation_Result | null;
  msdyn_customerasset_FunctionalLocation_ms?: msdyn_customerasset_Result[] | null;
  msdyn_functionallocation_connections1?: Connection_Result[] | null;
  msdyn_functionallocation_connections2?: Connection_Result[] | null;
  msdyn_msdyn_functionallocation_account?: Account_Result[] | null;
  msdyn_msdyn_functionallocation_incident_FunctionalLocation?: Incident_Result[] | null;
  msdyn_msdyn_functionallocation_msdyn_workorder_FunctionalLocation?: msdyn_workorder_Result[] | null;
  ts_msdyn_workorder_Site_msdyn_FunctionalLoca?: msdyn_workorder_Result[] | null;
}
interface msdyn_FunctionalLocation extends msdyn_FunctionalLocation_Base, msdyn_FunctionalLocation_Relationships {
  msdyn_ParentFunctionalLocation_bind$msdyn_functionallocations?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Country_bind$tc_countries?: string | null;
  ts_Region_bind$territories?: string | null;
  ts_SiteType_bind$ovs_sitetypes?: string | null;
}
interface msdyn_FunctionalLocation_Create extends msdyn_FunctionalLocation {
}
interface msdyn_FunctionalLocation_Update extends msdyn_FunctionalLocation {
}
interface msdyn_FunctionalLocation_Select {
  createdby_guid: WebAttribute<msdyn_FunctionalLocation_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_FunctionalLocation_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_FunctionalLocation_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_FunctionalLocation_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_FunctionalLocation_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_FunctionalLocation_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_FunctionalLocation_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_address1: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_address1: string | null }, {  }>;
  msdyn_address2: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_address2: string | null }, {  }>;
  msdyn_address3: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_address3: string | null }, {  }>;
  msdyn_addressname: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_addressname: string | null }, {  }>;
  msdyn_city: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_city: string | null }, {  }>;
  msdyn_country: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_country: string | null }, {  }>;
  msdyn_functionallocationid: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_functionallocationid: string | null }, {  }>;
  msdyn_latitude: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_latitude: number | null }, {  }>;
  msdyn_longitude: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_longitude: number | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_name: string | null }, {  }>;
  msdyn_parentfunctionallocation_guid: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_parentfunctionallocation_guid: string | null }, { msdyn_parentfunctionallocation_formatted?: string }>;
  msdyn_postalcode: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_postalcode: string | null }, {  }>;
  msdyn_sequence: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_sequence: number | null }, {  }>;
  msdyn_stateorprovince: WebAttribute<msdyn_FunctionalLocation_Select, { msdyn_stateorprovince: string | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_FunctionalLocation_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_FunctionalLocation_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_FunctionalLocation_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_FunctionalLocation_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_FunctionalLocation_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_FunctionalLocation_Select, { statecode: msdyn_functionallocation_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_FunctionalLocation_Select, { statuscode: msdyn_functionallocation_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_FunctionalLocation_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_businessunit: WebAttribute<msdyn_FunctionalLocation_Select, { ts_businessunit: string | null }, {  }>;
  ts_country_guid: WebAttribute<msdyn_FunctionalLocation_Select, { ts_country_guid: string | null }, { ts_country_formatted?: string }>;
  ts_functionallocationnameenglish: WebAttribute<msdyn_FunctionalLocation_Select, { ts_functionallocationnameenglish: string | null }, {  }>;
  ts_functionallocationnamefrench: WebAttribute<msdyn_FunctionalLocation_Select, { ts_functionallocationnamefrench: string | null }, {  }>;
  ts_region_guid: WebAttribute<msdyn_FunctionalLocation_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_sitetype_guid: WebAttribute<msdyn_FunctionalLocation_Select, { ts_sitetype_guid: string | null }, { ts_sitetype_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<msdyn_FunctionalLocation_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_FunctionalLocation_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_FunctionalLocation_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_address1: string;
  msdyn_address2: string;
  msdyn_address3: string;
  msdyn_addressname: string;
  msdyn_city: string;
  msdyn_country: string;
  msdyn_functionallocationid: XQW.Guid;
  msdyn_latitude: number;
  msdyn_longitude: number;
  msdyn_name: string;
  msdyn_parentfunctionallocation_guid: XQW.Guid;
  msdyn_postalcode: string;
  msdyn_sequence: number;
  msdyn_stateorprovince: string;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_functionallocation_statecode;
  statuscode: msdyn_functionallocation_statuscode;
  timezoneruleversionnumber: number;
  ts_businessunit: string;
  ts_country_guid: XQW.Guid;
  ts_functionallocationnameenglish: string;
  ts_functionallocationnamefrench: string;
  ts_region_guid: XQW.Guid;
  ts_sitetype_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_FunctionalLocation_Expand {
  createdby: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_FunctionalLocation_ParentFunctional: WebExpand<msdyn_FunctionalLocation_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { msdyn_FunctionalLocation_ParentFunctional: msdyn_FunctionalLocation_Result[] }>;
  msdyn_ParentFunctionalLocation: WebExpand<msdyn_FunctionalLocation_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { msdyn_ParentFunctionalLocation: msdyn_FunctionalLocation_Result }>;
  msdyn_customerasset_FunctionalLocation_ms: WebExpand<msdyn_FunctionalLocation_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_customerasset_FunctionalLocation_ms: msdyn_customerasset_Result[] }>;
  msdyn_functionallocation_connections1: WebExpand<msdyn_FunctionalLocation_Expand, Connection_Select, Connection_Filter, { msdyn_functionallocation_connections1: Connection_Result[] }>;
  msdyn_functionallocation_connections2: WebExpand<msdyn_FunctionalLocation_Expand, Connection_Select, Connection_Filter, { msdyn_functionallocation_connections2: Connection_Result[] }>;
  msdyn_msdyn_functionallocation_account: WebExpand<msdyn_FunctionalLocation_Expand, Account_Select, Account_Filter, { msdyn_msdyn_functionallocation_account: Account_Result[] }>;
  msdyn_msdyn_functionallocation_incident_FunctionalLocation: WebExpand<msdyn_FunctionalLocation_Expand, Incident_Select, Incident_Filter, { msdyn_msdyn_functionallocation_incident_FunctionalLocation: Incident_Result[] }>;
  msdyn_msdyn_functionallocation_msdyn_workorder_FunctionalLocation: WebExpand<msdyn_FunctionalLocation_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_msdyn_functionallocation_msdyn_workorder_FunctionalLocation: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<msdyn_FunctionalLocation_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_msdyn_workorder_Site_msdyn_FunctionalLoca: WebExpand<msdyn_FunctionalLocation_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_Site_msdyn_FunctionalLoca: msdyn_workorder_Result[] }>;
}
interface msdyn_FunctionalLocation_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_parentfunctionallocation_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_country_formatted?: string;
  ts_region_formatted?: string;
  ts_sitetype_formatted?: string;
}
interface msdyn_FunctionalLocation_Result extends msdyn_FunctionalLocation_Base, msdyn_FunctionalLocation_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_parentfunctionallocation_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_country_guid: string | null;
  ts_region_guid: string | null;
  ts_sitetype_guid: string | null;
}
interface msdyn_FunctionalLocation_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_ParentFunctionalLocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_FunctionalLocation_RelatedMany {
  msdyn_FunctionalLocation_ParentFunctional: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  msdyn_customerasset_FunctionalLocation_ms: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  msdyn_functionallocation_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_functionallocation_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_msdyn_functionallocation_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  msdyn_msdyn_functionallocation_incident_FunctionalLocation: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  msdyn_msdyn_functionallocation_msdyn_workorder_FunctionalLocation: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_msdyn_workorder_Site_msdyn_FunctionalLoca: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_functionallocations: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_functionallocations: WebMappingRelated<msdyn_FunctionalLocation_RelatedOne,msdyn_FunctionalLocation_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_functionallocations: WebMappingCUDA<msdyn_FunctionalLocation_Create,msdyn_FunctionalLocation_Update,msdyn_FunctionalLocation_Select>;
}
