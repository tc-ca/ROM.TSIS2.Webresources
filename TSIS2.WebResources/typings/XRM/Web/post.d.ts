interface Post_Base extends WebEntity {
  createdon?: Date | null;
  largetext?: string | null;
  modifiedon?: Date | null;
  msft_datastate?: msft_datastate | null;
  postid?: string | null;
  posttoyammer?: boolean | null;
  source?: post_source | null;
  text?: string | null;
  timezoneruleversionnumber?: number | null;
  type?: post_type | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
  yammerpoststate?: number | null;
  yammerretrycount?: number | null;
}
interface Post_Relationships {
  regardingobjectid_account?: Account_Result | null;
  regardingobjectid_contact?: Contact_Result | null;
  regardingobjectid_incident?: Incident_Result | null;
  regardingobjectid_msdyn_functionallocation?: msdyn_FunctionalLocation_Result | null;
  regardingobjectid_msdyn_workorder?: msdyn_workorder_Result | null;
  regardingobjectid_ovs_finding?: ovs_Finding_Result | null;
  regardingobjectid_ovs_operation?: ovs_operation_Result | null;
  regardingobjectid_systemuser?: SystemUser_Result | null;
  regardingobjectid_ts_action?: ts_action_Result | null;
  regardingobjectid_ts_securityincident?: ts_securityincident_Result | null;
  regardingobjectid_ts_teamplanningdata?: ts_TeamPlanningData_Result | null;
}
interface Post extends Post_Base, Post_Relationships {
}
interface Post_Create extends Post {
  regardingobjectid_account_bind$accounts?: string | null;
  regardingobjectid_competitor_bind$competitors?: string | null;
  regardingobjectid_contact_bind$contacts?: string | null;
  regardingobjectid_incident_bind$incidents?: string | null;
  regardingobjectid_knowledgearticle_bind$knowledgearticles?: string | null;
  regardingobjectid_lead_bind$leads?: string | null;
  regardingobjectid_letter_bind$letters?: string | null;
  regardingobjectid_msdyn_functionallocation_bind$msdyn_functionallocations?: string | null;
  regardingobjectid_msdyn_salessuggestion_bind$msdyn_salessuggestions?: string | null;
  regardingobjectid_msdyn_swarm_bind$msdyn_swarms?: string | null;
  regardingobjectid_msdyn_workorder_bind$msdyn_workorders?: string | null;
  regardingobjectid_opportunity_bind$opportunities?: string | null;
  regardingobjectid_ovs_finding_bind$ovs_findings?: string | null;
  regardingobjectid_ovs_operation_bind$ovs_operations?: string | null;
  regardingobjectid_systemuser_bind$systemusers?: string | null;
  regardingobjectid_ts_action_bind$ts_actions?: string | null;
  regardingobjectid_ts_securityincident_bind$ts_securityincidents?: string | null;
  regardingobjectid_ts_teamplanningdata_bind$ts_teamplanningdatas?: string | null;
}
interface Post_Update extends Post {
}
interface Post_Select {
  createdby_guid: WebAttribute<Post_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<Post_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<Post_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  largetext: WebAttribute<Post_Select, { largetext: string | null }, {  }>;
  modifiedby_guid: WebAttribute<Post_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<Post_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<Post_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msft_datastate: WebAttribute<Post_Select, { msft_datastate: msft_datastate | null }, { msft_datastate_formatted?: string }>;
  organizationid_guid: WebAttribute<Post_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  postid: WebAttribute<Post_Select, { postid: string | null }, {  }>;
  postregardingid_guid: WebAttribute<Post_Select, { postregardingid_guid: string | null }, { postregardingid_formatted?: string }>;
  posttoyammer: WebAttribute<Post_Select, { posttoyammer: boolean | null }, {  }>;
  regardingobjectid_guid: WebAttribute<Post_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  regardingobjectownerid_guid: WebAttribute<Post_Select, { regardingobjectownerid_guid: string | null }, { regardingobjectownerid_formatted?: string }>;
  regardingobjectowningbusinessunit_guid: WebAttribute<Post_Select, { regardingobjectowningbusinessunit_guid: string | null }, { regardingobjectowningbusinessunit_formatted?: string }>;
  source: WebAttribute<Post_Select, { source: post_source | null }, { source_formatted?: string }>;
  text: WebAttribute<Post_Select, { text: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<Post_Select, { timezoneruleversionnumber: number | null }, {  }>;
  type: WebAttribute<Post_Select, { type: post_type | null }, { type_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<Post_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<Post_Select, { versionnumber: number | null }, {  }>;
  yammerpoststate: WebAttribute<Post_Select, { yammerpoststate: number | null }, {  }>;
  yammerretrycount: WebAttribute<Post_Select, { yammerretrycount: number | null }, {  }>;
}
interface Post_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  largetext: string;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msft_datastate: msft_datastate;
  organizationid_guid: XQW.Guid;
  postid: XQW.Guid;
  postregardingid_guid: XQW.Guid;
  posttoyammer: boolean;
  regardingobjectid_guid: XQW.Guid;
  regardingobjectownerid_guid: XQW.Guid;
  regardingobjectowningbusinessunit_guid: XQW.Guid;
  source: post_source;
  text: string;
  timezoneruleversionnumber: number;
  type: post_type;
  utcconversiontimezonecode: number;
  versionnumber: number;
  yammerpoststate: number;
  yammerretrycount: number;
}
interface Post_Expand {
  createdby: WebExpand<Post_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<Post_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<Post_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<Post_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  regardingobjectid_account: WebExpand<Post_Expand, Account_Select, Account_Filter, { regardingobjectid_account: Account_Result }>;
  regardingobjectid_contact: WebExpand<Post_Expand, Contact_Select, Contact_Filter, { regardingobjectid_contact: Contact_Result }>;
  regardingobjectid_incident: WebExpand<Post_Expand, Incident_Select, Incident_Filter, { regardingobjectid_incident: Incident_Result }>;
  regardingobjectid_msdyn_functionallocation: WebExpand<Post_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { regardingobjectid_msdyn_functionallocation: msdyn_FunctionalLocation_Result }>;
  regardingobjectid_msdyn_workorder: WebExpand<Post_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder: msdyn_workorder_Result }>;
  regardingobjectid_ovs_finding: WebExpand<Post_Expand, ovs_Finding_Select, ovs_Finding_Filter, { regardingobjectid_ovs_finding: ovs_Finding_Result }>;
  regardingobjectid_ovs_operation: WebExpand<Post_Expand, ovs_operation_Select, ovs_operation_Filter, { regardingobjectid_ovs_operation: ovs_operation_Result }>;
  regardingobjectid_systemuser: WebExpand<Post_Expand, SystemUser_Select, SystemUser_Filter, { regardingobjectid_systemuser: SystemUser_Result }>;
  regardingobjectid_ts_action: WebExpand<Post_Expand, ts_action_Select, ts_action_Filter, { regardingobjectid_ts_action: ts_action_Result }>;
  regardingobjectid_ts_securityincident: WebExpand<Post_Expand, ts_securityincident_Select, ts_securityincident_Filter, { regardingobjectid_ts_securityincident: ts_securityincident_Result }>;
  regardingobjectid_ts_teamplanningdata: WebExpand<Post_Expand, ts_TeamPlanningData_Select, ts_TeamPlanningData_Filter, { regardingobjectid_ts_teamplanningdata: ts_TeamPlanningData_Result }>;
}
interface Post_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msft_datastate_formatted?: string;
  organizationid_formatted?: string;
  postregardingid_formatted?: string;
  regardingobjectid_formatted?: string;
  regardingobjectownerid_formatted?: string;
  regardingobjectowningbusinessunit_formatted?: string;
  source_formatted?: string;
  type_formatted?: string;
}
interface Post_Result extends Post_Base, Post_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  postregardingid_guid: string | null;
  regardingobjectid_guid: string | null;
  regardingobjectownerid_guid: string | null;
  regardingobjectowningbusinessunit_guid: string | null;
}
interface Post_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  regardingobjectid_incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  regardingobjectid_msdyn_functionallocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  regardingobjectid_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  regardingobjectid_ovs_finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  regardingobjectid_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  regardingobjectid_systemuser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_ts_action: WebMappingRetrieve<ts_action_Select,ts_action_Expand,ts_action_Filter,ts_action_Fixed,ts_action_Result,ts_action_FormattedResult>;
  regardingobjectid_ts_securityincident: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
  regardingobjectid_ts_teamplanningdata: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface Post_RelatedMany {
}
interface WebEntitiesRetrieve {
  posts: WebMappingRetrieve<Post_Select,Post_Expand,Post_Filter,Post_Fixed,Post_Result,Post_FormattedResult>;
}
interface WebEntitiesRelated {
  posts: WebMappingRelated<Post_RelatedOne,Post_RelatedMany>;
}
interface WebEntitiesCUDA {
  posts: WebMappingCUDA<Post_Create,Post_Update,Post_Select>;
}
