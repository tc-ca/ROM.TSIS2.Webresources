interface ts_operationcontact_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_operationcontact_statecode | null;
  statuscode?: ts_operationcontact_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_operationcontactid?: string | null;
  ts_role?: ts_role_Enum | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_operationcontact_Relationships {
}
interface ts_operationcontact extends ts_operationcontact_Base, ts_operationcontact_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_connectionrole_bind$ts_roles?: string | null;
  ts_contact_bind$contacts?: string | null;
  ts_operation_bind$ovs_operations?: string | null;
}
interface ts_operationcontact_Create extends ts_operationcontact {
}
interface ts_operationcontact_Update extends ts_operationcontact {
}
interface ts_operationcontact_Select {
  createdby_guid: WebAttribute<ts_operationcontact_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_operationcontact_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_operationcontact_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_operationcontact_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_operationcontact_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_operationcontact_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_operationcontact_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_operationcontact_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_operationcontact_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_operationcontact_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_operationcontact_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_operationcontact_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_operationcontact_Select, { statecode: ts_operationcontact_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_operationcontact_Select, { statuscode: ts_operationcontact_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_operationcontact_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_connectionrole_guid: WebAttribute<ts_operationcontact_Select, { ts_connectionrole_guid: string | null }, { ts_connectionrole_formatted?: string }>;
  ts_contact_guid: WebAttribute<ts_operationcontact_Select, { ts_contact_guid: string | null }, { ts_contact_formatted?: string }>;
  ts_name: WebAttribute<ts_operationcontact_Select, { ts_name: string | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_operationcontact_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationcontactid: WebAttribute<ts_operationcontact_Select, { ts_operationcontactid: string | null }, {  }>;
  ts_role: WebAttribute<ts_operationcontact_Select, { ts_role: ts_role_Enum | null }, { ts_role_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_operationcontact_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_operationcontact_Select, { versionnumber: number | null }, {  }>;
}
interface ts_operationcontact_Filter {
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
  statecode: ts_operationcontact_statecode;
  statuscode: ts_operationcontact_statuscode;
  timezoneruleversionnumber: number;
  ts_connectionrole_guid: XQW.Guid;
  ts_contact_guid: XQW.Guid;
  ts_name: string;
  ts_operation_guid: XQW.Guid;
  ts_operationcontactid: XQW.Guid;
  ts_role: ts_role_Enum;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_operationcontact_Expand {
  createdby: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_operationcontact_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_connectionrole: WebExpand<ts_operationcontact_Expand, ts_role_Select, ts_role_Filter, { ts_connectionrole: ts_role_Result }>;
  ts_contact: WebExpand<ts_operationcontact_Expand, Contact_Select, Contact_Filter, { ts_contact: Contact_Result }>;
  ts_operation: WebExpand<ts_operationcontact_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_operation: ovs_operation_Result }>;
}
interface ts_operationcontact_FormattedResult {
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
  ts_connectionrole_formatted?: string;
  ts_contact_formatted?: string;
  ts_operation_formatted?: string;
  ts_role_formatted?: string;
}
interface ts_operationcontact_Result extends ts_operationcontact_Base, ts_operationcontact_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_connectionrole_guid: string | null;
  ts_contact_guid: string | null;
  ts_operation_guid: string | null;
}
interface ts_operationcontact_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_connectionrole: WebMappingRetrieve<ts_role_Select,ts_role_Expand,ts_role_Filter,ts_role_Fixed,ts_role_Result,ts_role_FormattedResult>;
  ts_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ts_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface ts_operationcontact_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_operationcontacts: WebMappingRetrieve<ts_operationcontact_Select,ts_operationcontact_Expand,ts_operationcontact_Filter,ts_operationcontact_Fixed,ts_operationcontact_Result,ts_operationcontact_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_operationcontacts: WebMappingRelated<ts_operationcontact_RelatedOne,ts_operationcontact_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_operationcontacts: WebMappingCUDA<ts_operationcontact_Create,ts_operationcontact_Update,ts_operationcontact_Select>;
}
