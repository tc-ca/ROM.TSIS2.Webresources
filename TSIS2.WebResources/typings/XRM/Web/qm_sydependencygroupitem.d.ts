interface qm_sydependencygroupitem_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_dependencyvaluetxt?: string | null;
  qm_name?: string | null;
  qm_operatorcd?: qm_operatorcd | null;
  qm_sydependencygroupitemid?: string | null;
  statecode?: qm_sydependencygroupitem_statecode | null;
  statuscode?: qm_sydependencygroupitem_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_sydependencygroupitem_Relationships {
  qm_SYDependencyGroupId?: qm_sydependencygroup_Result | null;
  qm_SYQuestionId?: qm_syquestion_Result | null;
}
interface qm_sydependencygroupitem extends qm_sydependencygroupitem_Base, qm_sydependencygroupitem_Relationships {
  qm_SYDependencyGroupId_bind$qm_sydependencygroups?: string | null;
  qm_SYQuestionId_bind$qm_syquestions?: string | null;
}
interface qm_sydependencygroupitem_Create extends qm_sydependencygroupitem {
}
interface qm_sydependencygroupitem_Update extends qm_sydependencygroupitem {
}
interface qm_sydependencygroupitem_Select {
  createdby_guid: WebAttribute<qm_sydependencygroupitem_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_sydependencygroupitem_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_sydependencygroupitem_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_sydependencygroupitem_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_sydependencygroupitem_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_sydependencygroupitem_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_sydependencygroupitem_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_sydependencygroupitem_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_sydependencygroupitem_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_dependencyvaluetxt: WebAttribute<qm_sydependencygroupitem_Select, { qm_dependencyvaluetxt: string | null }, {  }>;
  qm_name: WebAttribute<qm_sydependencygroupitem_Select, { qm_name: string | null }, {  }>;
  qm_operatorcd: WebAttribute<qm_sydependencygroupitem_Select, { qm_operatorcd: qm_operatorcd | null }, { qm_operatorcd_formatted?: string }>;
  qm_sydependencygroupid_guid: WebAttribute<qm_sydependencygroupitem_Select, { qm_sydependencygroupid_guid: string | null }, { qm_sydependencygroupid_formatted?: string }>;
  qm_sydependencygroupitemid: WebAttribute<qm_sydependencygroupitem_Select, { qm_sydependencygroupitemid: string | null }, {  }>;
  qm_syquestionid_guid: WebAttribute<qm_sydependencygroupitem_Select, { qm_syquestionid_guid: string | null }, { qm_syquestionid_formatted?: string }>;
  statecode: WebAttribute<qm_sydependencygroupitem_Select, { statecode: qm_sydependencygroupitem_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_sydependencygroupitem_Select, { statuscode: qm_sydependencygroupitem_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_sydependencygroupitem_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_sydependencygroupitem_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_sydependencygroupitem_Select, { versionnumber: number | null }, {  }>;
}
interface qm_sydependencygroupitem_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_dependencyvaluetxt: string;
  qm_name: string;
  qm_operatorcd: qm_operatorcd;
  qm_sydependencygroupid_guid: XQW.Guid;
  qm_sydependencygroupitemid: XQW.Guid;
  qm_syquestionid_guid: XQW.Guid;
  statecode: qm_sydependencygroupitem_statecode;
  statuscode: qm_sydependencygroupitem_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_sydependencygroupitem_Expand {
  createdby: WebExpand<qm_sydependencygroupitem_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_sydependencygroupitem_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_sydependencygroupitem_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_sydependencygroupitem_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_SYDependencyGroupId: WebExpand<qm_sydependencygroupitem_Expand, qm_sydependencygroup_Select, qm_sydependencygroup_Filter, { qm_SYDependencyGroupId: qm_sydependencygroup_Result }>;
  qm_SYQuestionId: WebExpand<qm_sydependencygroupitem_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_SYQuestionId: qm_syquestion_Result }>;
}
interface qm_sydependencygroupitem_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_operatorcd_formatted?: string;
  qm_sydependencygroupid_formatted?: string;
  qm_syquestionid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_sydependencygroupitem_Result extends qm_sydependencygroupitem_Base, qm_sydependencygroupitem_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_sydependencygroupid_guid: string | null;
  qm_syquestionid_guid: string | null;
}
interface qm_sydependencygroupitem_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_SYDependencyGroupId: WebMappingRetrieve<qm_sydependencygroup_Select,qm_sydependencygroup_Expand,qm_sydependencygroup_Filter,qm_sydependencygroup_Fixed,qm_sydependencygroup_Result,qm_sydependencygroup_FormattedResult>;
  qm_SYQuestionId: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
}
interface qm_sydependencygroupitem_RelatedMany {
}
interface WebEntitiesRetrieve {
  qm_sydependencygroupitems: WebMappingRetrieve<qm_sydependencygroupitem_Select,qm_sydependencygroupitem_Expand,qm_sydependencygroupitem_Filter,qm_sydependencygroupitem_Fixed,qm_sydependencygroupitem_Result,qm_sydependencygroupitem_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_sydependencygroupitems: WebMappingRelated<qm_sydependencygroupitem_RelatedOne,qm_sydependencygroupitem_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_sydependencygroupitems: WebMappingCUDA<qm_sydependencygroupitem_Create,qm_sydependencygroupitem_Update,qm_sydependencygroupitem_Select>;
}
