interface ts_questionnaireresponse_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_questionnaireresponse_statecode | null;
  statuscode?: ts_questionnaireresponse_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_debug?: string | null;
  ts_name?: string | null;
  ts_questionnaireanswers?: string | null;
  ts_questionnairedefinition?: string | null;
  ts_questionnaireresponseid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_questionnaireresponse_Relationships {
  ts_ActivityType?: msdyn_incidenttype_Result | null;
  ts_WorkOrder?: msdyn_workorder_Result | null;
}
interface ts_questionnaireresponse extends ts_questionnaireresponse_Base, ts_questionnaireresponse_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ActivityType_bind$msdyn_incidenttypes?: string | null;
  ts_WorkOrder_bind$msdyn_workorders?: string | null;
  ts_questionnaire_bind$ovs_questionnaires?: string | null;
}
interface ts_questionnaireresponse_Create extends ts_questionnaireresponse {
}
interface ts_questionnaireresponse_Update extends ts_questionnaireresponse {
}
interface ts_questionnaireresponse_Select {
  createdby_guid: WebAttribute<ts_questionnaireresponse_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_questionnaireresponse_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_questionnaireresponse_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_questionnaireresponse_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_questionnaireresponse_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_questionnaireresponse_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_questionnaireresponse_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_questionnaireresponse_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_questionnaireresponse_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_questionnaireresponse_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_questionnaireresponse_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_questionnaireresponse_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_questionnaireresponse_Select, { statecode: ts_questionnaireresponse_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_questionnaireresponse_Select, { statuscode: ts_questionnaireresponse_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_questionnaireresponse_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytype_guid: WebAttribute<ts_questionnaireresponse_Select, { ts_activitytype_guid: string | null }, { ts_activitytype_formatted?: string }>;
  ts_debug: WebAttribute<ts_questionnaireresponse_Select, { ts_debug: string | null }, {  }>;
  ts_name: WebAttribute<ts_questionnaireresponse_Select, { ts_name: string | null }, {  }>;
  ts_questionnaire_guid: WebAttribute<ts_questionnaireresponse_Select, { ts_questionnaire_guid: string | null }, { ts_questionnaire_formatted?: string }>;
  ts_questionnaireanswers: WebAttribute<ts_questionnaireresponse_Select, { ts_questionnaireanswers: string | null }, {  }>;
  ts_questionnairedefinition: WebAttribute<ts_questionnaireresponse_Select, { ts_questionnairedefinition: string | null }, {  }>;
  ts_questionnaireresponseid: WebAttribute<ts_questionnaireresponse_Select, { ts_questionnaireresponseid: string | null }, {  }>;
  ts_workorder_guid: WebAttribute<ts_questionnaireresponse_Select, { ts_workorder_guid: string | null }, { ts_workorder_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_questionnaireresponse_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_questionnaireresponse_Select, { versionnumber: number | null }, {  }>;
}
interface ts_questionnaireresponse_Filter {
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
  statecode: ts_questionnaireresponse_statecode;
  statuscode: ts_questionnaireresponse_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytype_guid: XQW.Guid;
  ts_debug: string;
  ts_name: string;
  ts_questionnaire_guid: XQW.Guid;
  ts_questionnaireanswers: string;
  ts_questionnairedefinition: string;
  ts_questionnaireresponseid: XQW.Guid;
  ts_workorder_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_questionnaireresponse_Expand {
  createdby: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_questionnaireresponse_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_questionnaireresponse_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActivityType: WebExpand<ts_questionnaireresponse_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_ActivityType: msdyn_incidenttype_Result }>;
  ts_WorkOrder: WebExpand<ts_questionnaireresponse_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_WorkOrder: msdyn_workorder_Result }>;
  ts_questionnaire: WebExpand<ts_questionnaireresponse_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ts_questionnaire: ovs_Questionnaire_Result }>;
}
interface ts_questionnaireresponse_FormattedResult {
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
  ts_questionnaire_formatted?: string;
  ts_workorder_formatted?: string;
}
interface ts_questionnaireresponse_Result extends ts_questionnaireresponse_Base, ts_questionnaireresponse_Relationships {
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
  ts_questionnaire_guid: string | null;
  ts_workorder_guid: string | null;
}
interface ts_questionnaireresponse_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ActivityType: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_WorkOrder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
}
interface ts_questionnaireresponse_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_questionnaireresponses: WebMappingRetrieve<ts_questionnaireresponse_Select,ts_questionnaireresponse_Expand,ts_questionnaireresponse_Filter,ts_questionnaireresponse_Fixed,ts_questionnaireresponse_Result,ts_questionnaireresponse_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_questionnaireresponses: WebMappingRelated<ts_questionnaireresponse_RelatedOne,ts_questionnaireresponse_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_questionnaireresponses: WebMappingCUDA<ts_questionnaireresponse_Create,ts_questionnaireresponse_Update,ts_questionnaireresponse_Select>;
}
