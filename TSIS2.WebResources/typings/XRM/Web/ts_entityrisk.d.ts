interface ts_EntityRisk_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_entityrisk_statecode | null;
  statuscode?: ts_entityrisk_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_calculatedriskscore?: number | null;
  ts_entityid?: string | null;
  ts_entityname?: ts_entityrisk_ts_entityname | null;
  ts_entityriskid?: string | null;
  ts_name?: string | null;
  ts_riskscore?: number | null;
  ts_runpowerautomateflow?: boolean | null;
  ts_weightedriskscore?: number | null;
  ts_year?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_Relationships {
  ts_EntityRisk_Account_Account?: Account_Result[] | null;
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation?: msdyn_FunctionalLocation_Result[] | null;
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype?: msdyn_incidenttype_Result[] | null;
  ts_EntityRisk_ovs_operation_ovs_operation?: ovs_operation_Result[] | null;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype?: ovs_operationtype_Result[] | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
}
interface ts_EntityRisk extends ts_EntityRisk_Base, ts_EntityRisk_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_RiskFrequency_bind$ts_riskfrequencies?: string | null;
  ts_RiskRating_bind$ts_riskratings?: string | null;
}
interface ts_EntityRisk_Create extends ts_EntityRisk {
}
interface ts_EntityRisk_Update extends ts_EntityRisk {
}
interface ts_EntityRisk_Select {
  createdby_guid: WebAttribute<ts_EntityRisk_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_EntityRisk_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_EntityRisk_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_EntityRisk_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_EntityRisk_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_EntityRisk_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_EntityRisk_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_EntityRisk_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_EntityRisk_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_EntityRisk_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_EntityRisk_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_EntityRisk_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_EntityRisk_Select, { statecode: ts_entityrisk_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_EntityRisk_Select, { statuscode: ts_entityrisk_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_EntityRisk_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_calculatedriskscore: WebAttribute<ts_EntityRisk_Select, { ts_calculatedriskscore: number | null }, {  }>;
  ts_entityid: WebAttribute<ts_EntityRisk_Select, { ts_entityid: string | null }, {  }>;
  ts_entityname: WebAttribute<ts_EntityRisk_Select, { ts_entityname: ts_entityrisk_ts_entityname | null }, { ts_entityname_formatted?: string }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_Select, { ts_entityriskid: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_EntityRisk_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_EntityRisk_Select, { ts_name: string | null }, {  }>;
  ts_riskfrequency_guid: WebAttribute<ts_EntityRisk_Select, { ts_riskfrequency_guid: string | null }, { ts_riskfrequency_formatted?: string }>;
  ts_riskrating_guid: WebAttribute<ts_EntityRisk_Select, { ts_riskrating_guid: string | null }, { ts_riskrating_formatted?: string }>;
  ts_riskscore: WebAttribute<ts_EntityRisk_Select, { ts_riskscore: number | null }, {  }>;
  ts_runpowerautomateflow: WebAttribute<ts_EntityRisk_Select, { ts_runpowerautomateflow: boolean | null }, {  }>;
  ts_weightedriskscore: WebAttribute<ts_EntityRisk_Select, { ts_weightedriskscore: number | null }, {  }>;
  ts_year: WebAttribute<ts_EntityRisk_Select, { ts_year: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_EntityRisk_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_Filter {
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
  statecode: ts_entityrisk_statecode;
  statuscode: ts_entityrisk_statuscode;
  timezoneruleversionnumber: number;
  ts_calculatedriskscore: any;
  ts_entityid: string;
  ts_entityname: ts_entityrisk_ts_entityname;
  ts_entityriskid: XQW.Guid;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_riskfrequency_guid: XQW.Guid;
  ts_riskrating_guid: XQW.Guid;
  ts_riskscore: any;
  ts_runpowerautomateflow: boolean;
  ts_weightedriskscore: any;
  ts_year: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_EntityRisk_Expand {
  createdby: WebExpand<ts_EntityRisk_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_EntityRisk_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_EntityRisk_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_EntityRisk_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_EntityRisk_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_EntityRisk_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_EntityRisk_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_EntityRisk_Account_Account: WebExpand<ts_EntityRisk_Expand, Account_Select, Account_Filter, { ts_EntityRisk_Account_Account: Account_Result[] }>;
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: WebExpand<ts_EntityRisk_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: msdyn_FunctionalLocation_Result[] }>;
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: WebExpand<ts_EntityRisk_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: msdyn_incidenttype_Result[] }>;
  ts_EntityRisk_ovs_operation_ovs_operation: WebExpand<ts_EntityRisk_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_EntityRisk_ovs_operation_ovs_operation: ovs_operation_Result[] }>;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebExpand<ts_EntityRisk_Expand, ovs_operationtype_Select, ovs_operationtype_Filter, { ts_EntityRisk_ovs_operationtype_ovs_operationtype: ovs_operationtype_Result[] }>;
  ts_FiscalYear: WebExpand<ts_EntityRisk_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
}
interface ts_EntityRisk_FormattedResult {
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
  ts_entityname_formatted?: string;
  ts_fiscalyear_formatted?: string;
  ts_riskfrequency_formatted?: string;
  ts_riskrating_formatted?: string;
}
interface ts_EntityRisk_Result extends ts_EntityRisk_Base, ts_EntityRisk_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_fiscalyear_guid: string | null;
  ts_riskfrequency_guid: string | null;
  ts_riskrating_guid: string | null;
}
interface ts_EntityRisk_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface ts_EntityRisk_RelatedMany {
  ts_EntityRisk_Account_Account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_EntityRisk_ovs_operation_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisks: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisks: WebMappingRelated<ts_EntityRisk_RelatedOne,ts_EntityRisk_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisks: WebMappingCUDA<ts_EntityRisk_Create,ts_EntityRisk_Update,ts_EntityRisk_Select>;
}
