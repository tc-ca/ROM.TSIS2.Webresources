interface ovs_operationtype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_name?: string | null;
  ovs_operationtypeid?: string | null;
  statecode?: ovs_operationtype_statecode | null;
  statuscode?: ovs_operationtype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_operationtype_Relationships {
  ovs_ovs_operationtype_ovs_operation?: ovs_operation_Result[] | null;
}
interface ovs_operationtype extends ovs_operationtype_Base, ovs_operationtype_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_operationtype_Create extends ovs_operationtype {
}
interface ovs_operationtype_Update extends ovs_operationtype {
}
interface ovs_operationtype_Select {
  createdby_guid: WebAttribute<ovs_operationtype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_operationtype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_operationtype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_operationtype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_operationtype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_operationtype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_operationtype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_operationtype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_name: WebAttribute<ovs_operationtype_Select, { ovs_name: string | null }, {  }>;
  ovs_operationtypeid: WebAttribute<ovs_operationtype_Select, { ovs_operationtypeid: string | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_operationtype_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_operationtype_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_operationtype_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_operationtype_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_operationtype_Select, { statecode: ovs_operationtype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_operationtype_Select, { statuscode: ovs_operationtype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_operationtype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_operationtype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_operationtype_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_operationtype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_name: string;
  ovs_operationtypeid: XQW.Guid;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_operationtype_statecode;
  statuscode: ovs_operationtype_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_operationtype_Expand {
  createdby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_ovs_operationtype_ovs_operation: WebExpand<ovs_operationtype_Expand, ovs_operation_Select, ovs_operation_Filter, { ovs_ovs_operationtype_ovs_operation: ovs_operation_Result[] }>;
  ownerid: WebExpand<ovs_operationtype_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_operationtype_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ovs_operationtype_FormattedResult {
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
interface ovs_operationtype_Result extends ovs_operationtype_Base, ovs_operationtype_Relationships {
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
interface ovs_operationtype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_operationtype_RelatedMany {
  ovs_ovs_operationtype_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_operationtypes: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_operationtypes: WebMappingRelated<ovs_operationtype_RelatedOne,ovs_operationtype_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_operationtypes: WebMappingCUDA<ovs_operationtype_Create,ovs_operationtype_Update,ovs_operationtype_Select>;
}
