interface ts_WorkOrderServiceTaskWorkspace_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_workorderservicetaskworkspace_statecode | null;
  statuscode?: ts_workorderservicetaskworkspace_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_accesscontrol?: boolean | null;
  ts_actualtime?: Date | null;
  ts_aircraftmodel?: ts_aircraftmodel | null;
  ts_brandname?: ts_aircarrierbrandname | null;
  ts_fromoffline?: boolean | null;
  ts_mandatory?: boolean | null;
  ts_name?: string | null;
  ts_percentcomplete?: number | null;
  ts_questionnairedefinition?: string | null;
  ts_questionnaireresponse?: string | null;
  ts_workorderservicetaskenddate?: Date | null;
  ts_workorderservicetaskstartdate?: Date | null;
  ts_workorderservicetaskworkspaceid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_WorkOrderServiceTaskWorkspace_Relationships {
  ts_AOCOperation?: ovs_operation_Result | null;
  ts_AOCOperationType?: ovs_operationtype_Result | null;
  ts_AOCSite?: msdyn_FunctionalLocation_Result | null;
  ts_AOCStakeholder?: Account_Result | null;
  ts_AccessControlSecurityServices?: Account_Result | null;
  ts_Questionnaire?: ovs_Questionnaire_Result | null;
  ts_TaskType?: msdyn_servicetasktype_Result | null;
  ts_WorkOrder?: msdyn_workorder_Result | null;
  ts_WorkOrderServiceTask?: msdyn_workorderservicetask_Result | null;
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser?: SystemUser_Result[] | null;
  ts_WorkOrderServiceTaskWorkspace_qm_rclegislation_qm_rclegislation?: qm_rclegislation_Result[] | null;
}
interface ts_WorkOrderServiceTaskWorkspace extends ts_WorkOrderServiceTaskWorkspace_Base, ts_WorkOrderServiceTaskWorkspace_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_AOCOperationType_bind$ovs_operationtypes?: string | null;
  ts_AOCOperation_bind$ovs_operations?: string | null;
  ts_AOCSite_bind$msdyn_functionallocations?: string | null;
  ts_AOCStakeholder_bind$accounts?: string | null;
  ts_AccessControlSecurityServices_bind$accounts?: string | null;
  ts_LegislationSourceFilter_bind$qm_tylegislationsources?: string | null;
  ts_LegislationTypeFilter_bind$qm_tylegislationtypes?: string | null;
  ts_Questionnaire_bind$ovs_questionnaires?: string | null;
  ts_TaskType_bind$msdyn_servicetasktypes?: string | null;
  ts_WorkOrderServiceTask_bind$msdyn_workorderservicetasks?: string | null;
  ts_WorkOrder_bind$msdyn_workorders?: string | null;
}
interface ts_WorkOrderServiceTaskWorkspace_Create extends ts_WorkOrderServiceTaskWorkspace {
}
interface ts_WorkOrderServiceTaskWorkspace_Update extends ts_WorkOrderServiceTaskWorkspace {
}
interface ts_WorkOrderServiceTaskWorkspace_Select {
  createdby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { statecode: ts_workorderservicetaskworkspace_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { statuscode: ts_workorderservicetaskworkspace_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_accesscontrol: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_accesscontrol: boolean | null }, {  }>;
  ts_accesscontrolsecurityservices_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_accesscontrolsecurityservices_guid: string | null }, { ts_accesscontrolsecurityservices_formatted?: string }>;
  ts_actualtime: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_actualtime: Date | null }, { ts_actualtime_formatted?: string }>;
  ts_aircraftmodel: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_aircraftmodel: ts_aircraftmodel | null }, { ts_aircraftmodel_formatted?: string }>;
  ts_aocoperation_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_aocoperation_guid: string | null }, { ts_aocoperation_formatted?: string }>;
  ts_aocoperationtype_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_aocoperationtype_guid: string | null }, { ts_aocoperationtype_formatted?: string }>;
  ts_aocsite_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_aocsite_guid: string | null }, { ts_aocsite_formatted?: string }>;
  ts_aocstakeholder_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_aocstakeholder_guid: string | null }, { ts_aocstakeholder_formatted?: string }>;
  ts_brandname: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_brandname: ts_aircarrierbrandname | null }, { ts_brandname_formatted?: string }>;
  ts_fromoffline: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_fromoffline: boolean | null }, {  }>;
  ts_legislationsourcefilter_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_legislationsourcefilter_guid: string | null }, { ts_legislationsourcefilter_formatted?: string }>;
  ts_legislationtypefilter_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_legislationtypefilter_guid: string | null }, { ts_legislationtypefilter_formatted?: string }>;
  ts_mandatory: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_mandatory: boolean | null }, {  }>;
  ts_name: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_name: string | null }, {  }>;
  ts_percentcomplete: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_percentcomplete: number | null }, {  }>;
  ts_questionnaire_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_questionnaire_guid: string | null }, { ts_questionnaire_formatted?: string }>;
  ts_questionnairedefinition: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_questionnairedefinition: string | null }, {  }>;
  ts_questionnaireresponse: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_questionnaireresponse: string | null }, {  }>;
  ts_tasktype_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_tasktype_guid: string | null }, { ts_tasktype_formatted?: string }>;
  ts_workorder_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorder_guid: string | null }, { ts_workorder_formatted?: string }>;
  ts_workorderservicetask_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetask_guid: string | null }, { ts_workorderservicetask_formatted?: string }>;
  ts_workorderservicetaskenddate: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetaskenddate: Date | null }, { ts_workorderservicetaskenddate_formatted?: string }>;
  ts_workorderservicetaskstartdate: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetaskstartdate: Date | null }, { ts_workorderservicetaskstartdate_formatted?: string }>;
  ts_workorderservicetaskworkspaceid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetaskworkspaceid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { versionnumber: number | null }, {  }>;
}
interface ts_WorkOrderServiceTaskWorkspace_Filter {
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
  statecode: ts_workorderservicetaskworkspace_statecode;
  statuscode: ts_workorderservicetaskworkspace_statuscode;
  timezoneruleversionnumber: number;
  ts_accesscontrol: boolean;
  ts_accesscontrolsecurityservices_guid: XQW.Guid;
  ts_actualtime: Date;
  ts_aircraftmodel: ts_aircraftmodel;
  ts_aocoperation_guid: XQW.Guid;
  ts_aocoperationtype_guid: XQW.Guid;
  ts_aocsite_guid: XQW.Guid;
  ts_aocstakeholder_guid: XQW.Guid;
  ts_brandname: ts_aircarrierbrandname;
  ts_fromoffline: boolean;
  ts_legislationsourcefilter_guid: XQW.Guid;
  ts_legislationtypefilter_guid: XQW.Guid;
  ts_mandatory: boolean;
  ts_name: string;
  ts_percentcomplete: number;
  ts_questionnaire_guid: XQW.Guid;
  ts_questionnairedefinition: string;
  ts_questionnaireresponse: string;
  ts_tasktype_guid: XQW.Guid;
  ts_workorder_guid: XQW.Guid;
  ts_workorderservicetask_guid: XQW.Guid;
  ts_workorderservicetaskenddate: Date;
  ts_workorderservicetaskstartdate: Date;
  ts_workorderservicetaskworkspaceid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_WorkOrderServiceTaskWorkspace_Expand {
  createdby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_AOCOperation: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_AOCOperation: ovs_operation_Result }>;
  ts_AOCOperationType: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, ovs_operationtype_Select, ovs_operationtype_Filter, { ts_AOCOperationType: ovs_operationtype_Result }>;
  ts_AOCSite: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_AOCSite: msdyn_FunctionalLocation_Result }>;
  ts_AOCStakeholder: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, Account_Select, Account_Filter, { ts_AOCStakeholder: Account_Result }>;
  ts_AccessControlSecurityServices: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, Account_Select, Account_Filter, { ts_AccessControlSecurityServices: Account_Result }>;
  ts_Questionnaire: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ts_Questionnaire: ovs_Questionnaire_Result }>;
  ts_TaskType: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { ts_TaskType: msdyn_servicetasktype_Result }>;
  ts_WorkOrder: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_WorkOrder: msdyn_workorder_Result }>;
  ts_WorkOrderServiceTask: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_WorkOrderServiceTask: msdyn_workorderservicetask_Result }>;
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: SystemUser_Result[] }>;
  ts_WorkOrderServiceTaskWorkspace_qm_rclegislation_qm_rclegislation: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { ts_WorkOrderServiceTaskWorkspace_qm_rclegislation_qm_rclegislation: qm_rclegislation_Result[] }>;
}
interface ts_WorkOrderServiceTaskWorkspace_FormattedResult {
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
  ts_accesscontrolsecurityservices_formatted?: string;
  ts_actualtime_formatted?: string;
  ts_aircraftmodel_formatted?: string;
  ts_aocoperation_formatted?: string;
  ts_aocoperationtype_formatted?: string;
  ts_aocsite_formatted?: string;
  ts_aocstakeholder_formatted?: string;
  ts_brandname_formatted?: string;
  ts_legislationsourcefilter_formatted?: string;
  ts_legislationtypefilter_formatted?: string;
  ts_questionnaire_formatted?: string;
  ts_tasktype_formatted?: string;
  ts_workorder_formatted?: string;
  ts_workorderservicetask_formatted?: string;
  ts_workorderservicetaskenddate_formatted?: string;
  ts_workorderservicetaskstartdate_formatted?: string;
}
interface ts_WorkOrderServiceTaskWorkspace_Result extends ts_WorkOrderServiceTaskWorkspace_Base, ts_WorkOrderServiceTaskWorkspace_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_accesscontrolsecurityservices_guid: string | null;
  ts_aocoperation_guid: string | null;
  ts_aocoperationtype_guid: string | null;
  ts_aocsite_guid: string | null;
  ts_aocstakeholder_guid: string | null;
  ts_legislationsourcefilter_guid: string | null;
  ts_legislationtypefilter_guid: string | null;
  ts_questionnaire_guid: string | null;
  ts_tasktype_guid: string | null;
  ts_workorder_guid: string | null;
  ts_workorderservicetask_guid: string | null;
}
interface ts_WorkOrderServiceTaskWorkspace_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_AOCOperation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_AOCOperationType: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
  ts_AOCSite: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_AOCStakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_AccessControlSecurityServices: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
  ts_TaskType: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  ts_WorkOrder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_WorkOrderServiceTask: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface ts_WorkOrderServiceTaskWorkspace_RelatedMany {
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_WorkOrderServiceTaskWorkspace_qm_rclegislation_qm_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_workorderservicetaskworkspaces: WebMappingRetrieve<ts_WorkOrderServiceTaskWorkspace_Select,ts_WorkOrderServiceTaskWorkspace_Expand,ts_WorkOrderServiceTaskWorkspace_Filter,ts_WorkOrderServiceTaskWorkspace_Fixed,ts_WorkOrderServiceTaskWorkspace_Result,ts_WorkOrderServiceTaskWorkspace_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_workorderservicetaskworkspaces: WebMappingRelated<ts_WorkOrderServiceTaskWorkspace_RelatedOne,ts_WorkOrderServiceTaskWorkspace_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_workorderservicetaskworkspaces: WebMappingCUDA<ts_WorkOrderServiceTaskWorkspace_Create,ts_WorkOrderServiceTaskWorkspace_Update,ts_WorkOrderServiceTaskWorkspace_Select>;
}
