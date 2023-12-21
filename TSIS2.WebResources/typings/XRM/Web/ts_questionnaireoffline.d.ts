interface ts_questionnaireoffline_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_questionnaireoffline_statecode | null;
  statuscode?: ts_questionnaireoffline_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_questionnairedefinition?: string | null;
  ts_questionnaireofflineid?: string | null;
  ts_questionnaireresponse?: string | null;
  ts_startdate?: Date | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_questionnaireoffline_Relationships {
}
interface ts_questionnaireoffline extends ts_questionnaireoffline_Base, ts_questionnaireoffline_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_questionnaire_bind$ovs_questionnaires?: string | null;
}
interface ts_questionnaireoffline_Create extends ts_questionnaireoffline {
}
interface ts_questionnaireoffline_Update extends ts_questionnaireoffline {
}
interface ts_questionnaireoffline_Select {
  createdby_guid: WebAttribute<ts_questionnaireoffline_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_questionnaireoffline_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_questionnaireoffline_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_questionnaireoffline_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_questionnaireoffline_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_questionnaireoffline_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_questionnaireoffline_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_questionnaireoffline_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_questionnaireoffline_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_questionnaireoffline_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_questionnaireoffline_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_questionnaireoffline_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_questionnaireoffline_Select, { statecode: ts_questionnaireoffline_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_questionnaireoffline_Select, { statuscode: ts_questionnaireoffline_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_questionnaireoffline_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_name: WebAttribute<ts_questionnaireoffline_Select, { ts_name: string | null }, {  }>;
  ts_questionnaire_guid: WebAttribute<ts_questionnaireoffline_Select, { ts_questionnaire_guid: string | null }, { ts_questionnaire_formatted?: string }>;
  ts_questionnairedefinition: WebAttribute<ts_questionnaireoffline_Select, { ts_questionnairedefinition: string | null }, {  }>;
  ts_questionnaireofflineid: WebAttribute<ts_questionnaireoffline_Select, { ts_questionnaireofflineid: string | null }, {  }>;
  ts_questionnaireresponse: WebAttribute<ts_questionnaireoffline_Select, { ts_questionnaireresponse: string | null }, {  }>;
  ts_startdate: WebAttribute<ts_questionnaireoffline_Select, { ts_startdate: Date | null }, { ts_startdate_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_questionnaireoffline_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_questionnaireoffline_Select, { versionnumber: number | null }, {  }>;
}
interface ts_questionnaireoffline_Filter {
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
  statecode: ts_questionnaireoffline_statecode;
  statuscode: ts_questionnaireoffline_statuscode;
  timezoneruleversionnumber: number;
  ts_name: string;
  ts_questionnaire_guid: XQW.Guid;
  ts_questionnairedefinition: string;
  ts_questionnaireofflineid: XQW.Guid;
  ts_questionnaireresponse: string;
  ts_startdate: Date;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_questionnaireoffline_Expand {
  createdby: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_questionnaireoffline_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_questionnaireoffline_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_questionnaire: WebExpand<ts_questionnaireoffline_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ts_questionnaire: ovs_Questionnaire_Result }>;
}
interface ts_questionnaireoffline_FormattedResult {
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
  ts_questionnaire_formatted?: string;
  ts_startdate_formatted?: string;
}
interface ts_questionnaireoffline_Result extends ts_questionnaireoffline_Base, ts_questionnaireoffline_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_questionnaire_guid: string | null;
}
interface ts_questionnaireoffline_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
}
interface ts_questionnaireoffline_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_questionnaireofflines: WebMappingRetrieve<ts_questionnaireoffline_Select,ts_questionnaireoffline_Expand,ts_questionnaireoffline_Filter,ts_questionnaireoffline_Fixed,ts_questionnaireoffline_Result,ts_questionnaireoffline_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_questionnaireofflines: WebMappingRelated<ts_questionnaireoffline_RelatedOne,ts_questionnaireoffline_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_questionnaireofflines: WebMappingCUDA<ts_questionnaireoffline_Create,ts_questionnaireoffline_Update,ts_questionnaireoffline_Select>;
}
