interface ts_TeamPlanningData_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_teamplanningdata_statecode | null;
  statuscode?: ts_teamplanningdata_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_availablehoursq1?: number | null;
  ts_availablehoursq2?: number | null;
  ts_availablehoursq3?: number | null;
  ts_availablehoursq4?: number | null;
  ts_availableinspectorhoursfiscalyear?: number | null;
  ts_englishname?: string | null;
  ts_frenchname?: string | null;
  ts_name?: string | null;
  ts_plannedactivityfiscalyear?: number | null;
  ts_plannedactivityq1?: number | null;
  ts_plannedactivityq2?: number | null;
  ts_plannedactivityq3?: number | null;
  ts_plannedactivityq4?: number | null;
  ts_residualinspectorhoursfiscalyear?: number | null;
  ts_residualinspectorhoursq1?: number | null;
  ts_residualinspectorhoursq2?: number | null;
  ts_residualinspectorhoursq3?: number | null;
  ts_residualinspectorhoursq4?: number | null;
  ts_teamestimateddurationfiscalyear?: number | null;
  ts_teamestimateddurationq1?: number | null;
  ts_teamestimateddurationq2?: number | null;
  ts_teamestimateddurationq3?: number | null;
  ts_teamestimateddurationq4?: number | null;
  ts_teamplanningdataid?: string | null;
  ts_totalhoursq1?: number | null;
  ts_totalhoursq2?: number | null;
  ts_totalhoursq3?: number | null;
  ts_totalhoursq4?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_TeamPlanningData_Relationships {
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
  ts_Team?: Team_Result | null;
  ts_ts_planningdata_TeamPlanningData_ts_teamp?: ts_PlanningData_Result[] | null;
}
interface ts_TeamPlanningData extends ts_TeamPlanningData_Base, ts_TeamPlanningData_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_Team_bind$teams?: string | null;
}
interface ts_TeamPlanningData_Create extends ts_TeamPlanningData {
}
interface ts_TeamPlanningData_Update extends ts_TeamPlanningData {
}
interface ts_TeamPlanningData_Select {
  createdby_guid: WebAttribute<ts_TeamPlanningData_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_TeamPlanningData_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_TeamPlanningData_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_TeamPlanningData_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_TeamPlanningData_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_TeamPlanningData_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_TeamPlanningData_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_TeamPlanningData_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_TeamPlanningData_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_TeamPlanningData_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_TeamPlanningData_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_TeamPlanningData_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_TeamPlanningData_Select, { statecode: ts_teamplanningdata_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_TeamPlanningData_Select, { statuscode: ts_teamplanningdata_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_TeamPlanningData_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_availablehoursq1: WebAttribute<ts_TeamPlanningData_Select, { ts_availablehoursq1: number | null }, {  }>;
  ts_availablehoursq2: WebAttribute<ts_TeamPlanningData_Select, { ts_availablehoursq2: number | null }, {  }>;
  ts_availablehoursq3: WebAttribute<ts_TeamPlanningData_Select, { ts_availablehoursq3: number | null }, {  }>;
  ts_availablehoursq4: WebAttribute<ts_TeamPlanningData_Select, { ts_availablehoursq4: number | null }, {  }>;
  ts_availableinspectorhoursfiscalyear: WebAttribute<ts_TeamPlanningData_Select, { ts_availableinspectorhoursfiscalyear: number | null }, {  }>;
  ts_englishname: WebAttribute<ts_TeamPlanningData_Select, { ts_englishname: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_TeamPlanningData_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_frenchname: WebAttribute<ts_TeamPlanningData_Select, { ts_frenchname: string | null }, {  }>;
  ts_name: WebAttribute<ts_TeamPlanningData_Select, { ts_name: string | null }, {  }>;
  ts_plannedactivityfiscalyear: WebAttribute<ts_TeamPlanningData_Select, { ts_plannedactivityfiscalyear: number | null }, {  }>;
  ts_plannedactivityq1: WebAttribute<ts_TeamPlanningData_Select, { ts_plannedactivityq1: number | null }, {  }>;
  ts_plannedactivityq2: WebAttribute<ts_TeamPlanningData_Select, { ts_plannedactivityq2: number | null }, {  }>;
  ts_plannedactivityq3: WebAttribute<ts_TeamPlanningData_Select, { ts_plannedactivityq3: number | null }, {  }>;
  ts_plannedactivityq4: WebAttribute<ts_TeamPlanningData_Select, { ts_plannedactivityq4: number | null }, {  }>;
  ts_residualinspectorhoursfiscalyear: WebAttribute<ts_TeamPlanningData_Select, { ts_residualinspectorhoursfiscalyear: number | null }, {  }>;
  ts_residualinspectorhoursq1: WebAttribute<ts_TeamPlanningData_Select, { ts_residualinspectorhoursq1: number | null }, {  }>;
  ts_residualinspectorhoursq2: WebAttribute<ts_TeamPlanningData_Select, { ts_residualinspectorhoursq2: number | null }, {  }>;
  ts_residualinspectorhoursq3: WebAttribute<ts_TeamPlanningData_Select, { ts_residualinspectorhoursq3: number | null }, {  }>;
  ts_residualinspectorhoursq4: WebAttribute<ts_TeamPlanningData_Select, { ts_residualinspectorhoursq4: number | null }, {  }>;
  ts_team_guid: WebAttribute<ts_TeamPlanningData_Select, { ts_team_guid: string | null }, { ts_team_formatted?: string }>;
  ts_teamestimateddurationfiscalyear: WebAttribute<ts_TeamPlanningData_Select, { ts_teamestimateddurationfiscalyear: number | null }, {  }>;
  ts_teamestimateddurationq1: WebAttribute<ts_TeamPlanningData_Select, { ts_teamestimateddurationq1: number | null }, {  }>;
  ts_teamestimateddurationq2: WebAttribute<ts_TeamPlanningData_Select, { ts_teamestimateddurationq2: number | null }, {  }>;
  ts_teamestimateddurationq3: WebAttribute<ts_TeamPlanningData_Select, { ts_teamestimateddurationq3: number | null }, {  }>;
  ts_teamestimateddurationq4: WebAttribute<ts_TeamPlanningData_Select, { ts_teamestimateddurationq4: number | null }, {  }>;
  ts_teamplanningdataid: WebAttribute<ts_TeamPlanningData_Select, { ts_teamplanningdataid: string | null }, {  }>;
  ts_totalhoursq1: WebAttribute<ts_TeamPlanningData_Select, { ts_totalhoursq1: number | null }, {  }>;
  ts_totalhoursq2: WebAttribute<ts_TeamPlanningData_Select, { ts_totalhoursq2: number | null }, {  }>;
  ts_totalhoursq3: WebAttribute<ts_TeamPlanningData_Select, { ts_totalhoursq3: number | null }, {  }>;
  ts_totalhoursq4: WebAttribute<ts_TeamPlanningData_Select, { ts_totalhoursq4: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_TeamPlanningData_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_TeamPlanningData_Select, { versionnumber: number | null }, {  }>;
}
interface ts_TeamPlanningData_Filter {
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
  statecode: ts_teamplanningdata_statecode;
  statuscode: ts_teamplanningdata_statuscode;
  timezoneruleversionnumber: number;
  ts_availablehoursq1: any;
  ts_availablehoursq2: any;
  ts_availablehoursq3: any;
  ts_availablehoursq4: any;
  ts_availableinspectorhoursfiscalyear: number;
  ts_englishname: string;
  ts_fiscalyear_guid: XQW.Guid;
  ts_frenchname: string;
  ts_name: string;
  ts_plannedactivityfiscalyear: number;
  ts_plannedactivityq1: number;
  ts_plannedactivityq2: number;
  ts_plannedactivityq3: number;
  ts_plannedactivityq4: number;
  ts_residualinspectorhoursfiscalyear: any;
  ts_residualinspectorhoursq1: any;
  ts_residualinspectorhoursq2: any;
  ts_residualinspectorhoursq3: any;
  ts_residualinspectorhoursq4: any;
  ts_team_guid: XQW.Guid;
  ts_teamestimateddurationfiscalyear: any;
  ts_teamestimateddurationq1: any;
  ts_teamestimateddurationq2: any;
  ts_teamestimateddurationq3: any;
  ts_teamestimateddurationq4: any;
  ts_teamplanningdataid: XQW.Guid;
  ts_totalhoursq1: number;
  ts_totalhoursq2: number;
  ts_totalhoursq3: number;
  ts_totalhoursq4: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_TeamPlanningData_Expand {
  createdby: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_TeamPlanningData_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_TeamPlanningData_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_FiscalYear: WebExpand<ts_TeamPlanningData_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
  ts_Team: WebExpand<ts_TeamPlanningData_Expand, Team_Select, Team_Filter, { ts_Team: Team_Result }>;
  ts_ts_planningdata_TeamPlanningData_ts_teamp: WebExpand<ts_TeamPlanningData_Expand, ts_PlanningData_Select, ts_PlanningData_Filter, { ts_ts_planningdata_TeamPlanningData_ts_teamp: ts_PlanningData_Result[] }>;
}
interface ts_TeamPlanningData_FormattedResult {
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
  ts_fiscalyear_formatted?: string;
  ts_team_formatted?: string;
}
interface ts_TeamPlanningData_Result extends ts_TeamPlanningData_Base, ts_TeamPlanningData_Relationships {
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
  ts_team_guid: string | null;
}
interface ts_TeamPlanningData_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_Team: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
}
interface ts_TeamPlanningData_RelatedMany {
  ts_ts_planningdata_TeamPlanningData_ts_teamp: WebMappingRetrieve<ts_PlanningData_Select,ts_PlanningData_Expand,ts_PlanningData_Filter,ts_PlanningData_Fixed,ts_PlanningData_Result,ts_PlanningData_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_teamplanningdatas: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_teamplanningdatas: WebMappingRelated<ts_TeamPlanningData_RelatedOne,ts_TeamPlanningData_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_teamplanningdatas: WebMappingCUDA<ts_TeamPlanningData_Create,ts_TeamPlanningData_Update,ts_TeamPlanningData_Select>;
}
