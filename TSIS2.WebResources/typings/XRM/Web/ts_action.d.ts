interface ts_action_Base extends WebEntity {
  createdon?: Date | null;
  exchangerate?: number | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_action_statecode | null;
  statuscode?: ts_action_statuscode | null;
  timezoneruleversionnumber?: number | null;
  transactioncurrencyid_guid?: string | null;
  ts_actioncategory?: ts_actioncategory | null;
  ts_actionid?: string | null;
  ts_actionstatus?: ts_actionstatus | null;
  ts_actiontype?: ts_actiontype | null;
  ts_amtamount?: number | null;
  ts_amtamount_base?: number | null;
  ts_deliverymethod?: ts_deliverymethod | null;
  ts_details?: string | null;
  ts_duedate?: Date | null;
  ts_location?: string | null;
  ts_name?: string | null;
  ts_timedate?: Date | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_action_Relationships {
  ts_ActionFinding_ts_action_ts_action?: ts_ActionFinding_Result[] | null;
  ts_Case?: Incident_Result | null;
  ts_ts_action_ovs_finding?: ovs_Finding_Result[] | null;
}
interface ts_action extends ts_action_Base, ts_action_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
  ts_Case_bind$incidents?: string | null;
  ts_contact_bind$contacts?: string | null;
  ts_finding_bind$ovs_findings?: string | null;
  ts_stakeholder_bind$accounts?: string | null;
}
interface ts_action_Create extends ts_action {
}
interface ts_action_Update extends ts_action {
}
interface ts_action_Select {
  createdby_guid: WebAttribute<ts_action_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_action_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_action_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  exchangerate: WebAttribute<ts_action_Select, { exchangerate: number | null }, {  }>;
  importsequencenumber: WebAttribute<ts_action_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_action_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_action_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_action_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_action_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_action_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_action_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_action_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_action_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_action_Select, { statecode: ts_action_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_action_Select, { statuscode: ts_action_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_action_Select, { timezoneruleversionnumber: number | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<ts_action_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  ts_actioncategory: WebAttribute<ts_action_Select, { ts_actioncategory: ts_actioncategory | null }, { ts_actioncategory_formatted?: string }>;
  ts_actionid: WebAttribute<ts_action_Select, { ts_actionid: string | null }, {  }>;
  ts_actionstatus: WebAttribute<ts_action_Select, { ts_actionstatus: ts_actionstatus | null }, { ts_actionstatus_formatted?: string }>;
  ts_actiontype: WebAttribute<ts_action_Select, { ts_actiontype: ts_actiontype | null }, { ts_actiontype_formatted?: string }>;
  ts_amtamount: WebAttribute<ts_action_Select, { ts_amtamount: number | null; transactioncurrencyid_guid: string | null }, { ts_amtamount_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_amtamount_base: WebAttribute<ts_action_Select, { ts_amtamount_base: number | null; transactioncurrencyid_guid: string | null }, { ts_amtamount_base_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_case_guid: WebAttribute<ts_action_Select, { ts_case_guid: string | null }, { ts_case_formatted?: string }>;
  ts_contact_guid: WebAttribute<ts_action_Select, { ts_contact_guid: string | null }, { ts_contact_formatted?: string }>;
  ts_deliverymethod: WebAttribute<ts_action_Select, { ts_deliverymethod: ts_deliverymethod | null }, { ts_deliverymethod_formatted?: string }>;
  ts_details: WebAttribute<ts_action_Select, { ts_details: string | null }, {  }>;
  ts_duedate: WebAttribute<ts_action_Select, { ts_duedate: Date | null }, { ts_duedate_formatted?: string }>;
  ts_finding_guid: WebAttribute<ts_action_Select, { ts_finding_guid: string | null }, { ts_finding_formatted?: string }>;
  ts_location: WebAttribute<ts_action_Select, { ts_location: string | null }, {  }>;
  ts_name: WebAttribute<ts_action_Select, { ts_name: string | null }, {  }>;
  ts_stakeholder_guid: WebAttribute<ts_action_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_timedate: WebAttribute<ts_action_Select, { ts_timedate: Date | null }, { ts_timedate_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_action_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_action_Select, { versionnumber: number | null }, {  }>;
}
interface ts_action_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  exchangerate: any;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ts_action_statecode;
  statuscode: ts_action_statuscode;
  timezoneruleversionnumber: number;
  transactioncurrencyid_guid: XQW.Guid;
  ts_actioncategory: ts_actioncategory;
  ts_actionid: XQW.Guid;
  ts_actionstatus: ts_actionstatus;
  ts_actiontype: ts_actiontype;
  ts_amtamount: number;
  ts_amtamount_base: number;
  ts_case_guid: XQW.Guid;
  ts_contact_guid: XQW.Guid;
  ts_deliverymethod: ts_deliverymethod;
  ts_details: string;
  ts_duedate: Date;
  ts_finding_guid: XQW.Guid;
  ts_location: string;
  ts_name: string;
  ts_stakeholder_guid: XQW.Guid;
  ts_timedate: Date;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_action_Expand {
  createdby: WebExpand<ts_action_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_action_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_action_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_action_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_action_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_action_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_action_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ActionFinding_ts_action_ts_action: WebExpand<ts_action_Expand, ts_ActionFinding_Select, ts_ActionFinding_Filter, { ts_ActionFinding_ts_action_ts_action: ts_ActionFinding_Result[] }>;
  ts_Case: WebExpand<ts_action_Expand, Incident_Select, Incident_Filter, { ts_Case: Incident_Result }>;
  ts_contact: WebExpand<ts_action_Expand, Contact_Select, Contact_Filter, { ts_contact: Contact_Result }>;
  ts_finding: WebExpand<ts_action_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_finding: ovs_Finding_Result }>;
  ts_stakeholder: WebExpand<ts_action_Expand, Account_Select, Account_Filter, { ts_stakeholder: Account_Result }>;
  ts_ts_action_ovs_finding: WebExpand<ts_action_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ts_action_ovs_finding: ovs_Finding_Result[] }>;
}
interface ts_action_FormattedResult {
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
  transactioncurrencyid_formatted?: string;
  ts_actioncategory_formatted?: string;
  ts_actionstatus_formatted?: string;
  ts_actiontype_formatted?: string;
  ts_amtamount_base_formatted?: string;
  ts_amtamount_formatted?: string;
  ts_case_formatted?: string;
  ts_contact_formatted?: string;
  ts_deliverymethod_formatted?: string;
  ts_duedate_formatted?: string;
  ts_finding_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_timedate_formatted?: string;
}
interface ts_action_Result extends ts_action_Base, ts_action_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  transactioncurrencyid_guid: string | null;
  ts_case_guid: string | null;
  ts_contact_guid: string | null;
  ts_finding_guid: string | null;
  ts_stakeholder_guid: string | null;
}
interface ts_action_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Case: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ts_finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_action_RelatedMany {
  ts_ActionFinding_ts_action_ts_action: WebMappingRetrieve<ts_ActionFinding_Select,ts_ActionFinding_Expand,ts_ActionFinding_Filter,ts_ActionFinding_Fixed,ts_ActionFinding_Result,ts_ActionFinding_FormattedResult>;
  ts_ts_action_ovs_finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_actions: WebMappingRetrieve<ts_action_Select,ts_action_Expand,ts_action_Filter,ts_action_Fixed,ts_action_Result,ts_action_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_actions: WebMappingRelated<ts_action_RelatedOne,ts_action_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_actions: WebMappingCUDA<ts_action_Create,ts_action_Update,ts_action_Select>;
}
