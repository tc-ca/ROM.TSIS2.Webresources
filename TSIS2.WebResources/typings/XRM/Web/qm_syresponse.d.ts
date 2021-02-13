interface qm_syresponse_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_isproblemind?: boolean | null;
  qm_issafetyconcern?: boolean | null;
  qm_name?: string | null;
  qm_ordernbr?: number | null;
  qm_questionresponsetypecd?: qm_questionresponsetypecd | null;
  qm_responseetxt?: string | null;
  qm_responseftxt?: string | null;
  qm_syresponseid?: string | null;
  statecode?: qm_syresponse_statecode | null;
  statuscode?: qm_syresponse_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_syresponse_Relationships {
  qm_SYQuestionId?: qm_syquestion_Result | null;
  qm_syresponse_rclegislation?: qm_rclegislation_Result[] | null;
}
interface qm_syresponse extends qm_syresponse_Base, qm_syresponse_Relationships {
  qm_SYQuestionId_bind$qm_syquestions?: string | null;
}
interface qm_syresponse_Create extends qm_syresponse {
}
interface qm_syresponse_Update extends qm_syresponse {
}
interface qm_syresponse_Select {
  createdby_guid: WebAttribute<qm_syresponse_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_syresponse_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_syresponse_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_syresponse_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_syresponse_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_syresponse_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_syresponse_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_syresponse_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_syresponse_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_isproblemind: WebAttribute<qm_syresponse_Select, { qm_isproblemind: boolean | null }, {  }>;
  qm_issafetyconcern: WebAttribute<qm_syresponse_Select, { qm_issafetyconcern: boolean | null }, {  }>;
  qm_name: WebAttribute<qm_syresponse_Select, { qm_name: string | null }, {  }>;
  qm_ordernbr: WebAttribute<qm_syresponse_Select, { qm_ordernbr: number | null }, {  }>;
  qm_questionresponsetypecd: WebAttribute<qm_syresponse_Select, { qm_questionresponsetypecd: qm_questionresponsetypecd | null }, { qm_questionresponsetypecd_formatted?: string }>;
  qm_responseetxt: WebAttribute<qm_syresponse_Select, { qm_responseetxt: string | null }, {  }>;
  qm_responseftxt: WebAttribute<qm_syresponse_Select, { qm_responseftxt: string | null }, {  }>;
  qm_syquestionid_guid: WebAttribute<qm_syresponse_Select, { qm_syquestionid_guid: string | null }, { qm_syquestionid_formatted?: string }>;
  qm_syresponseid: WebAttribute<qm_syresponse_Select, { qm_syresponseid: string | null }, {  }>;
  statecode: WebAttribute<qm_syresponse_Select, { statecode: qm_syresponse_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_syresponse_Select, { statuscode: qm_syresponse_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_syresponse_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_syresponse_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_syresponse_Select, { versionnumber: number | null }, {  }>;
}
interface qm_syresponse_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_isproblemind: boolean;
  qm_issafetyconcern: boolean;
  qm_name: string;
  qm_ordernbr: number;
  qm_questionresponsetypecd: qm_questionresponsetypecd;
  qm_responseetxt: string;
  qm_responseftxt: string;
  qm_syquestionid_guid: XQW.Guid;
  qm_syresponseid: XQW.Guid;
  statecode: qm_syresponse_statecode;
  statuscode: qm_syresponse_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_syresponse_Expand {
  createdby: WebExpand<qm_syresponse_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_syresponse_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_syresponse_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_syresponse_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_SYQuestionId: WebExpand<qm_syresponse_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_SYQuestionId: qm_syquestion_Result }>;
  qm_syresponse_rclegislation: WebExpand<qm_syresponse_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_syresponse_rclegislation: qm_rclegislation_Result[] }>;
}
interface qm_syresponse_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_questionresponsetypecd_formatted?: string;
  qm_syquestionid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_syresponse_Result extends qm_syresponse_Base, qm_syresponse_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_syquestionid_guid: string | null;
}
interface qm_syresponse_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_SYQuestionId: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
}
interface qm_syresponse_RelatedMany {
  qm_syresponse_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_syresponses: WebMappingRetrieve<qm_syresponse_Select,qm_syresponse_Expand,qm_syresponse_Filter,qm_syresponse_Fixed,qm_syresponse_Result,qm_syresponse_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_syresponses: WebMappingRelated<qm_syresponse_RelatedOne,qm_syresponse_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_syresponses: WebMappingCUDA<qm_syresponse_Create,qm_syresponse_Update,qm_syresponse_Select>;
}
