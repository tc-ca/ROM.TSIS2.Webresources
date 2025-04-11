interface ts_operationriskassessment_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_operationriskassessment_statecode | null;
  statuscode?: ts_operationriskassessment_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_calculationlog?: string | null;
  ts_discretionaryscore?: number | null;
  ts_lastsubmissiondate?: Date | null;
  ts_name?: string | null;
  ts_operationriskassessmentid?: string | null;
  ts_riskcriteriaoptionsimport?: string | null;
  ts_riskcriteriascore?: number | null;
  ts_riskscore?: number | null;
  ts_riskthresholdenglish?: string | null;
  ts_riskthresholdfrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_operationriskassessment_Relationships {
  ts_operationriskassessment_ts_operationriskassessment_ts_RiskCategory?: ts_RiskCategory_Result[] | null;
}
interface ts_operationriskassessment extends ts_operationriskassessment_Base, ts_operationriskassessment_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_operation_bind$ovs_operations?: string | null;
}
interface ts_operationriskassessment_Create extends ts_operationriskassessment {
}
interface ts_operationriskassessment_Update extends ts_operationriskassessment {
}
interface ts_operationriskassessment_Select {
  createdby_guid: WebAttribute<ts_operationriskassessment_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_operationriskassessment_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_operationriskassessment_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_operationriskassessment_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_operationriskassessment_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_operationriskassessment_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_operationriskassessment_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_operationriskassessment_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_operationriskassessment_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_operationriskassessment_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_operationriskassessment_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_operationriskassessment_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_operationriskassessment_Select, { statecode: ts_operationriskassessment_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_operationriskassessment_Select, { statuscode: ts_operationriskassessment_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_operationriskassessment_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_calculationlog: WebAttribute<ts_operationriskassessment_Select, { ts_calculationlog: string | null }, {  }>;
  ts_discretionaryscore: WebAttribute<ts_operationriskassessment_Select, { ts_discretionaryscore: number | null }, {  }>;
  ts_lastsubmissiondate: WebAttribute<ts_operationriskassessment_Select, { ts_lastsubmissiondate: Date | null }, { ts_lastsubmissiondate_formatted?: string }>;
  ts_name: WebAttribute<ts_operationriskassessment_Select, { ts_name: string | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_operationriskassessment_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationriskassessmentid: WebAttribute<ts_operationriskassessment_Select, { ts_operationriskassessmentid: string | null }, {  }>;
  ts_riskcriteriaoptionsimport: WebAttribute<ts_operationriskassessment_Select, { ts_riskcriteriaoptionsimport: string | null }, {  }>;
  ts_riskcriteriascore: WebAttribute<ts_operationriskassessment_Select, { ts_riskcriteriascore: number | null }, {  }>;
  ts_riskscore: WebAttribute<ts_operationriskassessment_Select, { ts_riskscore: number | null }, {  }>;
  ts_riskthresholdenglish: WebAttribute<ts_operationriskassessment_Select, { ts_riskthresholdenglish: string | null }, {  }>;
  ts_riskthresholdfrench: WebAttribute<ts_operationriskassessment_Select, { ts_riskthresholdfrench: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_operationriskassessment_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_operationriskassessment_Select, { versionnumber: number | null }, {  }>;
}
interface ts_operationriskassessment_Filter {
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
  statecode: ts_operationriskassessment_statecode;
  statuscode: ts_operationriskassessment_statuscode;
  timezoneruleversionnumber: number;
  ts_calculationlog: string;
  ts_discretionaryscore: number;
  ts_lastsubmissiondate: Date;
  ts_name: string;
  ts_operation_guid: XQW.Guid;
  ts_operationriskassessmentid: XQW.Guid;
  ts_riskcriteriaoptionsimport: string;
  ts_riskcriteriascore: number;
  ts_riskscore: number;
  ts_riskthresholdenglish: string;
  ts_riskthresholdfrench: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_operationriskassessment_Expand {
  createdby: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_operationriskassessment_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_operationriskassessment_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_operation: WebExpand<ts_operationriskassessment_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_operation: ovs_operation_Result }>;
  ts_operationriskassessment_ts_operationriskassessment_ts_RiskCategory: WebExpand<ts_operationriskassessment_Expand, ts_RiskCategory_Select, ts_RiskCategory_Filter, { ts_operationriskassessment_ts_operationriskassessment_ts_RiskCategory: ts_RiskCategory_Result[] }>;
}
interface ts_operationriskassessment_FormattedResult {
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
  ts_lastsubmissiondate_formatted?: string;
  ts_operation_formatted?: string;
}
interface ts_operationriskassessment_Result extends ts_operationriskassessment_Base, ts_operationriskassessment_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_operation_guid: string | null;
}
interface ts_operationriskassessment_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface ts_operationriskassessment_RelatedMany {
  ts_operationriskassessment_ts_operationriskassessment_ts_RiskCategory: WebMappingRetrieve<ts_RiskCategory_Select,ts_RiskCategory_Expand,ts_RiskCategory_Filter,ts_RiskCategory_Fixed,ts_RiskCategory_Result,ts_RiskCategory_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_operationriskassessments: WebMappingRetrieve<ts_operationriskassessment_Select,ts_operationriskassessment_Expand,ts_operationriskassessment_Filter,ts_operationriskassessment_Fixed,ts_operationriskassessment_Result,ts_operationriskassessment_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_operationriskassessments: WebMappingRelated<ts_operationriskassessment_RelatedOne,ts_operationriskassessment_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_operationriskassessments: WebMappingCUDA<ts_operationriskassessment_Create,ts_operationriskassessment_Update,ts_operationriskassessment_Select>;
}
