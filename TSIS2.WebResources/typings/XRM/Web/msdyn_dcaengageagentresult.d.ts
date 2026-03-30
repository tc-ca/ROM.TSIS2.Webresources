interface msdyn_dcaengageagentresult_Base extends WebEntity {
  additionaldata?: string | null;
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_dcaengageagentresultid?: string | null;
  msdyn_engageagentresponsehistory?: string | null;
  msdyn_executiondetails?: string | null;
  msdyn_followupdetails?: string | null;
  msdyn_lastengageagentresponse?: string | null;
  msdyn_lastprocessedactivityid?: string | null;
  msdyn_lastprocessedactivitytype?: string | null;
  msdyn_lastprocessedtimestamp?: Date | null;
  msdyn_name?: string | null;
  msdyn_runafterdate?: Date | null;
  overriddencreatedon?: Date | null;
  prevstatuscode?: msdyn_dcaengageagentresult_prevstatuscode | null;
  statecode?: msdyn_dcaengageagentresult_statecode | null;
  statuscode?: msdyn_dcaengageagentresult_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_dcaengageagentresult_Relationships {
  msdyn_regarding_account?: Account_Result | null;
  msdyn_regarding_contact?: Contact_Result | null;
}
interface msdyn_dcaengageagentresult extends msdyn_dcaengageagentresult_Base, msdyn_dcaengageagentresult_Relationships {
  msdyn_regarding_account_bind$accounts?: string | null;
  msdyn_regarding_contact_bind$contacts?: string | null;
  msdyn_regarding_lead_bind$leads?: string | null;
  msdyn_regarding_opportunity_bind$opportunities?: string | null;
  msdyn_salesagentrun_bind$msdyn_salesagentruns?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_dcaengageagentresult_Create extends msdyn_dcaengageagentresult {
}
interface msdyn_dcaengageagentresult_Update extends msdyn_dcaengageagentresult {
}
interface msdyn_dcaengageagentresult_Select {
  additionaldata: WebAttribute<msdyn_dcaengageagentresult_Select, { additionaldata: string | null }, {  }>;
  createdby_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_dcaengageagentresult_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_dcaengageagentresult_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_dcaengageagentresult_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_dcaengageagentresultid: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_dcaengageagentresultid: string | null }, {  }>;
  msdyn_engageagentresponsehistory: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_engageagentresponsehistory: string | null }, {  }>;
  msdyn_executiondetails: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_executiondetails: string | null }, {  }>;
  msdyn_followupdetails: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_followupdetails: string | null }, {  }>;
  msdyn_lastengageagentresponse: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_lastengageagentresponse: string | null }, {  }>;
  msdyn_lastprocessedactivityid: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_lastprocessedactivityid: string | null }, {  }>;
  msdyn_lastprocessedactivitytype: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_lastprocessedactivitytype: string | null }, {  }>;
  msdyn_lastprocessedtimestamp: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_lastprocessedtimestamp: Date | null }, { msdyn_lastprocessedtimestamp_formatted?: string }>;
  msdyn_name: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_name: string | null }, {  }>;
  msdyn_regarding_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_regarding_guid: string | null }, { msdyn_regarding_formatted?: string }>;
  msdyn_runafterdate: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_runafterdate: Date | null }, { msdyn_runafterdate_formatted?: string }>;
  msdyn_salesagentrun_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { msdyn_salesagentrun_guid: string | null }, { msdyn_salesagentrun_formatted?: string }>;
  overriddencreatedon: WebAttribute<msdyn_dcaengageagentresult_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_dcaengageagentresult_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  prevstatuscode: WebAttribute<msdyn_dcaengageagentresult_Select, { prevstatuscode: msdyn_dcaengageagentresult_prevstatuscode | null }, { prevstatuscode_formatted?: string }>;
  statecode: WebAttribute<msdyn_dcaengageagentresult_Select, { statecode: msdyn_dcaengageagentresult_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_dcaengageagentresult_Select, { statuscode: msdyn_dcaengageagentresult_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_dcaengageagentresult_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_dcaengageagentresult_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_dcaengageagentresult_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_dcaengageagentresult_Filter {
  additionaldata: string;
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_dcaengageagentresultid: XQW.Guid;
  msdyn_engageagentresponsehistory: string;
  msdyn_executiondetails: string;
  msdyn_followupdetails: string;
  msdyn_lastengageagentresponse: string;
  msdyn_lastprocessedactivityid: string;
  msdyn_lastprocessedactivitytype: string;
  msdyn_lastprocessedtimestamp: Date;
  msdyn_name: string;
  msdyn_regarding_guid: XQW.Guid;
  msdyn_runafterdate: Date;
  msdyn_salesagentrun_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  prevstatuscode: msdyn_dcaengageagentresult_prevstatuscode;
  statecode: msdyn_dcaengageagentresult_statecode;
  statuscode: msdyn_dcaengageagentresult_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_dcaengageagentresult_Expand {
  createdby: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_regarding_account: WebExpand<msdyn_dcaengageagentresult_Expand, Account_Select, Account_Filter, { msdyn_regarding_account: Account_Result }>;
  msdyn_regarding_contact: WebExpand<msdyn_dcaengageagentresult_Expand, Contact_Select, Contact_Filter, { msdyn_regarding_contact: Contact_Result }>;
  ownerid: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<msdyn_dcaengageagentresult_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<msdyn_dcaengageagentresult_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_dcaengageagentresult_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_lastprocessedtimestamp_formatted?: string;
  msdyn_regarding_formatted?: string;
  msdyn_runafterdate_formatted?: string;
  msdyn_salesagentrun_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  prevstatuscode_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_dcaengageagentresult_Result extends msdyn_dcaengageagentresult_Base, msdyn_dcaengageagentresult_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_regarding_guid: string | null;
  msdyn_salesagentrun_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_dcaengageagentresult_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_regarding_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  msdyn_regarding_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_dcaengageagentresult_RelatedMany {
}
interface WebEntitiesRetrieve {
  msdyn_dcaengageagentresults: WebMappingRetrieve<msdyn_dcaengageagentresult_Select,msdyn_dcaengageagentresult_Expand,msdyn_dcaengageagentresult_Filter,msdyn_dcaengageagentresult_Fixed,msdyn_dcaengageagentresult_Result,msdyn_dcaengageagentresult_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_dcaengageagentresults: WebMappingRelated<msdyn_dcaengageagentresult_RelatedOne,msdyn_dcaengageagentresult_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_dcaengageagentresults: WebMappingCUDA<msdyn_dcaengageagentresult_Create,msdyn_dcaengageagentresult_Update,msdyn_dcaengageagentresult_Select>;
}
