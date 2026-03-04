interface msdyn_aiagentstatus_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_agentmode?: msdyn_msdyn_aiagentstatus_msdyn_agentmode | null;
  msdyn_aiagentstatusid?: string | null;
  msdyn_currentaistatus?: string | null;
  msdyn_emailssent?: number | null;
  msdyn_escalatedon?: Date | null;
  msdyn_fallbackreason?: msdyn_aiagentstatus_msdyn_fallbackreason | null;
  msdyn_lastaction?: msdyn_msdyn_aiagentstatus_msdyn_lastaction | null;
  overriddencreatedon?: Date | null;
  statecode?: msdyn_aiagentstatus_statecode | null;
  statuscode?: msdyn_aiagentstatus_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_aiagentstatus_Relationships {
  msdyn_incident_msdyn_aiagentstatus?: Incident_Result[] | null;
}
interface msdyn_aiagentstatus extends msdyn_aiagentstatus_Base, msdyn_aiagentstatus_Relationships {
  msdyn_lastemailactivity_bind$emails?: string | null;
  msdyn_lastintent_bind$msdyn_intents?: string | null;
  msdyn_lastintentgroup_bind$msdyn_intents?: string | null;
}
interface msdyn_aiagentstatus_Create extends msdyn_aiagentstatus {
}
interface msdyn_aiagentstatus_Update extends msdyn_aiagentstatus {
}
interface msdyn_aiagentstatus_Select {
  createdby_guid: WebAttribute<msdyn_aiagentstatus_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_aiagentstatus_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_aiagentstatus_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_aiagentstatus_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_aiagentstatus_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_aiagentstatus_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_aiagentstatus_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_agentmode: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_agentmode: msdyn_msdyn_aiagentstatus_msdyn_agentmode | null }, { msdyn_agentmode_formatted?: string }>;
  msdyn_aiagentstatusid: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_aiagentstatusid: string | null }, {  }>;
  msdyn_currentaistatus: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_currentaistatus: string | null }, {  }>;
  msdyn_emailssent: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_emailssent: number | null }, {  }>;
  msdyn_escalatedon: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_escalatedon: Date | null }, { msdyn_escalatedon_formatted?: string }>;
  msdyn_fallbackreason: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_fallbackreason: msdyn_aiagentstatus_msdyn_fallbackreason | null }, { msdyn_fallbackreason_formatted?: string }>;
  msdyn_lastaction: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_lastaction: msdyn_msdyn_aiagentstatus_msdyn_lastaction | null }, { msdyn_lastaction_formatted?: string }>;
  msdyn_lastemailactivity_guid: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_lastemailactivity_guid: string | null }, { msdyn_lastemailactivity_formatted?: string }>;
  msdyn_lastintent_guid: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_lastintent_guid: string | null }, { msdyn_lastintent_formatted?: string }>;
  msdyn_lastintentgroup_guid: WebAttribute<msdyn_aiagentstatus_Select, { msdyn_lastintentgroup_guid: string | null }, { msdyn_lastintentgroup_formatted?: string }>;
  organizationid_guid: WebAttribute<msdyn_aiagentstatus_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<msdyn_aiagentstatus_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  statecode: WebAttribute<msdyn_aiagentstatus_Select, { statecode: msdyn_aiagentstatus_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_aiagentstatus_Select, { statuscode: msdyn_aiagentstatus_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_aiagentstatus_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_aiagentstatus_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_aiagentstatus_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_aiagentstatus_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_agentmode: msdyn_msdyn_aiagentstatus_msdyn_agentmode;
  msdyn_aiagentstatusid: XQW.Guid;
  msdyn_currentaistatus: string;
  msdyn_emailssent: number;
  msdyn_escalatedon: Date;
  msdyn_fallbackreason: msdyn_aiagentstatus_msdyn_fallbackreason;
  msdyn_lastaction: msdyn_msdyn_aiagentstatus_msdyn_lastaction;
  msdyn_lastemailactivity_guid: XQW.Guid;
  msdyn_lastintent_guid: XQW.Guid;
  msdyn_lastintentgroup_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  statecode: msdyn_aiagentstatus_statecode;
  statuscode: msdyn_aiagentstatus_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_aiagentstatus_Expand {
  createdby: WebExpand<msdyn_aiagentstatus_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_aiagentstatus_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_aiagentstatus_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_aiagentstatus_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_incident_msdyn_aiagentstatus: WebExpand<msdyn_aiagentstatus_Expand, Incident_Select, Incident_Filter, { msdyn_incident_msdyn_aiagentstatus: Incident_Result[] }>;
  msdyn_lastemailactivity: WebExpand<msdyn_aiagentstatus_Expand, Email_Select, Email_Filter, { msdyn_lastemailactivity: Email_Result }>;
}
interface msdyn_aiagentstatus_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_agentmode_formatted?: string;
  msdyn_escalatedon_formatted?: string;
  msdyn_fallbackreason_formatted?: string;
  msdyn_lastaction_formatted?: string;
  msdyn_lastemailactivity_formatted?: string;
  msdyn_lastintent_formatted?: string;
  msdyn_lastintentgroup_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_aiagentstatus_Result extends msdyn_aiagentstatus_Base, msdyn_aiagentstatus_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_lastemailactivity_guid: string | null;
  msdyn_lastintent_guid: string | null;
  msdyn_lastintentgroup_guid: string | null;
  organizationid_guid: string | null;
}
interface msdyn_aiagentstatus_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_lastemailactivity: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
}
interface msdyn_aiagentstatus_RelatedMany {
  msdyn_incident_msdyn_aiagentstatus: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_aiagentstatuses: WebMappingRetrieve<msdyn_aiagentstatus_Select,msdyn_aiagentstatus_Expand,msdyn_aiagentstatus_Filter,msdyn_aiagentstatus_Fixed,msdyn_aiagentstatus_Result,msdyn_aiagentstatus_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_aiagentstatuses: WebMappingRelated<msdyn_aiagentstatus_RelatedOne,msdyn_aiagentstatus_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_aiagentstatuses: WebMappingCUDA<msdyn_aiagentstatus_Create,msdyn_aiagentstatus_Update,msdyn_aiagentstatus_Select>;
}
