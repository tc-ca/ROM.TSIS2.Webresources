interface ovs_Questionnaire_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_description?: string | null;
  ovs_effectivedate?: Date | null;
  ovs_name?: string | null;
  ovs_publishedon?: Date | null;
  ovs_questionnairedefinition?: string | null;
  ovs_questionnaireid?: string | null;
  ovs_version?: string | null;
  statecode?: ovs_questionnaire_statecode | null;
  statuscode?: ovs_questionnaire_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_numberofversions?: number | null;
  ts_numberofversions_date?: Date | null;
  ts_numberofversions_state?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_Questionnaire_Relationships {
  ovs_ServiceTask_Questionnaire?: msdyn_workorderservicetask_Result[] | null;
  ovs_incidenttypeservicetask_Questionnaire?: msdyn_incidenttypeservicetask_Result[] | null;
  ovs_msdyn_servicetasktype_Questionnaire_ovs_Q?: msdyn_servicetasktype_Result[] | null;
  ts_ovs_questionnaire_ovs_questionnaire?: ts_questionnaireversion_Result[] | null;
  ts_questionnaireresponse_questionnaire_ovs_q?: ts_questionnaireresponse_Result[] | null;
  ts_workorderservicetaskworkspace_Questionnaire_ovs_questionnaire?: ts_WorkOrderServiceTaskWorkspace_Result[] | null;
}
interface ovs_Questionnaire extends ovs_Questionnaire_Base, ovs_Questionnaire_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_Questionnaire_Create extends ovs_Questionnaire {
}
interface ovs_Questionnaire_Update extends ovs_Questionnaire {
}
interface ovs_Questionnaire_Select {
  createdby_guid: WebAttribute<ovs_Questionnaire_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_Questionnaire_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_Questionnaire_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_Questionnaire_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_Questionnaire_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_Questionnaire_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_Questionnaire_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_Questionnaire_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_description: WebAttribute<ovs_Questionnaire_Select, { ovs_description: string | null }, {  }>;
  ovs_effectivedate: WebAttribute<ovs_Questionnaire_Select, { ovs_effectivedate: Date | null }, { ovs_effectivedate_formatted?: string }>;
  ovs_name: WebAttribute<ovs_Questionnaire_Select, { ovs_name: string | null }, {  }>;
  ovs_publishedon: WebAttribute<ovs_Questionnaire_Select, { ovs_publishedon: Date | null }, { ovs_publishedon_formatted?: string }>;
  ovs_questionnairedefinition: WebAttribute<ovs_Questionnaire_Select, { ovs_questionnairedefinition: string | null }, {  }>;
  ovs_questionnaireid: WebAttribute<ovs_Questionnaire_Select, { ovs_questionnaireid: string | null }, {  }>;
  ovs_version: WebAttribute<ovs_Questionnaire_Select, { ovs_version: string | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_Questionnaire_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_Questionnaire_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_Questionnaire_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_Questionnaire_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_Questionnaire_Select, { statecode: ovs_questionnaire_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_Questionnaire_Select, { statuscode: ovs_questionnaire_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_Questionnaire_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_numberofversions: WebAttribute<ovs_Questionnaire_Select, { ts_numberofversions: number | null }, {  }>;
  ts_numberofversions_date: WebAttribute<ovs_Questionnaire_Select, { ts_numberofversions_date: Date | null }, { ts_numberofversions_date_formatted?: string }>;
  ts_numberofversions_state: WebAttribute<ovs_Questionnaire_Select, { ts_numberofversions_state: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_Questionnaire_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_Questionnaire_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_Questionnaire_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_description: string;
  ovs_effectivedate: Date;
  ovs_name: string;
  ovs_publishedon: Date;
  ovs_questionnairedefinition: string;
  ovs_questionnaireid: XQW.Guid;
  ovs_version: string;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_questionnaire_statecode;
  statuscode: ovs_questionnaire_statuscode;
  timezoneruleversionnumber: number;
  ts_numberofversions: number;
  ts_numberofversions_date: Date;
  ts_numberofversions_state: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_Questionnaire_Expand {
  createdby: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_ServiceTask_Questionnaire: WebExpand<ovs_Questionnaire_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ovs_ServiceTask_Questionnaire: msdyn_workorderservicetask_Result[] }>;
  ovs_incidenttypeservicetask_Questionnaire: WebExpand<ovs_Questionnaire_Expand, msdyn_incidenttypeservicetask_Select, msdyn_incidenttypeservicetask_Filter, { ovs_incidenttypeservicetask_Questionnaire: msdyn_incidenttypeservicetask_Result[] }>;
  ovs_msdyn_servicetasktype_Questionnaire_ovs_Q: WebExpand<ovs_Questionnaire_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { ovs_msdyn_servicetasktype_Questionnaire_ovs_Q: msdyn_servicetasktype_Result[] }>;
  ownerid: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_Questionnaire_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_Questionnaire_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ovs_questionnaire_ovs_questionnaire: WebExpand<ovs_Questionnaire_Expand, ts_questionnaireversion_Select, ts_questionnaireversion_Filter, { ts_ovs_questionnaire_ovs_questionnaire: ts_questionnaireversion_Result[] }>;
  ts_questionnaireresponse_questionnaire_ovs_q: WebExpand<ovs_Questionnaire_Expand, ts_questionnaireresponse_Select, ts_questionnaireresponse_Filter, { ts_questionnaireresponse_questionnaire_ovs_q: ts_questionnaireresponse_Result[] }>;
  ts_workorderservicetaskworkspace_Questionnaire_ovs_questionnaire: WebExpand<ovs_Questionnaire_Expand, ts_WorkOrderServiceTaskWorkspace_Select, ts_WorkOrderServiceTaskWorkspace_Filter, { ts_workorderservicetaskworkspace_Questionnaire_ovs_questionnaire: ts_WorkOrderServiceTaskWorkspace_Result[] }>;
}
interface ovs_Questionnaire_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_effectivedate_formatted?: string;
  ovs_publishedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_numberofversions_date_formatted?: string;
}
interface ovs_Questionnaire_Result extends ovs_Questionnaire_Base, ovs_Questionnaire_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface ovs_Questionnaire_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_Questionnaire_RelatedMany {
  ovs_ServiceTask_Questionnaire: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  ovs_incidenttypeservicetask_Questionnaire: WebMappingRetrieve<msdyn_incidenttypeservicetask_Select,msdyn_incidenttypeservicetask_Expand,msdyn_incidenttypeservicetask_Filter,msdyn_incidenttypeservicetask_Fixed,msdyn_incidenttypeservicetask_Result,msdyn_incidenttypeservicetask_FormattedResult>;
  ovs_msdyn_servicetasktype_Questionnaire_ovs_Q: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  ts_ovs_questionnaire_ovs_questionnaire: WebMappingRetrieve<ts_questionnaireversion_Select,ts_questionnaireversion_Expand,ts_questionnaireversion_Filter,ts_questionnaireversion_Fixed,ts_questionnaireversion_Result,ts_questionnaireversion_FormattedResult>;
  ts_questionnaireresponse_questionnaire_ovs_q: WebMappingRetrieve<ts_questionnaireresponse_Select,ts_questionnaireresponse_Expand,ts_questionnaireresponse_Filter,ts_questionnaireresponse_Fixed,ts_questionnaireresponse_Result,ts_questionnaireresponse_FormattedResult>;
  ts_workorderservicetaskworkspace_Questionnaire_ovs_questionnaire: WebMappingRetrieve<ts_WorkOrderServiceTaskWorkspace_Select,ts_WorkOrderServiceTaskWorkspace_Expand,ts_WorkOrderServiceTaskWorkspace_Filter,ts_WorkOrderServiceTaskWorkspace_Fixed,ts_WorkOrderServiceTaskWorkspace_Result,ts_WorkOrderServiceTaskWorkspace_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_questionnaires: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_questionnaires: WebMappingRelated<ovs_Questionnaire_RelatedOne,ovs_Questionnaire_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_questionnaires: WebMappingCUDA<ovs_Questionnaire_Create,ovs_Questionnaire_Update,ovs_Questionnaire_Select>;
}
