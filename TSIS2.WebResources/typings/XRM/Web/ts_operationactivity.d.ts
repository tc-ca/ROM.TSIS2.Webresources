interface ts_OperationActivity_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_operationactivity_statecode | null;
  statuscode?: ts_operationactivity_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_closedondateoflastworkorder?: Date | null;
  ts_englishname?: string | null;
  ts_frenchname?: string | null;
  ts_name?: string | null;
  ts_operationactivityid?: string | null;
  ts_operationalstatus?: ts_operationalstatus | null;
  ts_plannedstatus?: ts_planningstatus | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_OperationActivity_Relationships {
  ts_Activity?: msdyn_incidenttype_Result | null;
  ts_DueDate?: tc_TCFiscalQuarter_Result | null;
  ts_LastCompletedWO?: tc_TCFiscalQuarter_Result | null;
  ts_NextPlannedWO?: tc_TCFiscalQuarter_Result | null;
  ts_Operation?: ovs_operation_Result | null;
  ts_Site?: msdyn_FunctionalLocation_Result | null;
  ts_Site_Site?: ts_site_Result | null;
  ts_Stakeholder?: Account_Result | null;
  ts_ts_planningdata_OperationActivity_ts_oper?: ts_PlanningData_Result[] | null;
}
interface ts_OperationActivity extends ts_OperationActivity_Base, ts_OperationActivity_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Activity_bind$msdyn_incidenttypes?: string | null;
  ts_DueDate_bind$tc_tcfiscalquarters?: string | null;
  ts_LastCompletedWO_bind$tc_tcfiscalquarters?: string | null;
  ts_NextPlannedWO_bind$tc_tcfiscalquarters?: string | null;
  ts_OperationType_bind$ovs_operationtypes?: string | null;
  ts_Operation_bind$ovs_operations?: string | null;
  ts_RecurrenceFrequency_bind$ts_recurrencefrequencieses?: string | null;
  ts_Site_Site_bind$ts_sites?: string | null;
  ts_Site_bind$msdyn_functionallocations?: string | null;
  ts_Stakeholder_bind$accounts?: string | null;
}
interface ts_OperationActivity_Create extends ts_OperationActivity {
}
interface ts_OperationActivity_Update extends ts_OperationActivity {
}
interface ts_OperationActivity_Select {
  createdby_guid: WebAttribute<ts_OperationActivity_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_OperationActivity_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_OperationActivity_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_OperationActivity_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_OperationActivity_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_OperationActivity_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_OperationActivity_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_OperationActivity_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_OperationActivity_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_OperationActivity_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_OperationActivity_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_OperationActivity_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_OperationActivity_Select, { statecode: ts_operationactivity_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_OperationActivity_Select, { statuscode: ts_operationactivity_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_OperationActivity_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activity_guid: WebAttribute<ts_OperationActivity_Select, { ts_activity_guid: string | null }, { ts_activity_formatted?: string }>;
  ts_closedondateoflastworkorder: WebAttribute<ts_OperationActivity_Select, { ts_closedondateoflastworkorder: Date | null }, { ts_closedondateoflastworkorder_formatted?: string }>;
  ts_duedate_guid: WebAttribute<ts_OperationActivity_Select, { ts_duedate_guid: string | null }, { ts_duedate_formatted?: string }>;
  ts_englishname: WebAttribute<ts_OperationActivity_Select, { ts_englishname: string | null }, {  }>;
  ts_frenchname: WebAttribute<ts_OperationActivity_Select, { ts_frenchname: string | null }, {  }>;
  ts_lastcompletedwo_guid: WebAttribute<ts_OperationActivity_Select, { ts_lastcompletedwo_guid: string | null }, { ts_lastcompletedwo_formatted?: string }>;
  ts_name: WebAttribute<ts_OperationActivity_Select, { ts_name: string | null }, {  }>;
  ts_nextplannedwo_guid: WebAttribute<ts_OperationActivity_Select, { ts_nextplannedwo_guid: string | null }, { ts_nextplannedwo_formatted?: string }>;
  ts_operation_guid: WebAttribute<ts_OperationActivity_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationactivityid: WebAttribute<ts_OperationActivity_Select, { ts_operationactivityid: string | null }, {  }>;
  ts_operationalstatus: WebAttribute<ts_OperationActivity_Select, { ts_operationalstatus: ts_operationalstatus | null }, { ts_operationalstatus_formatted?: string }>;
  ts_operationtype_guid: WebAttribute<ts_OperationActivity_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_plannedstatus: WebAttribute<ts_OperationActivity_Select, { ts_plannedstatus: ts_planningstatus | null }, { ts_plannedstatus_formatted?: string }>;
  ts_recurrencefrequency_guid: WebAttribute<ts_OperationActivity_Select, { ts_recurrencefrequency_guid: string | null }, { ts_recurrencefrequency_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_OperationActivity_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_site_site_guid: WebAttribute<ts_OperationActivity_Select, { ts_site_site_guid: string | null }, { ts_site_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_OperationActivity_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_OperationActivity_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_OperationActivity_Select, { versionnumber: number | null }, {  }>;
}
interface ts_OperationActivity_Filter {
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
  statecode: ts_operationactivity_statecode;
  statuscode: ts_operationactivity_statuscode;
  timezoneruleversionnumber: number;
  ts_activity_guid: XQW.Guid;
  ts_closedondateoflastworkorder: Date;
  ts_duedate_guid: XQW.Guid;
  ts_englishname: string;
  ts_frenchname: string;
  ts_lastcompletedwo_guid: XQW.Guid;
  ts_name: string;
  ts_nextplannedwo_guid: XQW.Guid;
  ts_operation_guid: XQW.Guid;
  ts_operationactivityid: XQW.Guid;
  ts_operationalstatus: ts_operationalstatus;
  ts_operationtype_guid: XQW.Guid;
  ts_plannedstatus: ts_planningstatus;
  ts_recurrencefrequency_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_site_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_OperationActivity_Expand {
  createdby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_OperationActivity_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_OperationActivity_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Activity: WebExpand<ts_OperationActivity_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_Activity: msdyn_incidenttype_Result }>;
  ts_DueDate: WebExpand<ts_OperationActivity_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { ts_DueDate: tc_TCFiscalQuarter_Result }>;
  ts_LastCompletedWO: WebExpand<ts_OperationActivity_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { ts_LastCompletedWO: tc_TCFiscalQuarter_Result }>;
  ts_NextPlannedWO: WebExpand<ts_OperationActivity_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { ts_NextPlannedWO: tc_TCFiscalQuarter_Result }>;
  ts_Operation: WebExpand<ts_OperationActivity_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_Operation: ovs_operation_Result }>;
  ts_Site: WebExpand<ts_OperationActivity_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Site: msdyn_FunctionalLocation_Result }>;
  ts_Site_Site: WebExpand<ts_OperationActivity_Expand, ts_site_Select, ts_site_Filter, { ts_Site_Site: ts_site_Result }>;
  ts_Stakeholder: WebExpand<ts_OperationActivity_Expand, Account_Select, Account_Filter, { ts_Stakeholder: Account_Result }>;
  ts_ts_planningdata_OperationActivity_ts_oper: WebExpand<ts_OperationActivity_Expand, ts_PlanningData_Select, ts_PlanningData_Filter, { ts_ts_planningdata_OperationActivity_ts_oper: ts_PlanningData_Result[] }>;
}
interface ts_OperationActivity_FormattedResult {
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
  ts_activity_formatted?: string;
  ts_closedondateoflastworkorder_formatted?: string;
  ts_duedate_formatted?: string;
  ts_lastcompletedwo_formatted?: string;
  ts_nextplannedwo_formatted?: string;
  ts_operation_formatted?: string;
  ts_operationalstatus_formatted?: string;
  ts_operationtype_formatted?: string;
  ts_plannedstatus_formatted?: string;
  ts_recurrencefrequency_formatted?: string;
  ts_site_formatted?: string;
  ts_site_site_formatted?: string;
  ts_stakeholder_formatted?: string;
}
interface ts_OperationActivity_Result extends ts_OperationActivity_Base, ts_OperationActivity_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_activity_guid: string | null;
  ts_duedate_guid: string | null;
  ts_lastcompletedwo_guid: string | null;
  ts_nextplannedwo_guid: string | null;
  ts_operation_guid: string | null;
  ts_operationtype_guid: string | null;
  ts_recurrencefrequency_guid: string | null;
  ts_site_guid: string | null;
  ts_site_site_guid: string | null;
  ts_stakeholder_guid: string | null;
}
interface ts_OperationActivity_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Activity: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_DueDate: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  ts_LastCompletedWO: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  ts_NextPlannedWO: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  ts_Operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_Site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Site_Site: WebMappingRetrieve<ts_site_Select,ts_site_Expand,ts_site_Filter,ts_site_Fixed,ts_site_Result,ts_site_FormattedResult>;
  ts_Stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_OperationActivity_RelatedMany {
  ts_ts_planningdata_OperationActivity_ts_oper: WebMappingRetrieve<ts_PlanningData_Select,ts_PlanningData_Expand,ts_PlanningData_Filter,ts_PlanningData_Fixed,ts_PlanningData_Result,ts_PlanningData_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_operationactivities: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_operationactivities: WebMappingRelated<ts_OperationActivity_RelatedOne,ts_OperationActivity_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_operationactivities: WebMappingCUDA<ts_OperationActivity_Create,ts_OperationActivity_Update,ts_OperationActivity_Select>;
}
