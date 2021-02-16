interface ovs_TYRational_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_name?: string | null;
  ovs_rationalelbl?: string | null;
  ovs_rationalflbl?: string | null;
  ovs_tyrationalid?: string | null;
  statecode?: ovs_tyrational_statecode | null;
  statuscode?: ovs_tyrational_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_TYRational_Relationships {
  msdyn_workorder_TYRational_ovs_TYRational?: msdyn_workorder_Result[] | null;
  ovs_msdyn_workorder_Rational_ovs_TYRational?: msdyn_workorder_Result[] | null;
}
interface ovs_TYRational extends ovs_TYRational_Base, ovs_TYRational_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_TYRational_Create extends ovs_TYRational {
}
interface ovs_TYRational_Update extends ovs_TYRational {
}
interface ovs_TYRational_Select {
  createdby_guid: WebAttribute<ovs_TYRational_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_TYRational_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_TYRational_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_TYRational_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_TYRational_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_TYRational_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_TYRational_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_TYRational_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_name: WebAttribute<ovs_TYRational_Select, { ovs_name: string | null }, {  }>;
  ovs_rationalelbl: WebAttribute<ovs_TYRational_Select, { ovs_rationalelbl: string | null }, {  }>;
  ovs_rationalflbl: WebAttribute<ovs_TYRational_Select, { ovs_rationalflbl: string | null }, {  }>;
  ovs_tyrationalid: WebAttribute<ovs_TYRational_Select, { ovs_tyrationalid: string | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_TYRational_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_TYRational_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_TYRational_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_TYRational_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_TYRational_Select, { statecode: ovs_tyrational_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_TYRational_Select, { statuscode: ovs_tyrational_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_TYRational_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_TYRational_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_TYRational_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_TYRational_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_name: string;
  ovs_rationalelbl: string;
  ovs_rationalflbl: string;
  ovs_tyrationalid: XQW.Guid;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_tyrational_statecode;
  statuscode: ovs_tyrational_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_TYRational_Expand {
  createdby: WebExpand<ovs_TYRational_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_TYRational_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_TYRational_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_TYRational_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_workorder_TYRational_ovs_TYRational: WebExpand<ovs_TYRational_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_workorder_TYRational_ovs_TYRational: msdyn_workorder_Result[] }>;
  ovs_msdyn_workorder_Rational_ovs_TYRational: WebExpand<ovs_TYRational_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_Rational_ovs_TYRational: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<ovs_TYRational_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_TYRational_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_TYRational_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ovs_TYRational_FormattedResult {
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
interface ovs_TYRational_Result extends ovs_TYRational_Base, ovs_TYRational_Relationships {
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
interface ovs_TYRational_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_TYRational_RelatedMany {
  msdyn_workorder_TYRational_ovs_TYRational: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_msdyn_workorder_Rational_ovs_TYRational: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_tyrationals: WebMappingRetrieve<ovs_TYRational_Select,ovs_TYRational_Expand,ovs_TYRational_Filter,ovs_TYRational_Fixed,ovs_TYRational_Result,ovs_TYRational_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_tyrationals: WebMappingRelated<ovs_TYRational_RelatedOne,ovs_TYRational_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_tyrationals: WebMappingCUDA<ovs_TYRational_Create,ovs_TYRational_Update,ovs_TYRational_Select>;
}
