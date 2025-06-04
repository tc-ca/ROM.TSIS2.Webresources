interface ts_PrescribedFrequencyOverride_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_prescribedfrequencyoverride_statecode | null;
  statuscode?: ts_prescribedfrequencyoverride_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_prescribedfrequencyoverrideid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_PrescribedFrequencyOverride_Relationships {
  ts_ActivityType?: msdyn_incidenttype_Result | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
}
interface ts_PrescribedFrequencyOverride extends ts_PrescribedFrequencyOverride_Base, ts_PrescribedFrequencyOverride_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ActivityType_bind$msdyn_incidenttypes?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_RiskFrequency_bind$ts_riskfrequencies?: string | null;
}
interface ts_PrescribedFrequencyOverride_Create extends ts_PrescribedFrequencyOverride {
}
interface ts_PrescribedFrequencyOverride_Update extends ts_PrescribedFrequencyOverride {
}
interface ts_PrescribedFrequencyOverride_Select {
  createdby_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_PrescribedFrequencyOverride_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_PrescribedFrequencyOverride_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_PrescribedFrequencyOverride_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_PrescribedFrequencyOverride_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_PrescribedFrequencyOverride_Select, { statecode: ts_prescribedfrequencyoverride_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_PrescribedFrequencyOverride_Select, { statuscode: ts_prescribedfrequencyoverride_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_PrescribedFrequencyOverride_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytype_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ts_activitytype_guid: string | null }, { ts_activitytype_formatted?: string }>;
  ts_fiscalyear_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ts_name: string | null }, {  }>;
  ts_prescribedfrequencyoverrideid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ts_prescribedfrequencyoverrideid: string | null }, {  }>;
  ts_riskfrequency_guid: WebAttribute<ts_PrescribedFrequencyOverride_Select, { ts_riskfrequency_guid: string | null }, { ts_riskfrequency_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_PrescribedFrequencyOverride_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_PrescribedFrequencyOverride_Select, { versionnumber: number | null }, {  }>;
}
interface ts_PrescribedFrequencyOverride_Filter {
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
  statecode: ts_prescribedfrequencyoverride_statecode;
  statuscode: ts_prescribedfrequencyoverride_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytype_guid: XQW.Guid;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_prescribedfrequencyoverrideid: XQW.Guid;
  ts_riskfrequency_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_PrescribedFrequencyOverride_Expand {
  createdby: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_PrescribedFrequencyOverride_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_PrescribedFrequencyOverride_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActivityType: WebExpand<ts_PrescribedFrequencyOverride_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_ActivityType: msdyn_incidenttype_Result }>;
  ts_FiscalYear: WebExpand<ts_PrescribedFrequencyOverride_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
}
interface ts_PrescribedFrequencyOverride_FormattedResult {
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
  ts_riskfrequency_formatted?: string;
}
interface ts_PrescribedFrequencyOverride_Result extends ts_PrescribedFrequencyOverride_Base, ts_PrescribedFrequencyOverride_Relationships {
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
  ts_riskfrequency_guid: string | null;
}
interface ts_PrescribedFrequencyOverride_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ActivityType: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface ts_PrescribedFrequencyOverride_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_prescribedfrequencyoverrides: WebMappingRetrieve<ts_PrescribedFrequencyOverride_Select,ts_PrescribedFrequencyOverride_Expand,ts_PrescribedFrequencyOverride_Filter,ts_PrescribedFrequencyOverride_Fixed,ts_PrescribedFrequencyOverride_Result,ts_PrescribedFrequencyOverride_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_prescribedfrequencyoverrides: WebMappingRelated<ts_PrescribedFrequencyOverride_RelatedOne,ts_PrescribedFrequencyOverride_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_prescribedfrequencyoverrides: WebMappingCUDA<ts_PrescribedFrequencyOverride_Create,ts_PrescribedFrequencyOverride_Update,ts_PrescribedFrequencyOverride_Select>;
}
