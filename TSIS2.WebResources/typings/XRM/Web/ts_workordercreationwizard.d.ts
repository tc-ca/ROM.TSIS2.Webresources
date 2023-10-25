interface ts_workordercreationwizard_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_workordercreationwizard_statecode | null;
  statuscode?: ts_workordercreationwizard_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_workordercreationwizardid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_workordercreationwizard_Relationships {
  ts_CaseId?: Incident_Result | null;
  ts_FunctionalLocationId?: msdyn_FunctionalLocation_Result | null;
  ts_OperationId?: msdyn_customerasset_Result | null;
  ts_SiteId?: msdyn_FunctionalLocation_Result | null;
  ts_StakeholderId?: Account_Result | null;
  ts_ts_workordercreationwizard_msdyn_workorde?: msdyn_workorder_Result[] | null;
}
interface ts_workordercreationwizard extends ts_workordercreationwizard_Base, ts_workordercreationwizard_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_CaseId_bind$incidents?: string | null;
  ts_CountryId_bind$tc_countries?: string | null;
  ts_FunctionalLocationId_bind$msdyn_functionallocations?: string | null;
  ts_OperationId_bind$msdyn_customerassets?: string | null;
  ts_RegionId_bind$territories?: string | null;
  ts_SiteId_bind$msdyn_functionallocations?: string | null;
  ts_StakeholderId_bind$accounts?: string | null;
  ts_WorkOrderTypeId_bind$msdyn_workordertypes?: string | null;
  ts_ovs_operationtype_bind$ovs_operationtypes?: string | null;
}
interface ts_workordercreationwizard_Create extends ts_workordercreationwizard {
}
interface ts_workordercreationwizard_Update extends ts_workordercreationwizard {
}
interface ts_workordercreationwizard_Select {
  createdby_guid: WebAttribute<ts_workordercreationwizard_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_workordercreationwizard_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_workordercreationwizard_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_workordercreationwizard_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_workordercreationwizard_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_workordercreationwizard_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_workordercreationwizard_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_workordercreationwizard_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_workordercreationwizard_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_workordercreationwizard_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_workordercreationwizard_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_workordercreationwizard_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_workordercreationwizard_Select, { statecode: ts_workordercreationwizard_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_workordercreationwizard_Select, { statuscode: ts_workordercreationwizard_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_workordercreationwizard_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_caseid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_caseid_guid: string | null }, { ts_caseid_formatted?: string }>;
  ts_countryid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_countryid_guid: string | null }, { ts_countryid_formatted?: string }>;
  ts_functionallocationid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_functionallocationid_guid: string | null }, { ts_functionallocationid_formatted?: string }>;
  ts_name: WebAttribute<ts_workordercreationwizard_Select, { ts_name: string | null }, {  }>;
  ts_operationid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_operationid_guid: string | null }, { ts_operationid_formatted?: string }>;
  ts_ovs_operationtype_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_ovs_operationtype_guid: string | null }, { ts_ovs_operationtype_formatted?: string }>;
  ts_regionid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_regionid_guid: string | null }, { ts_regionid_formatted?: string }>;
  ts_siteid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_siteid_guid: string | null }, { ts_siteid_formatted?: string }>;
  ts_stakeholderid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_stakeholderid_guid: string | null }, { ts_stakeholderid_formatted?: string }>;
  ts_workordercreationwizardid: WebAttribute<ts_workordercreationwizard_Select, { ts_workordercreationwizardid: string | null }, {  }>;
  ts_workordertypeid_guid: WebAttribute<ts_workordercreationwizard_Select, { ts_workordertypeid_guid: string | null }, { ts_workordertypeid_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_workordercreationwizard_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_workordercreationwizard_Select, { versionnumber: number | null }, {  }>;
}
interface ts_workordercreationwizard_Filter {
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
  statecode: ts_workordercreationwizard_statecode;
  statuscode: ts_workordercreationwizard_statuscode;
  timezoneruleversionnumber: number;
  ts_caseid_guid: XQW.Guid;
  ts_countryid_guid: XQW.Guid;
  ts_functionallocationid_guid: XQW.Guid;
  ts_name: string;
  ts_operationid_guid: XQW.Guid;
  ts_ovs_operationtype_guid: XQW.Guid;
  ts_regionid_guid: XQW.Guid;
  ts_siteid_guid: XQW.Guid;
  ts_stakeholderid_guid: XQW.Guid;
  ts_workordercreationwizardid: XQW.Guid;
  ts_workordertypeid_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_workordercreationwizard_Expand {
  createdby: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_workordercreationwizard_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_workordercreationwizard_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_CaseId: WebExpand<ts_workordercreationwizard_Expand, Incident_Select, Incident_Filter, { ts_CaseId: Incident_Result }>;
  ts_FunctionalLocationId: WebExpand<ts_workordercreationwizard_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_FunctionalLocationId: msdyn_FunctionalLocation_Result }>;
  ts_OperationId: WebExpand<ts_workordercreationwizard_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { ts_OperationId: msdyn_customerasset_Result }>;
  ts_SiteId: WebExpand<ts_workordercreationwizard_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_SiteId: msdyn_FunctionalLocation_Result }>;
  ts_StakeholderId: WebExpand<ts_workordercreationwizard_Expand, Account_Select, Account_Filter, { ts_StakeholderId: Account_Result }>;
  ts_ts_workordercreationwizard_msdyn_workorde: WebExpand<ts_workordercreationwizard_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_ts_workordercreationwizard_msdyn_workorde: msdyn_workorder_Result[] }>;
}
interface ts_workordercreationwizard_FormattedResult {
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
  ts_caseid_formatted?: string;
  ts_countryid_formatted?: string;
  ts_functionallocationid_formatted?: string;
  ts_operationid_formatted?: string;
  ts_ovs_operationtype_formatted?: string;
  ts_regionid_formatted?: string;
  ts_siteid_formatted?: string;
  ts_stakeholderid_formatted?: string;
  ts_workordertypeid_formatted?: string;
}
interface ts_workordercreationwizard_Result extends ts_workordercreationwizard_Base, ts_workordercreationwizard_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_caseid_guid: string | null;
  ts_countryid_guid: string | null;
  ts_functionallocationid_guid: string | null;
  ts_operationid_guid: string | null;
  ts_ovs_operationtype_guid: string | null;
  ts_regionid_guid: string | null;
  ts_siteid_guid: string | null;
  ts_stakeholderid_guid: string | null;
  ts_workordertypeid_guid: string | null;
}
interface ts_workordercreationwizard_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_CaseId: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_FunctionalLocationId: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_OperationId: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  ts_SiteId: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_StakeholderId: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_workordercreationwizard_RelatedMany {
  ts_ts_workordercreationwizard_msdyn_workorde: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_workordercreationwizards: WebMappingRetrieve<ts_workordercreationwizard_Select,ts_workordercreationwizard_Expand,ts_workordercreationwizard_Filter,ts_workordercreationwizard_Fixed,ts_workordercreationwizard_Result,ts_workordercreationwizard_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_workordercreationwizards: WebMappingRelated<ts_workordercreationwizard_RelatedOne,ts_workordercreationwizard_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_workordercreationwizards: WebMappingCUDA<ts_workordercreationwizard_Create,ts_workordercreationwizard_Update,ts_workordercreationwizard_Select>;
}
