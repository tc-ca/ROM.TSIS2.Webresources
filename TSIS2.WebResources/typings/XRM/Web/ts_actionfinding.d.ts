interface ts_ActionFinding_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_actionfinding_statecode | null;
  statuscode?: ts_actionfinding_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_actionfindingid?: string | null;
  ts_name?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_ActionFinding_Relationships {
  ts_ovs_Finding?: ovs_Finding_Result | null;
}
interface ts_ActionFinding extends ts_ActionFinding_Base, ts_ActionFinding_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_action_bind$ts_actions?: string | null;
  ts_ovs_Finding_bind$ovs_findings?: string | null;
}
interface ts_ActionFinding_Create extends ts_ActionFinding {
}
interface ts_ActionFinding_Update extends ts_ActionFinding {
}
interface ts_ActionFinding_Select {
  createdby_guid: WebAttribute<ts_ActionFinding_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_ActionFinding_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_ActionFinding_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_ActionFinding_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_ActionFinding_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_ActionFinding_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_ActionFinding_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_ActionFinding_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_ActionFinding_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_ActionFinding_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_ActionFinding_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_ActionFinding_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_ActionFinding_Select, { statecode: ts_actionfinding_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_ActionFinding_Select, { statuscode: ts_actionfinding_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_ActionFinding_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_action_guid: WebAttribute<ts_ActionFinding_Select, { ts_action_guid: string | null }, { ts_action_formatted?: string }>;
  ts_actionfindingid: WebAttribute<ts_ActionFinding_Select, { ts_actionfindingid: string | null }, {  }>;
  ts_name: WebAttribute<ts_ActionFinding_Select, { ts_name: string | null }, {  }>;
  ts_ovs_finding_guid: WebAttribute<ts_ActionFinding_Select, { ts_ovs_finding_guid: string | null }, { ts_ovs_finding_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_ActionFinding_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_ActionFinding_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ActionFinding_Filter {
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
  statecode: ts_actionfinding_statecode;
  statuscode: ts_actionfinding_statuscode;
  timezoneruleversionnumber: number;
  ts_action_guid: XQW.Guid;
  ts_actionfindingid: XQW.Guid;
  ts_name: string;
  ts_ovs_finding_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_ActionFinding_Expand {
  createdby: WebExpand<ts_ActionFinding_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_ActionFinding_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_ActionFinding_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_ActionFinding_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_ActionFinding_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_ActionFinding_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_ActionFinding_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ovs_Finding: WebExpand<ts_ActionFinding_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding: ovs_Finding_Result }>;
}
interface ts_ActionFinding_FormattedResult {
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
  ts_action_formatted?: string;
  ts_ovs_finding_formatted?: string;
}
interface ts_ActionFinding_Result extends ts_ActionFinding_Base, ts_ActionFinding_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_action_guid: string | null;
  ts_ovs_finding_guid: string | null;
}
interface ts_ActionFinding_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ovs_Finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
}
interface ts_ActionFinding_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_actionfindings: WebMappingRetrieve<ts_ActionFinding_Select,ts_ActionFinding_Expand,ts_ActionFinding_Filter,ts_ActionFinding_Fixed,ts_ActionFinding_Result,ts_ActionFinding_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_actionfindings: WebMappingRelated<ts_ActionFinding_RelatedOne,ts_ActionFinding_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_actionfindings: WebMappingCUDA<ts_ActionFinding_Create,ts_ActionFinding_Update,ts_ActionFinding_Select>;
}
