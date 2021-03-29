interface qm_sytemplate_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_name?: string | null;
  qm_sytemplateid?: string | null;
  qm_templatedescetxt?: string | null;
  qm_templatedescftxt?: string | null;
  qm_templateenm?: string | null;
  qm_templatefnm?: string | null;
  qm_templatejsontxt?: string | null;
  statecode?: qm_sytemplate_statecode | null;
  statuscode?: qm_sytemplate_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_sytemplate_Relationships {
  ovs_msdyn_servicetasktype_QuestionnaireTempla?: msdyn_servicetasktype_Result[] | null;
}
interface qm_sytemplate extends qm_sytemplate_Base, qm_sytemplate_Relationships {
}
interface qm_sytemplate_Create extends qm_sytemplate {
}
interface qm_sytemplate_Update extends qm_sytemplate {
}
interface qm_sytemplate_Select {
  createdby_guid: WebAttribute<qm_sytemplate_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_sytemplate_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_sytemplate_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_sytemplate_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_sytemplate_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_sytemplate_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_sytemplate_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_sytemplate_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_sytemplate_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_name: WebAttribute<qm_sytemplate_Select, { qm_name: string | null }, {  }>;
  qm_sytemplateid: WebAttribute<qm_sytemplate_Select, { qm_sytemplateid: string | null }, {  }>;
  qm_templatedescetxt: WebAttribute<qm_sytemplate_Select, { qm_templatedescetxt: string | null }, {  }>;
  qm_templatedescftxt: WebAttribute<qm_sytemplate_Select, { qm_templatedescftxt: string | null }, {  }>;
  qm_templateenm: WebAttribute<qm_sytemplate_Select, { qm_templateenm: string | null }, {  }>;
  qm_templatefnm: WebAttribute<qm_sytemplate_Select, { qm_templatefnm: string | null }, {  }>;
  qm_templatejsontxt: WebAttribute<qm_sytemplate_Select, { qm_templatejsontxt: string | null }, {  }>;
  statecode: WebAttribute<qm_sytemplate_Select, { statecode: qm_sytemplate_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_sytemplate_Select, { statuscode: qm_sytemplate_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_sytemplate_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_sytemplate_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_sytemplate_Select, { versionnumber: number | null }, {  }>;
}
interface qm_sytemplate_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_name: string;
  qm_sytemplateid: XQW.Guid;
  qm_templatedescetxt: string;
  qm_templatedescftxt: string;
  qm_templateenm: string;
  qm_templatefnm: string;
  qm_templatejsontxt: string;
  statecode: qm_sytemplate_statecode;
  statuscode: qm_sytemplate_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_sytemplate_Expand {
  createdby: WebExpand<qm_sytemplate_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_sytemplate_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_sytemplate_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_sytemplate_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_msdyn_servicetasktype_QuestionnaireTempla: WebExpand<qm_sytemplate_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { ovs_msdyn_servicetasktype_QuestionnaireTempla: msdyn_servicetasktype_Result[] }>;
}
interface qm_sytemplate_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_sytemplate_Result extends qm_sytemplate_Base, qm_sytemplate_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
}
interface qm_sytemplate_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface qm_sytemplate_RelatedMany {
  ovs_msdyn_servicetasktype_QuestionnaireTempla: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_sytemplates: WebMappingRetrieve<qm_sytemplate_Select,qm_sytemplate_Expand,qm_sytemplate_Filter,qm_sytemplate_Fixed,qm_sytemplate_Result,qm_sytemplate_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_sytemplates: WebMappingRelated<qm_sytemplate_RelatedOne,qm_sytemplate_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_sytemplates: WebMappingCUDA<qm_sytemplate_Create,qm_sytemplate_Update,qm_sytemplate_Select>;
}
