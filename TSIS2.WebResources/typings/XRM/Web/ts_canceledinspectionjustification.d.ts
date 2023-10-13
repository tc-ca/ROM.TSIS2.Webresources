interface ts_canceledinspectionjustification_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_canceledinspectionjustification_statecode | null;
  statuscode?: ts_canceledinspectionjustification_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_canceledinspectionjustificationid?: string | null;
  ts_name?: string | null;
  ts_reasonen?: string | null;
  ts_reasonfr?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_canceledinspectionjustification_Relationships {
  ts_msdyn_workorder_canceledinspectionjustifi?: msdyn_workorder_Result[] | null;
}
interface ts_canceledinspectionjustification extends ts_canceledinspectionjustification_Base, ts_canceledinspectionjustification_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ts_canceledinspectionjustification_Create extends ts_canceledinspectionjustification {
}
interface ts_canceledinspectionjustification_Update extends ts_canceledinspectionjustification {
}
interface ts_canceledinspectionjustification_Select {
  createdby_guid: WebAttribute<ts_canceledinspectionjustification_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_canceledinspectionjustification_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_canceledinspectionjustification_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_canceledinspectionjustification_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_canceledinspectionjustification_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_canceledinspectionjustification_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_canceledinspectionjustification_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_canceledinspectionjustification_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_canceledinspectionjustification_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_canceledinspectionjustification_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_canceledinspectionjustification_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_canceledinspectionjustification_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_canceledinspectionjustification_Select, { statecode: ts_canceledinspectionjustification_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_canceledinspectionjustification_Select, { statuscode: ts_canceledinspectionjustification_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_canceledinspectionjustification_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_canceledinspectionjustificationid: WebAttribute<ts_canceledinspectionjustification_Select, { ts_canceledinspectionjustificationid: string | null }, {  }>;
  ts_name: WebAttribute<ts_canceledinspectionjustification_Select, { ts_name: string | null }, {  }>;
  ts_reasonen: WebAttribute<ts_canceledinspectionjustification_Select, { ts_reasonen: string | null }, {  }>;
  ts_reasonfr: WebAttribute<ts_canceledinspectionjustification_Select, { ts_reasonfr: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_canceledinspectionjustification_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_canceledinspectionjustification_Select, { versionnumber: number | null }, {  }>;
}
interface ts_canceledinspectionjustification_Filter {
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
  statecode: ts_canceledinspectionjustification_statecode;
  statuscode: ts_canceledinspectionjustification_statuscode;
  timezoneruleversionnumber: number;
  ts_canceledinspectionjustificationid: XQW.Guid;
  ts_name: string;
  ts_reasonen: string;
  ts_reasonfr: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_canceledinspectionjustification_Expand {
  createdby: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_canceledinspectionjustification_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_canceledinspectionjustification_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_canceledinspectionjustification_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_msdyn_workorder_canceledinspectionjustifi: WebExpand<ts_canceledinspectionjustification_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_canceledinspectionjustifi: msdyn_workorder_Result[] }>;
}
interface ts_canceledinspectionjustification_FormattedResult {
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
}
interface ts_canceledinspectionjustification_Result extends ts_canceledinspectionjustification_Base, ts_canceledinspectionjustification_Relationships {
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
interface ts_canceledinspectionjustification_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_canceledinspectionjustification_RelatedMany {
  ts_msdyn_workorder_canceledinspectionjustifi: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_canceledinspectionjustifications: WebMappingRetrieve<ts_canceledinspectionjustification_Select,ts_canceledinspectionjustification_Expand,ts_canceledinspectionjustification_Filter,ts_canceledinspectionjustification_Fixed,ts_canceledinspectionjustification_Result,ts_canceledinspectionjustification_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_canceledinspectionjustifications: WebMappingRelated<ts_canceledinspectionjustification_RelatedOne,ts_canceledinspectionjustification_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_canceledinspectionjustifications: WebMappingCUDA<ts_canceledinspectionjustification_Create,ts_canceledinspectionjustification_Update,ts_canceledinspectionjustification_Select>;
}
