interface ts_EntityRiskFrequency_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_entityriskfrequency_statecode | null;
  statuscode?: ts_entityriskfrequency_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_englishname?: string | null;
  ts_entityriskfrequencyid?: string | null;
  ts_frenchname?: string | null;
  ts_generateduniquekey?: string | null;
  ts_name?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_EntityRiskFrequency_Relationships {
  ts_ActivityType?: msdyn_incidenttype_Result | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
  ts_Operation?: ovs_operation_Result | null;
  ts_OperationType?: ovs_operationtype_Result | null;
  ts_Site?: msdyn_FunctionalLocation_Result | null;
  ts_Stakeholder?: Account_Result | null;
}
interface ts_EntityRiskFrequency extends ts_EntityRiskFrequency_Base, ts_EntityRiskFrequency_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ActivityType_bind$msdyn_incidenttypes?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_OperationType_bind$ovs_operationtypes?: string | null;
  ts_Operation_bind$ovs_operations?: string | null;
  ts_ProgramArea_bind$ts_programareas?: string | null;
  ts_RiskFrequency_bind$ts_riskfrequencies?: string | null;
  ts_Site_bind$msdyn_functionallocations?: string | null;
  ts_Stakeholder_bind$accounts?: string | null;
}
interface ts_EntityRiskFrequency_Create extends ts_EntityRiskFrequency {
}
interface ts_EntityRiskFrequency_Update extends ts_EntityRiskFrequency {
}
interface ts_EntityRiskFrequency_Select {
  createdby_guid: WebAttribute<ts_EntityRiskFrequency_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_EntityRiskFrequency_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_EntityRiskFrequency_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_EntityRiskFrequency_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_EntityRiskFrequency_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_EntityRiskFrequency_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_EntityRiskFrequency_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_EntityRiskFrequency_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_EntityRiskFrequency_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_EntityRiskFrequency_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_EntityRiskFrequency_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_EntityRiskFrequency_Select, { statecode: ts_entityriskfrequency_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_EntityRiskFrequency_Select, { statuscode: ts_entityriskfrequency_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_EntityRiskFrequency_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytype_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_activitytype_guid: string | null }, { ts_activitytype_formatted?: string }>;
  ts_englishname: WebAttribute<ts_EntityRiskFrequency_Select, { ts_englishname: string | null }, {  }>;
  ts_entityriskfrequencyid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_entityriskfrequencyid: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_frenchname: WebAttribute<ts_EntityRiskFrequency_Select, { ts_frenchname: string | null }, {  }>;
  ts_generateduniquekey: WebAttribute<ts_EntityRiskFrequency_Select, { ts_generateduniquekey: string | null }, {  }>;
  ts_name: WebAttribute<ts_EntityRiskFrequency_Select, { ts_name: string | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationtype_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_programarea_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_programarea_guid: string | null }, { ts_programarea_formatted?: string }>;
  ts_riskfrequency_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_riskfrequency_guid: string | null }, { ts_riskfrequency_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_EntityRiskFrequency_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_EntityRiskFrequency_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRiskFrequency_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRiskFrequency_Filter {
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
  statecode: ts_entityriskfrequency_statecode;
  statuscode: ts_entityriskfrequency_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytype_guid: XQW.Guid;
  ts_englishname: string;
  ts_entityriskfrequencyid: XQW.Guid;
  ts_fiscalyear_guid: XQW.Guid;
  ts_frenchname: string;
  ts_generateduniquekey: string;
  ts_name: string;
  ts_operation_guid: XQW.Guid;
  ts_operationtype_guid: XQW.Guid;
  ts_programarea_guid: XQW.Guid;
  ts_riskfrequency_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_EntityRiskFrequency_Expand {
  createdby: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_EntityRiskFrequency_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_EntityRiskFrequency_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActivityType: WebExpand<ts_EntityRiskFrequency_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_ActivityType: msdyn_incidenttype_Result }>;
  ts_FiscalYear: WebExpand<ts_EntityRiskFrequency_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
  ts_Operation: WebExpand<ts_EntityRiskFrequency_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_Operation: ovs_operation_Result }>;
  ts_OperationType: WebExpand<ts_EntityRiskFrequency_Expand, ovs_operationtype_Select, ovs_operationtype_Filter, { ts_OperationType: ovs_operationtype_Result }>;
  ts_Site: WebExpand<ts_EntityRiskFrequency_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Site: msdyn_FunctionalLocation_Result }>;
  ts_Stakeholder: WebExpand<ts_EntityRiskFrequency_Expand, Account_Select, Account_Filter, { ts_Stakeholder: Account_Result }>;
}
interface ts_EntityRiskFrequency_FormattedResult {
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
  ts_activitytype_formatted?: string;
  ts_fiscalyear_formatted?: string;
  ts_operation_formatted?: string;
  ts_operationtype_formatted?: string;
  ts_programarea_formatted?: string;
  ts_riskfrequency_formatted?: string;
  ts_site_formatted?: string;
  ts_stakeholder_formatted?: string;
}
interface ts_EntityRiskFrequency_Result extends ts_EntityRiskFrequency_Base, ts_EntityRiskFrequency_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_activitytype_guid: string | null;
  ts_fiscalyear_guid: string | null;
  ts_operation_guid: string | null;
  ts_operationtype_guid: string | null;
  ts_programarea_guid: string | null;
  ts_riskfrequency_guid: string | null;
  ts_site_guid: string | null;
  ts_stakeholder_guid: string | null;
}
interface ts_EntityRiskFrequency_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ActivityType: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_Operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_OperationType: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
  ts_Site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_EntityRiskFrequency_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_entityriskfrequencies: WebMappingRetrieve<ts_EntityRiskFrequency_Select,ts_EntityRiskFrequency_Expand,ts_EntityRiskFrequency_Filter,ts_EntityRiskFrequency_Fixed,ts_EntityRiskFrequency_Result,ts_EntityRiskFrequency_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityriskfrequencies: WebMappingRelated<ts_EntityRiskFrequency_RelatedOne,ts_EntityRiskFrequency_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityriskfrequencies: WebMappingCUDA<ts_EntityRiskFrequency_Create,ts_EntityRiskFrequency_Update,ts_EntityRiskFrequency_Select>;
}
