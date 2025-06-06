interface ts_OperationActivityRiskScores_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_operationactivityriskscores_statecode | null;
  statuscode?: ts_operationactivityriskscores_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_activitytyperiskscore?: number | null;
  ts_calculatedriskscore?: number | null;
  ts_name?: string | null;
  ts_operationactivityriskscoresid?: string | null;
  ts_operationriskscore?: number | null;
  ts_operationtyperiskid?: string | null;
  ts_operationtyperiskscore?: number | null;
  ts_programareariskscore?: number | null;
  ts_riskapplication?: boolean | null;
  ts_riskapplicationscore?: number | null;
  ts_riskscore?: number | null;
  ts_riskscoreribbontrigger?: Date | null;
  ts_riskscoretrigger?: number | null;
  ts_siteriskscore?: number | null;
  ts_stakeholderriskscore?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_OperationActivityRiskScores_Relationships {
  ts_ActivityTypeEntityRisk?: ts_EntityRisk_Result | null;
  ts_EntityRiskFrequency?: ts_EntityRiskFrequency_Result | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
  ts_OperationActivity?: ts_OperationActivity_Result | null;
  ts_OperationEntityRisk?: ts_EntityRisk_Result | null;
  ts_OperationTypeEntityRisk?: ts_EntityRisk_Result | null;
  ts_PrescribedFrequencyOverride?: ts_PrescribedFrequencyOverride_Result | null;
  ts_ProgramAreaEntityRisk?: ts_EntityRisk_Result | null;
  ts_SiteEntityRisk?: ts_EntityRisk_Result | null;
  ts_StakeholderEntityRisk?: ts_EntityRisk_Result | null;
}
interface ts_OperationActivityRiskScores extends ts_OperationActivityRiskScores_Base, ts_OperationActivityRiskScores_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ActivityTypeEntityRisk_bind$ts_entityrisks?: string | null;
  ts_EntityRiskFrequency_bind$ts_entityriskfrequencies?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_OperationActivity_bind$ts_operationactivities?: string | null;
  ts_OperationEntityRisk_bind$ts_entityrisks?: string | null;
  ts_OperationTypeEntityRisk_bind$ts_entityrisks?: string | null;
  ts_PrescribedFrequencyOverride_bind$ts_prescribedfrequencyoverrides?: string | null;
  ts_ProgramAreaEntityRisk_bind$ts_entityrisks?: string | null;
  ts_RiskFrequency_bind$ts_riskfrequencies?: string | null;
  ts_RiskRating_bind$ts_riskratings?: string | null;
  ts_SiteEntityRisk_bind$ts_entityrisks?: string | null;
  ts_StakeholderEntityRisk_bind$ts_entityrisks?: string | null;
}
interface ts_OperationActivityRiskScores_Create extends ts_OperationActivityRiskScores {
}
interface ts_OperationActivityRiskScores_Update extends ts_OperationActivityRiskScores {
}
interface ts_OperationActivityRiskScores_Select {
  createdby_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_OperationActivityRiskScores_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_OperationActivityRiskScores_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_OperationActivityRiskScores_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_OperationActivityRiskScores_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_OperationActivityRiskScores_Select, { statecode: ts_operationactivityriskscores_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_OperationActivityRiskScores_Select, { statuscode: ts_operationactivityriskscores_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_OperationActivityRiskScores_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytypeentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_activitytypeentityrisk_guid: string | null }, { ts_activitytypeentityrisk_formatted?: string }>;
  ts_activitytyperiskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_activitytyperiskscore: number | null }, {  }>;
  ts_calculatedriskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_calculatedriskscore: number | null }, {  }>;
  ts_entityriskfrequency_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_entityriskfrequency_guid: string | null }, { ts_entityriskfrequency_formatted?: string }>;
  ts_fiscalyear_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_name: string | null }, {  }>;
  ts_operationactivity_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationactivity_guid: string | null }, { ts_operationactivity_formatted?: string }>;
  ts_operationactivityriskscoresid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationactivityriskscoresid: string | null }, {  }>;
  ts_operationentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationentityrisk_guid: string | null }, { ts_operationentityrisk_formatted?: string }>;
  ts_operationriskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationriskscore: number | null }, {  }>;
  ts_operationtypeentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationtypeentityrisk_guid: string | null }, { ts_operationtypeentityrisk_formatted?: string }>;
  ts_operationtyperiskid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationtyperiskid: string | null }, {  }>;
  ts_operationtyperiskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_operationtyperiskscore: number | null }, {  }>;
  ts_prescribedfrequencyoverride_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_prescribedfrequencyoverride_guid: string | null }, { ts_prescribedfrequencyoverride_formatted?: string }>;
  ts_programareaentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_programareaentityrisk_guid: string | null }, { ts_programareaentityrisk_formatted?: string }>;
  ts_programareariskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_programareariskscore: number | null }, {  }>;
  ts_riskapplication: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskapplication: boolean | null }, {  }>;
  ts_riskapplicationscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskapplicationscore: number | null }, {  }>;
  ts_riskfrequency_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskfrequency_guid: string | null }, { ts_riskfrequency_formatted?: string }>;
  ts_riskrating_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskrating_guid: string | null }, { ts_riskrating_formatted?: string }>;
  ts_riskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskscore: number | null }, {  }>;
  ts_riskscoreribbontrigger: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskscoreribbontrigger: Date | null }, { ts_riskscoreribbontrigger_formatted?: string }>;
  ts_riskscoretrigger: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_riskscoretrigger: number | null }, {  }>;
  ts_siteentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_siteentityrisk_guid: string | null }, { ts_siteentityrisk_formatted?: string }>;
  ts_siteriskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_siteriskscore: number | null }, {  }>;
  ts_stakeholderentityrisk_guid: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_stakeholderentityrisk_guid: string | null }, { ts_stakeholderentityrisk_formatted?: string }>;
  ts_stakeholderriskscore: WebAttribute<ts_OperationActivityRiskScores_Select, { ts_stakeholderriskscore: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_OperationActivityRiskScores_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_OperationActivityRiskScores_Select, { versionnumber: number | null }, {  }>;
}
interface ts_OperationActivityRiskScores_Filter {
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
  statecode: ts_operationactivityriskscores_statecode;
  statuscode: ts_operationactivityriskscores_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytypeentityrisk_guid: XQW.Guid;
  ts_activitytyperiskscore: any;
  ts_calculatedriskscore: any;
  ts_entityriskfrequency_guid: XQW.Guid;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_operationactivity_guid: XQW.Guid;
  ts_operationactivityriskscoresid: XQW.Guid;
  ts_operationentityrisk_guid: XQW.Guid;
  ts_operationriskscore: any;
  ts_operationtypeentityrisk_guid: XQW.Guid;
  ts_operationtyperiskid: string;
  ts_operationtyperiskscore: any;
  ts_prescribedfrequencyoverride_guid: XQW.Guid;
  ts_programareaentityrisk_guid: XQW.Guid;
  ts_programareariskscore: any;
  ts_riskapplication: boolean;
  ts_riskapplicationscore: any;
  ts_riskfrequency_guid: XQW.Guid;
  ts_riskrating_guid: XQW.Guid;
  ts_riskscore: any;
  ts_riskscoreribbontrigger: Date;
  ts_riskscoretrigger: any;
  ts_siteentityrisk_guid: XQW.Guid;
  ts_siteriskscore: any;
  ts_stakeholderentityrisk_guid: XQW.Guid;
  ts_stakeholderriskscore: any;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_OperationActivityRiskScores_Expand {
  createdby: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_OperationActivityRiskScores_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_OperationActivityRiskScores_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActivityTypeEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_ActivityTypeEntityRisk: ts_EntityRisk_Result }>;
  ts_EntityRiskFrequency: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRiskFrequency_Select, ts_EntityRiskFrequency_Filter, { ts_EntityRiskFrequency: ts_EntityRiskFrequency_Result }>;
  ts_FiscalYear: WebExpand<ts_OperationActivityRiskScores_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
  ts_OperationActivity: WebExpand<ts_OperationActivityRiskScores_Expand, ts_OperationActivity_Select, ts_OperationActivity_Filter, { ts_OperationActivity: ts_OperationActivity_Result }>;
  ts_OperationEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_OperationEntityRisk: ts_EntityRisk_Result }>;
  ts_OperationTypeEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_OperationTypeEntityRisk: ts_EntityRisk_Result }>;
  ts_PrescribedFrequencyOverride: WebExpand<ts_OperationActivityRiskScores_Expand, ts_PrescribedFrequencyOverride_Select, ts_PrescribedFrequencyOverride_Filter, { ts_PrescribedFrequencyOverride: ts_PrescribedFrequencyOverride_Result }>;
  ts_ProgramAreaEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_ProgramAreaEntityRisk: ts_EntityRisk_Result }>;
  ts_SiteEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_SiteEntityRisk: ts_EntityRisk_Result }>;
  ts_StakeholderEntityRisk: WebExpand<ts_OperationActivityRiskScores_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_StakeholderEntityRisk: ts_EntityRisk_Result }>;
}
interface ts_OperationActivityRiskScores_FormattedResult {
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
  ts_activitytypeentityrisk_formatted?: string;
  ts_entityriskfrequency_formatted?: string;
  ts_fiscalyear_formatted?: string;
  ts_operationactivity_formatted?: string;
  ts_operationentityrisk_formatted?: string;
  ts_operationtypeentityrisk_formatted?: string;
  ts_prescribedfrequencyoverride_formatted?: string;
  ts_programareaentityrisk_formatted?: string;
  ts_riskfrequency_formatted?: string;
  ts_riskrating_formatted?: string;
  ts_riskscoreribbontrigger_formatted?: string;
  ts_siteentityrisk_formatted?: string;
  ts_stakeholderentityrisk_formatted?: string;
}
interface ts_OperationActivityRiskScores_Result extends ts_OperationActivityRiskScores_Base, ts_OperationActivityRiskScores_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_activitytypeentityrisk_guid: string | null;
  ts_entityriskfrequency_guid: string | null;
  ts_fiscalyear_guid: string | null;
  ts_operationactivity_guid: string | null;
  ts_operationentityrisk_guid: string | null;
  ts_operationtypeentityrisk_guid: string | null;
  ts_prescribedfrequencyoverride_guid: string | null;
  ts_programareaentityrisk_guid: string | null;
  ts_riskfrequency_guid: string | null;
  ts_riskrating_guid: string | null;
  ts_siteentityrisk_guid: string | null;
  ts_stakeholderentityrisk_guid: string | null;
}
interface ts_OperationActivityRiskScores_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ActivityTypeEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_EntityRiskFrequency: WebMappingRetrieve<ts_EntityRiskFrequency_Select,ts_EntityRiskFrequency_Expand,ts_EntityRiskFrequency_Filter,ts_EntityRiskFrequency_Fixed,ts_EntityRiskFrequency_Result,ts_EntityRiskFrequency_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_OperationActivity: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
  ts_OperationEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_OperationTypeEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_PrescribedFrequencyOverride: WebMappingRetrieve<ts_PrescribedFrequencyOverride_Select,ts_PrescribedFrequencyOverride_Expand,ts_PrescribedFrequencyOverride_Filter,ts_PrescribedFrequencyOverride_Fixed,ts_PrescribedFrequencyOverride_Result,ts_PrescribedFrequencyOverride_FormattedResult>;
  ts_ProgramAreaEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_SiteEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_StakeholderEntityRisk: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface ts_OperationActivityRiskScores_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_operationactivityriskscoreses: WebMappingRetrieve<ts_OperationActivityRiskScores_Select,ts_OperationActivityRiskScores_Expand,ts_OperationActivityRiskScores_Filter,ts_OperationActivityRiskScores_Fixed,ts_OperationActivityRiskScores_Result,ts_OperationActivityRiskScores_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_operationactivityriskscoreses: WebMappingRelated<ts_OperationActivityRiskScores_RelatedOne,ts_OperationActivityRiskScores_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_operationactivityriskscoreses: WebMappingCUDA<ts_OperationActivityRiskScores_Create,ts_OperationActivityRiskScores_Update,ts_OperationActivityRiskScores_Select>;
}
