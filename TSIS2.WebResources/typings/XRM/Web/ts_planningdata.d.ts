interface ts_PlanningData_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_planningdata_statecode | null;
  statuscode?: ts_planningdata_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_completedq1?: number | null;
  ts_completedq2?: number | null;
  ts_completedq3?: number | null;
  ts_completedq4?: number | null;
  ts_creationnotes?: string | null;
  ts_details?: string | null;
  ts_dueq1?: number | null;
  ts_dueq2?: number | null;
  ts_dueq3?: number | null;
  ts_dueq4?: number | null;
  ts_englishname?: string | null;
  ts_frenchname?: string | null;
  ts_generationlog?: string | null;
  ts_name?: string | null;
  ts_nullnumber?: number | null;
  ts_operationactivityisactive?: number | null;
  ts_operationactivityisoperational?: number | null;
  ts_originalteamestimatedduration?: number | null;
  ts_plannedq1?: number | null;
  ts_plannedq2?: number | null;
  ts_plannedq3?: number | null;
  ts_plannedq4?: number | null;
  ts_plannedwo?: number | null;
  ts_plannedwouncalculated?: number | null;
  ts_planningdataid?: string | null;
  ts_target?: number | null;
  ts_teamestimatedduration?: number | null;
  ts_variance?: number | null;
  ts_varianceuncalculated?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_PlanningData_Relationships {
  ts_ActivityType?: msdyn_incidenttype_Result | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
  ts_Operation?: ovs_operation_Result | null;
  ts_OperationActivity?: ts_OperationActivity_Result | null;
  ts_Site?: msdyn_FunctionalLocation_Result | null;
  ts_Stakeholder?: Account_Result | null;
  ts_Team?: Team_Result | null;
  ts_TeamPlanningData?: ts_TeamPlanningData_Result | null;
  ts_workorder_planningdata?: msdyn_workorder_Result[] | null;
}
interface ts_PlanningData extends ts_PlanningData_Base, ts_PlanningData_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ActivityType_bind$msdyn_incidenttypes?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_OperationActivity_bind$ts_operationactivities?: string | null;
  ts_OperationType_bind$ovs_operationtypes?: string | null;
  ts_Operation_bind$ovs_operations?: string | null;
  ts_Site_bind$msdyn_functionallocations?: string | null;
  ts_Stakeholder_bind$accounts?: string | null;
  ts_TeamPlanningData_bind$ts_teamplanningdatas?: string | null;
  ts_Team_bind$teams?: string | null;
  ts_planningdetail_bind$ts_planningdetails?: string | null;
}
interface ts_PlanningData_Create extends ts_PlanningData {
}
interface ts_PlanningData_Update extends ts_PlanningData {
}
interface ts_PlanningData_Select {
  createdby_guid: WebAttribute<ts_PlanningData_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_PlanningData_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_PlanningData_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_PlanningData_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_PlanningData_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_PlanningData_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_PlanningData_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_PlanningData_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_PlanningData_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_PlanningData_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_PlanningData_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_PlanningData_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_PlanningData_Select, { statecode: ts_planningdata_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_PlanningData_Select, { statuscode: ts_planningdata_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_PlanningData_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytype_guid: WebAttribute<ts_PlanningData_Select, { ts_activitytype_guid: string | null }, { ts_activitytype_formatted?: string }>;
  ts_completedq1: WebAttribute<ts_PlanningData_Select, { ts_completedq1: number | null }, {  }>;
  ts_completedq2: WebAttribute<ts_PlanningData_Select, { ts_completedq2: number | null }, {  }>;
  ts_completedq3: WebAttribute<ts_PlanningData_Select, { ts_completedq3: number | null }, {  }>;
  ts_completedq4: WebAttribute<ts_PlanningData_Select, { ts_completedq4: number | null }, {  }>;
  ts_creationnotes: WebAttribute<ts_PlanningData_Select, { ts_creationnotes: string | null }, {  }>;
  ts_details: WebAttribute<ts_PlanningData_Select, { ts_details: string | null }, {  }>;
  ts_dueq1: WebAttribute<ts_PlanningData_Select, { ts_dueq1: number | null }, {  }>;
  ts_dueq2: WebAttribute<ts_PlanningData_Select, { ts_dueq2: number | null }, {  }>;
  ts_dueq3: WebAttribute<ts_PlanningData_Select, { ts_dueq3: number | null }, {  }>;
  ts_dueq4: WebAttribute<ts_PlanningData_Select, { ts_dueq4: number | null }, {  }>;
  ts_englishname: WebAttribute<ts_PlanningData_Select, { ts_englishname: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_PlanningData_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_frenchname: WebAttribute<ts_PlanningData_Select, { ts_frenchname: string | null }, {  }>;
  ts_generationlog: WebAttribute<ts_PlanningData_Select, { ts_generationlog: string | null }, {  }>;
  ts_name: WebAttribute<ts_PlanningData_Select, { ts_name: string | null }, {  }>;
  ts_nullnumber: WebAttribute<ts_PlanningData_Select, { ts_nullnumber: number | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_PlanningData_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationactivity_guid: WebAttribute<ts_PlanningData_Select, { ts_operationactivity_guid: string | null }, { ts_operationactivity_formatted?: string }>;
  ts_operationactivityisactive: WebAttribute<ts_PlanningData_Select, { ts_operationactivityisactive: number | null }, {  }>;
  ts_operationactivityisoperational: WebAttribute<ts_PlanningData_Select, { ts_operationactivityisoperational: number | null }, {  }>;
  ts_operationtype_guid: WebAttribute<ts_PlanningData_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_originalteamestimatedduration: WebAttribute<ts_PlanningData_Select, { ts_originalteamestimatedduration: number | null }, {  }>;
  ts_plannedq1: WebAttribute<ts_PlanningData_Select, { ts_plannedq1: number | null }, {  }>;
  ts_plannedq2: WebAttribute<ts_PlanningData_Select, { ts_plannedq2: number | null }, {  }>;
  ts_plannedq3: WebAttribute<ts_PlanningData_Select, { ts_plannedq3: number | null }, {  }>;
  ts_plannedq4: WebAttribute<ts_PlanningData_Select, { ts_plannedq4: number | null }, {  }>;
  ts_plannedwo: WebAttribute<ts_PlanningData_Select, { ts_plannedwo: number | null }, {  }>;
  ts_plannedwouncalculated: WebAttribute<ts_PlanningData_Select, { ts_plannedwouncalculated: number | null }, {  }>;
  ts_planningdataid: WebAttribute<ts_PlanningData_Select, { ts_planningdataid: string | null }, {  }>;
  ts_planningdetail_guid: WebAttribute<ts_PlanningData_Select, { ts_planningdetail_guid: string | null }, { ts_planningdetail_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_PlanningData_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_PlanningData_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_target: WebAttribute<ts_PlanningData_Select, { ts_target: number | null }, {  }>;
  ts_team_guid: WebAttribute<ts_PlanningData_Select, { ts_team_guid: string | null }, { ts_team_formatted?: string }>;
  ts_teamestimatedduration: WebAttribute<ts_PlanningData_Select, { ts_teamestimatedduration: number | null }, {  }>;
  ts_teamplanningdata_guid: WebAttribute<ts_PlanningData_Select, { ts_teamplanningdata_guid: string | null }, { ts_teamplanningdata_formatted?: string }>;
  ts_variance: WebAttribute<ts_PlanningData_Select, { ts_variance: number | null }, {  }>;
  ts_varianceuncalculated: WebAttribute<ts_PlanningData_Select, { ts_varianceuncalculated: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_PlanningData_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_PlanningData_Select, { versionnumber: number | null }, {  }>;
}
interface ts_PlanningData_Filter {
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
  statecode: ts_planningdata_statecode;
  statuscode: ts_planningdata_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytype_guid: XQW.Guid;
  ts_completedq1: number;
  ts_completedq2: number;
  ts_completedq3: number;
  ts_completedq4: number;
  ts_creationnotes: string;
  ts_details: string;
  ts_dueq1: number;
  ts_dueq2: number;
  ts_dueq3: number;
  ts_dueq4: number;
  ts_englishname: string;
  ts_fiscalyear_guid: XQW.Guid;
  ts_frenchname: string;
  ts_generationlog: string;
  ts_name: string;
  ts_nullnumber: number;
  ts_operation_guid: XQW.Guid;
  ts_operationactivity_guid: XQW.Guid;
  ts_operationactivityisactive: number;
  ts_operationactivityisoperational: number;
  ts_operationtype_guid: XQW.Guid;
  ts_originalteamestimatedduration: any;
  ts_plannedq1: number;
  ts_plannedq2: number;
  ts_plannedq3: number;
  ts_plannedq4: number;
  ts_plannedwo: number;
  ts_plannedwouncalculated: number;
  ts_planningdataid: XQW.Guid;
  ts_planningdetail_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_target: number;
  ts_team_guid: XQW.Guid;
  ts_teamestimatedduration: any;
  ts_teamplanningdata_guid: XQW.Guid;
  ts_variance: number;
  ts_varianceuncalculated: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_PlanningData_Expand {
  createdby: WebExpand<ts_PlanningData_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_PlanningData_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_PlanningData_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_PlanningData_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_PlanningData_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_PlanningData_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_PlanningData_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_PlanningData_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActivityType: WebExpand<ts_PlanningData_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_ActivityType: msdyn_incidenttype_Result }>;
  ts_FiscalYear: WebExpand<ts_PlanningData_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
  ts_Operation: WebExpand<ts_PlanningData_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_Operation: ovs_operation_Result }>;
  ts_OperationActivity: WebExpand<ts_PlanningData_Expand, ts_OperationActivity_Select, ts_OperationActivity_Filter, { ts_OperationActivity: ts_OperationActivity_Result }>;
  ts_Site: WebExpand<ts_PlanningData_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Site: msdyn_FunctionalLocation_Result }>;
  ts_Stakeholder: WebExpand<ts_PlanningData_Expand, Account_Select, Account_Filter, { ts_Stakeholder: Account_Result }>;
  ts_Team: WebExpand<ts_PlanningData_Expand, Team_Select, Team_Filter, { ts_Team: Team_Result }>;
  ts_TeamPlanningData: WebExpand<ts_PlanningData_Expand, ts_TeamPlanningData_Select, ts_TeamPlanningData_Filter, { ts_TeamPlanningData: ts_TeamPlanningData_Result }>;
  ts_workorder_planningdata: WebExpand<ts_PlanningData_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_workorder_planningdata: msdyn_workorder_Result[] }>;
}
interface ts_PlanningData_FormattedResult {
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
  ts_operationactivity_formatted?: string;
  ts_operationtype_formatted?: string;
  ts_planningdetail_formatted?: string;
  ts_site_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_team_formatted?: string;
  ts_teamplanningdata_formatted?: string;
}
interface ts_PlanningData_Result extends ts_PlanningData_Base, ts_PlanningData_Relationships {
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
  ts_operationactivity_guid: string | null;
  ts_operationtype_guid: string | null;
  ts_planningdetail_guid: string | null;
  ts_site_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_team_guid: string | null;
  ts_teamplanningdata_guid: string | null;
}
interface ts_PlanningData_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ActivityType: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_Operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_OperationActivity: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
  ts_Site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Team: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ts_TeamPlanningData: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface ts_PlanningData_RelatedMany {
  ts_workorder_planningdata: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_planningdatas: WebMappingRetrieve<ts_PlanningData_Select,ts_PlanningData_Expand,ts_PlanningData_Filter,ts_PlanningData_Fixed,ts_PlanningData_Result,ts_PlanningData_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_planningdatas: WebMappingRelated<ts_PlanningData_RelatedOne,ts_PlanningData_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_planningdatas: WebMappingCUDA<ts_PlanningData_Create,ts_PlanningData_Update,ts_PlanningData_Select>;
}
