interface ts_causefinding_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_causefinding_statecode | null;
  statuscode?: ts_causefinding_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_causefindingid?: string | null;
  ts_causetype?: ts_findingtype | null;
  ts_comments?: string | null;
  ts_name?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_causefinding_Relationships {
  ts_Finding?: ovs_Finding_Result | null;
  ts_Provision?: qm_rclegislation_Result | null;
}
interface ts_causefinding extends ts_causefinding_Base, ts_causefinding_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Finding_bind$ovs_findings?: string | null;
  ts_Provision_bind$qm_rclegislations?: string | null;
}
interface ts_causefinding_Create extends ts_causefinding {
}
interface ts_causefinding_Update extends ts_causefinding {
}
interface ts_causefinding_Select {
  createdby_guid: WebAttribute<ts_causefinding_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_causefinding_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_causefinding_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_causefinding_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_causefinding_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_causefinding_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_causefinding_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_causefinding_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_causefinding_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_causefinding_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_causefinding_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_causefinding_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_causefinding_Select, { statecode: ts_causefinding_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_causefinding_Select, { statuscode: ts_causefinding_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_causefinding_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_causefindingid: WebAttribute<ts_causefinding_Select, { ts_causefindingid: string | null }, {  }>;
  ts_causetype: WebAttribute<ts_causefinding_Select, { ts_causetype: ts_findingtype | null }, { ts_causetype_formatted?: string }>;
  ts_comments: WebAttribute<ts_causefinding_Select, { ts_comments: string | null }, {  }>;
  ts_finding_guid: WebAttribute<ts_causefinding_Select, { ts_finding_guid: string | null }, { ts_finding_formatted?: string }>;
  ts_name: WebAttribute<ts_causefinding_Select, { ts_name: string | null }, {  }>;
  ts_provision_guid: WebAttribute<ts_causefinding_Select, { ts_provision_guid: string | null }, { ts_provision_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_causefinding_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_causefinding_Select, { versionnumber: number | null }, {  }>;
}
interface ts_causefinding_Filter {
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
  statecode: ts_causefinding_statecode;
  statuscode: ts_causefinding_statuscode;
  timezoneruleversionnumber: number;
  ts_causefindingid: XQW.Guid;
  ts_causetype: ts_findingtype;
  ts_comments: string;
  ts_finding_guid: XQW.Guid;
  ts_name: string;
  ts_provision_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_causefinding_Expand {
  createdby: WebExpand<ts_causefinding_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_causefinding_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_causefinding_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_causefinding_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_causefinding_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_causefinding_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_causefinding_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_causefinding_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Finding: WebExpand<ts_causefinding_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_Finding: ovs_Finding_Result }>;
  ts_Provision: WebExpand<ts_causefinding_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { ts_Provision: qm_rclegislation_Result }>;
}
interface ts_causefinding_FormattedResult {
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
  ts_causetype_formatted?: string;
  ts_finding_formatted?: string;
  ts_provision_formatted?: string;
}
interface ts_causefinding_Result extends ts_causefinding_Base, ts_causefinding_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_finding_guid: string | null;
  ts_provision_guid: string | null;
}
interface ts_causefinding_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_Provision: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface ts_causefinding_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_causefindings: WebMappingRetrieve<ts_causefinding_Select,ts_causefinding_Expand,ts_causefinding_Filter,ts_causefinding_Fixed,ts_causefinding_Result,ts_causefinding_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_causefindings: WebMappingRelated<ts_causefinding_RelatedOne,ts_causefinding_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_causefindings: WebMappingCUDA<ts_causefinding_Create,ts_causefinding_Update,ts_causefinding_Select>;
}
