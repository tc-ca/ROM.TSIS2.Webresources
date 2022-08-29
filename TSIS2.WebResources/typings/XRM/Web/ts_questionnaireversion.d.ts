interface ts_questionnaireversion_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_questionnaireversion_statecode | null;
  statuscode?: ts_questionnaireversion_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_changecomments?: string | null;
  ts_documentversion?: string | null;
  ts_effectiveenddate?: Date | null;
  ts_effectivestartdate?: Date | null;
  ts_name?: string | null;
  ts_questionnairedefinition?: string | null;
  ts_questionnaireversionid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_questionnaireversion_Relationships {
}
interface ts_questionnaireversion extends ts_questionnaireversion_Base, ts_questionnaireversion_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_ovs_questionnaire_bind$ovs_questionnaires?: string | null;
}
interface ts_questionnaireversion_Create extends ts_questionnaireversion {
}
interface ts_questionnaireversion_Update extends ts_questionnaireversion {
}
interface ts_questionnaireversion_Select {
  createdby_guid: WebAttribute<ts_questionnaireversion_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_questionnaireversion_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_questionnaireversion_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_questionnaireversion_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_questionnaireversion_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_questionnaireversion_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_questionnaireversion_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_questionnaireversion_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_questionnaireversion_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_questionnaireversion_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_questionnaireversion_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_questionnaireversion_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_questionnaireversion_Select, { statecode: ts_questionnaireversion_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_questionnaireversion_Select, { statuscode: ts_questionnaireversion_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_questionnaireversion_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_changecomments: WebAttribute<ts_questionnaireversion_Select, { ts_changecomments: string | null }, {  }>;
  ts_documentversion: WebAttribute<ts_questionnaireversion_Select, { ts_documentversion: string | null }, {  }>;
  ts_effectiveenddate: WebAttribute<ts_questionnaireversion_Select, { ts_effectiveenddate: Date | null }, { ts_effectiveenddate_formatted?: string }>;
  ts_effectivestartdate: WebAttribute<ts_questionnaireversion_Select, { ts_effectivestartdate: Date | null }, { ts_effectivestartdate_formatted?: string }>;
  ts_name: WebAttribute<ts_questionnaireversion_Select, { ts_name: string | null }, {  }>;
  ts_ovs_questionnaire_guid: WebAttribute<ts_questionnaireversion_Select, { ts_ovs_questionnaire_guid: string | null }, { ts_ovs_questionnaire_formatted?: string }>;
  ts_questionnairedefinition: WebAttribute<ts_questionnaireversion_Select, { ts_questionnairedefinition: string | null }, {  }>;
  ts_questionnaireversionid: WebAttribute<ts_questionnaireversion_Select, { ts_questionnaireversionid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_questionnaireversion_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_questionnaireversion_Select, { versionnumber: number | null }, {  }>;
}
interface ts_questionnaireversion_Filter {
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
  statecode: ts_questionnaireversion_statecode;
  statuscode: ts_questionnaireversion_statuscode;
  timezoneruleversionnumber: number;
  ts_changecomments: string;
  ts_documentversion: string;
  ts_effectiveenddate: Date;
  ts_effectivestartdate: Date;
  ts_name: string;
  ts_ovs_questionnaire_guid: XQW.Guid;
  ts_questionnairedefinition: string;
  ts_questionnaireversionid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_questionnaireversion_Expand {
  createdby: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_questionnaireversion_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_questionnaireversion_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ovs_questionnaire: WebExpand<ts_questionnaireversion_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ts_ovs_questionnaire: ovs_Questionnaire_Result }>;
}
interface ts_questionnaireversion_FormattedResult {
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
  ts_effectiveenddate_formatted?: string;
  ts_effectivestartdate_formatted?: string;
  ts_ovs_questionnaire_formatted?: string;
}
interface ts_questionnaireversion_Result extends ts_questionnaireversion_Base, ts_questionnaireversion_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_ovs_questionnaire_guid: string | null;
}
interface ts_questionnaireversion_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ovs_questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
}
interface ts_questionnaireversion_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_questionnaireversions: WebMappingRetrieve<ts_questionnaireversion_Select,ts_questionnaireversion_Expand,ts_questionnaireversion_Filter,ts_questionnaireversion_Fixed,ts_questionnaireversion_Result,ts_questionnaireversion_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_questionnaireversions: WebMappingRelated<ts_questionnaireversion_RelatedOne,ts_questionnaireversion_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_questionnaireversions: WebMappingCUDA<ts_questionnaireversion_Create,ts_questionnaireversion_Update,ts_questionnaireversion_Select>;
}
