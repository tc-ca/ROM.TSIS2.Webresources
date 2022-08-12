interface ts_OperationActivity_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_operationactivity_statecode | null;
  statuscode?: ts_operationactivity_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_operationactivityid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_OperationActivity_Relationships {
  ts_Operation?: ovs_operation_Result | null;
}
interface ts_OperationActivity extends ts_OperationActivity_Base, ts_OperationActivity_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Activity_bind$msdyn_incidenttypes?: string | null;
  ts_Operation_bind$ovs_operations?: string | null;
}
interface ts_OperationActivity_Create extends ts_OperationActivity {
}
interface ts_OperationActivity_Update extends ts_OperationActivity {
}
interface ts_OperationActivity_Select {
  createdby_guid: WebAttribute<ts_OperationActivity_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_OperationActivity_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_OperationActivity_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_OperationActivity_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_OperationActivity_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_OperationActivity_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_OperationActivity_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_OperationActivity_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_OperationActivity_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_OperationActivity_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_OperationActivity_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_OperationActivity_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_OperationActivity_Select, { statecode: ts_operationactivity_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_OperationActivity_Select, { statuscode: ts_operationactivity_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_OperationActivity_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activity_guid: WebAttribute<ts_OperationActivity_Select, { ts_activity_guid: string | null }, { ts_activity_formatted?: string }>;
  ts_name: WebAttribute<ts_OperationActivity_Select, { ts_name: string | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_OperationActivity_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationactivityid: WebAttribute<ts_OperationActivity_Select, { ts_operationactivityid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_OperationActivity_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_OperationActivity_Select, { versionnumber: number | null }, {  }>;
}
interface ts_OperationActivity_Filter {
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
  statecode: ts_operationactivity_statecode;
  statuscode: ts_operationactivity_statuscode;
  timezoneruleversionnumber: number;
  ts_activity_guid: XQW.Guid;
  ts_name: string;
  ts_operation_guid: XQW.Guid;
  ts_operationactivityid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_OperationActivity_Expand {
  createdby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_OperationActivity_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Operation: WebExpand<ts_OperationActivity_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_Operation: ovs_operation_Result }>;
}
interface ts_OperationActivity_FormattedResult {
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
  ts_activity_formatted?: string;
  ts_operation_formatted?: string;
}
interface ts_OperationActivity_Result extends ts_OperationActivity_Base, ts_OperationActivity_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_activity_guid: string | null;
  ts_operation_guid: string | null;
}
interface ts_OperationActivity_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface ts_OperationActivity_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_operationactivities: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_operationactivities: WebMappingRelated<ts_OperationActivity_RelatedOne,ts_OperationActivity_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_operationactivities: WebMappingCUDA<ts_OperationActivity_Create,ts_OperationActivity_Update,ts_OperationActivity_Select>;
}
