interface ts_File_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_file_statecode | null;
  statuscode?: ts_file_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_description?: string | null;
  ts_documenttype?: ts_documenttype | null;
  ts_file?: string | null;
  ts_filecontext?: ts_filecontext | null;
  ts_fileid?: string | null;
  ts_filesubcontext?: ts_filesubcontext | null;
  ts_filetype?: string | null;
  ts_formintegrationid?: string | null;
  ts_isfindingsreport?: boolean | null;
  ts_programaccessteamnameid?: string | null;
  ts_sensitivitylevel?: ts_sensitivitylevel | null;
  ts_sharepointfileidentifier?: string | null;
  ts_sharepointlink?: string | null;
  ts_uploadedtosharepoint?: boolean | null;
  ts_visibletootherprograms?: boolean | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_File_Relationships {
  ts_Action?: ts_action_Result | null;
  ts_File_Team_Team?: Team_Result[] | null;
  ts_Files_Accounts?: Account_Result[] | null;
  ts_Files_Incidents?: Incident_Result[] | null;
  ts_Files_msdyn_FunctionalLocations?: msdyn_FunctionalLocation_Result[] | null;
  ts_Files_msdyn_workorders?: msdyn_workorder_Result[] | null;
  ts_Files_msdyn_workorderservicetasks?: msdyn_workorderservicetask_Result[] | null;
  ts_Files_ovs_operations?: ovs_operation_Result[] | null;
  ts_Finding?: ovs_Finding_Result | null;
  ts_Incident?: Incident_Result | null;
  ts_SecurityIncident?: ts_securityincident_Result | null;
  ts_Site?: msdyn_FunctionalLocation_Result | null;
  ts_Site_Site?: ts_site_Result | null;
  ts_Stakeholder?: Account_Result | null;
  ts_Trip?: ts_trip_Result | null;
  ts_file_connections1?: Connection_Result[] | null;
  ts_file_connections2?: Connection_Result[] | null;
  ts_ovs_Finding_File_ts_File?: ovs_Finding_Result[] | null;
  ts_ovs_Finding_ts_File_ts_File?: ovs_Finding_Result[] | null;
  ts_site_ts_file?: ts_site_Result[] | null;
  ts_ts_file_ts_trip?: ts_trip_Result[] | null;
}
interface ts_File extends ts_File_Base, ts_File_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Action_bind$ts_actions?: string | null;
  ts_Exemption_bind$ts_exemptions?: string | null;
  ts_Finding_bind$ovs_findings?: string | null;
  ts_Incident_bind$incidents?: string | null;
  ts_SecurityIncident_bind$ts_securityincidents?: string | null;
  ts_Site_Site_bind$ts_sites?: string | null;
  ts_Site_bind$msdyn_functionallocations?: string | null;
  ts_Stakeholder_bind$accounts?: string | null;
  ts_Trip_bind$ts_trips?: string | null;
  ts_filecategory_bind$ts_filecategories?: string | null;
  ts_filesubcategory_bind$ts_filesubcategories?: string | null;
  ts_msdyn_workorder_bind$msdyn_workorders?: string | null;
  ts_ovs_operation_bind$ovs_operations?: string | null;
  ts_workorderservicetask_bind$msdyn_workorderservicetasks?: string | null;
}
interface ts_File_Create extends ts_File {
}
interface ts_File_Update extends ts_File {
}
interface ts_File_Select {
  createdby_guid: WebAttribute<ts_File_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_File_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_File_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_File_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_File_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_File_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_File_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_File_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_File_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_File_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_File_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_File_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_File_Select, { statecode: ts_file_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_File_Select, { statuscode: ts_file_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_File_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_action_guid: WebAttribute<ts_File_Select, { ts_action_guid: string | null }, { ts_action_formatted?: string }>;
  ts_description: WebAttribute<ts_File_Select, { ts_description: string | null }, {  }>;
  ts_documenttype: WebAttribute<ts_File_Select, { ts_documenttype: ts_documenttype | null }, { ts_documenttype_formatted?: string }>;
  ts_exemption_guid: WebAttribute<ts_File_Select, { ts_exemption_guid: string | null }, { ts_exemption_formatted?: string }>;
  ts_file1;
  ts_filecategory_guid: WebAttribute<ts_File_Select, { ts_filecategory_guid: string | null }, { ts_filecategory_formatted?: string }>;
  ts_filecontext: WebAttribute<ts_File_Select, { ts_filecontext: ts_filecontext | null }, { ts_filecontext_formatted?: string }>;
  ts_fileid: WebAttribute<ts_File_Select, { ts_fileid: string | null }, {  }>;
  ts_filesubcategory_guid: WebAttribute<ts_File_Select, { ts_filesubcategory_guid: string | null }, { ts_filesubcategory_formatted?: string }>;
  ts_filesubcontext: WebAttribute<ts_File_Select, { ts_filesubcontext: ts_filesubcontext | null }, { ts_filesubcontext_formatted?: string }>;
  ts_filetype: WebAttribute<ts_File_Select, { ts_filetype: string | null }, {  }>;
  ts_finding_guid: WebAttribute<ts_File_Select, { ts_finding_guid: string | null }, { ts_finding_formatted?: string }>;
  ts_formintegrationid: WebAttribute<ts_File_Select, { ts_formintegrationid: string | null }, {  }>;
  ts_incident_guid: WebAttribute<ts_File_Select, { ts_incident_guid: string | null }, { ts_incident_formatted?: string }>;
  ts_isfindingsreport: WebAttribute<ts_File_Select, { ts_isfindingsreport: boolean | null }, {  }>;
  ts_msdyn_workorder_guid: WebAttribute<ts_File_Select, { ts_msdyn_workorder_guid: string | null }, { ts_msdyn_workorder_formatted?: string }>;
  ts_ovs_operation_guid: WebAttribute<ts_File_Select, { ts_ovs_operation_guid: string | null }, { ts_ovs_operation_formatted?: string }>;
  ts_programaccessteamnameid: WebAttribute<ts_File_Select, { ts_programaccessteamnameid: string | null }, {  }>;
  ts_securityincident_guid: WebAttribute<ts_File_Select, { ts_securityincident_guid: string | null }, { ts_securityincident_formatted?: string }>;
  ts_sensitivitylevel: WebAttribute<ts_File_Select, { ts_sensitivitylevel: ts_sensitivitylevel | null }, { ts_sensitivitylevel_formatted?: string }>;
  ts_sharepointfileidentifier: WebAttribute<ts_File_Select, { ts_sharepointfileidentifier: string | null }, {  }>;
  ts_sharepointlink: WebAttribute<ts_File_Select, { ts_sharepointlink: string | null }, {  }>;
  ts_site_guid: WebAttribute<ts_File_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_site_site_guid: WebAttribute<ts_File_Select, { ts_site_site_guid: string | null }, { ts_site_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_File_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_trip_guid: WebAttribute<ts_File_Select, { ts_trip_guid: string | null }, { ts_trip_formatted?: string }>;
  ts_uploadedtosharepoint: WebAttribute<ts_File_Select, { ts_uploadedtosharepoint: boolean | null }, {  }>;
  ts_visibletootherprograms: WebAttribute<ts_File_Select, { ts_visibletootherprograms: boolean | null }, {  }>;
  ts_workorderservicetask_guid: WebAttribute<ts_File_Select, { ts_workorderservicetask_guid: string | null }, { ts_workorderservicetask_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_File_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_File_Select, { versionnumber: number | null }, {  }>;
}
interface ts_File_Filter {
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
  statecode: ts_file_statecode;
  statuscode: ts_file_statuscode;
  timezoneruleversionnumber: number;
  ts_action_guid: XQW.Guid;
  ts_description: string;
  ts_documenttype: ts_documenttype;
  ts_exemption_guid: XQW.Guid;
  ts_file: string;
  ts_filecategory_guid: XQW.Guid;
  ts_filecontext: ts_filecontext;
  ts_fileid: XQW.Guid;
  ts_filesubcategory_guid: XQW.Guid;
  ts_filesubcontext: ts_filesubcontext;
  ts_filetype: string;
  ts_finding_guid: XQW.Guid;
  ts_formintegrationid: string;
  ts_incident_guid: XQW.Guid;
  ts_isfindingsreport: boolean;
  ts_msdyn_workorder_guid: XQW.Guid;
  ts_ovs_operation_guid: XQW.Guid;
  ts_programaccessteamnameid: string;
  ts_securityincident_guid: XQW.Guid;
  ts_sensitivitylevel: ts_sensitivitylevel;
  ts_sharepointfileidentifier: string;
  ts_sharepointlink: string;
  ts_site_guid: XQW.Guid;
  ts_site_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_trip_guid: XQW.Guid;
  ts_uploadedtosharepoint: boolean;
  ts_visibletootherprograms: boolean;
  ts_workorderservicetask_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_File_Expand {
  createdby: WebExpand<ts_File_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_File_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_File_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_File_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_File_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_File_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_File_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Action: WebExpand<ts_File_Expand, ts_action_Select, ts_action_Filter, { ts_Action: ts_action_Result }>;
  ts_File_Team_Team: WebExpand<ts_File_Expand, Team_Select, Team_Filter, { ts_File_Team_Team: Team_Result[] }>;
  ts_Files_Accounts: WebExpand<ts_File_Expand, Account_Select, Account_Filter, { ts_Files_Accounts: Account_Result[] }>;
  ts_Files_Incidents: WebExpand<ts_File_Expand, Incident_Select, Incident_Filter, { ts_Files_Incidents: Incident_Result[] }>;
  ts_Files_msdyn_FunctionalLocations: WebExpand<ts_File_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Files_msdyn_FunctionalLocations: msdyn_FunctionalLocation_Result[] }>;
  ts_Files_msdyn_workorders: WebExpand<ts_File_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_Files_msdyn_workorders: msdyn_workorder_Result[] }>;
  ts_Files_msdyn_workorderservicetasks: WebExpand<ts_File_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_Files_msdyn_workorderservicetasks: msdyn_workorderservicetask_Result[] }>;
  ts_Files_ovs_operations: WebExpand<ts_File_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_Files_ovs_operations: ovs_operation_Result[] }>;
  ts_Finding: WebExpand<ts_File_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_Finding: ovs_Finding_Result }>;
  ts_Incident: WebExpand<ts_File_Expand, Incident_Select, Incident_Filter, { ts_Incident: Incident_Result }>;
  ts_SecurityIncident: WebExpand<ts_File_Expand, ts_securityincident_Select, ts_securityincident_Filter, { ts_SecurityIncident: ts_securityincident_Result }>;
  ts_Site: WebExpand<ts_File_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Site: msdyn_FunctionalLocation_Result }>;
  ts_Site_Site: WebExpand<ts_File_Expand, ts_site_Select, ts_site_Filter, { ts_Site_Site: ts_site_Result }>;
  ts_Stakeholder: WebExpand<ts_File_Expand, Account_Select, Account_Filter, { ts_Stakeholder: Account_Result }>;
  ts_Trip: WebExpand<ts_File_Expand, ts_trip_Select, ts_trip_Filter, { ts_Trip: ts_trip_Result }>;
  ts_file_connections1: WebExpand<ts_File_Expand, Connection_Select, Connection_Filter, { ts_file_connections1: Connection_Result[] }>;
  ts_file_connections2: WebExpand<ts_File_Expand, Connection_Select, Connection_Filter, { ts_file_connections2: Connection_Result[] }>;
  ts_msdyn_workorder: WebExpand<ts_File_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder: msdyn_workorder_Result }>;
  ts_ovs_Finding_File_ts_File: WebExpand<ts_File_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_File_ts_File: ovs_Finding_Result[] }>;
  ts_ovs_Finding_ts_File_ts_File: WebExpand<ts_File_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_ts_File_ts_File: ovs_Finding_Result[] }>;
  ts_ovs_operation: WebExpand<ts_File_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation: ovs_operation_Result }>;
  ts_site_ts_file: WebExpand<ts_File_Expand, ts_site_Select, ts_site_Filter, { ts_site_ts_file: ts_site_Result[] }>;
  ts_ts_file_ts_trip: WebExpand<ts_File_Expand, ts_trip_Select, ts_trip_Filter, { ts_ts_file_ts_trip: ts_trip_Result[] }>;
  ts_workorderservicetask: WebExpand<ts_File_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_workorderservicetask: msdyn_workorderservicetask_Result }>;
}
interface ts_File_FormattedResult {
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
  ts_documenttype_formatted?: string;
  ts_exemption_formatted?: string;
  ts_filecategory_formatted?: string;
  ts_filecontext_formatted?: string;
  ts_filesubcategory_formatted?: string;
  ts_filesubcontext_formatted?: string;
  ts_finding_formatted?: string;
  ts_incident_formatted?: string;
  ts_msdyn_workorder_formatted?: string;
  ts_ovs_operation_formatted?: string;
  ts_securityincident_formatted?: string;
  ts_sensitivitylevel_formatted?: string;
  ts_site_formatted?: string;
  ts_site_site_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_trip_formatted?: string;
  ts_workorderservicetask_formatted?: string;
}
interface ts_File_Result extends ts_File_Base, ts_File_Relationships {
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
  ts_exemption_guid: string | null;
  ts_filecategory_guid: string | null;
  ts_filesubcategory_guid: string | null;
  ts_finding_guid: string | null;
  ts_incident_guid: string | null;
  ts_msdyn_workorder_guid: string | null;
  ts_ovs_operation_guid: string | null;
  ts_securityincident_guid: string | null;
  ts_site_guid: string | null;
  ts_site_site_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_trip_guid: string | null;
  ts_workorderservicetask_guid: string | null;
}
interface ts_File_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Action: WebMappingRetrieve<ts_action_Select,ts_action_Expand,ts_action_Filter,ts_action_Fixed,ts_action_Result,ts_action_FormattedResult>;
  ts_Finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_Incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_SecurityIncident: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
  ts_Site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Site_Site: WebMappingRetrieve<ts_site_Select,ts_site_Expand,ts_site_Filter,ts_site_Fixed,ts_site_Result,ts_site_FormattedResult>;
  ts_Stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Trip: WebMappingRetrieve<ts_trip_Select,ts_trip_Expand,ts_trip_Filter,ts_trip_Fixed,ts_trip_Result,ts_trip_FormattedResult>;
  ts_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_workorderservicetask: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface ts_File_RelatedMany {
  ts_File_Team_Team: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ts_Files_Accounts: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Files_Incidents: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_Files_msdyn_FunctionalLocations: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Files_msdyn_workorders: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_Files_msdyn_workorderservicetasks: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  ts_Files_ovs_operations: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_file_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_file_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_ovs_Finding_File_ts_File: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_ovs_Finding_ts_File_ts_File: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_site_ts_file: WebMappingRetrieve<ts_site_Select,ts_site_Expand,ts_site_Filter,ts_site_Fixed,ts_site_Result,ts_site_FormattedResult>;
  ts_ts_file_ts_trip: WebMappingRetrieve<ts_trip_Select,ts_trip_Expand,ts_trip_Filter,ts_trip_Fixed,ts_trip_Result,ts_trip_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files: WebMappingRelated<ts_File_RelatedOne,ts_File_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files: WebMappingCUDA<ts_File_Create,ts_File_Update,ts_File_Select>;
}
