interface msdyn_workorderincident_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_description?: string | null;
  msdyn_estimatedduration?: number | null;
  msdyn_incidentresolved?: boolean | null;
  msdyn_internalflags?: string | null;
  msdyn_ismobile?: boolean | null;
  msdyn_isprimary?: boolean | null;
  msdyn_itemspopulated?: boolean | null;
  msdyn_name?: string | null;
  msdyn_taskspercentcompleted?: number | null;
  msdyn_workorderincidentid?: string | null;
  overriddencreatedon?: Date | null;
  statecode?: msdyn_workorderincident_statecode | null;
  statuscode?: msdyn_workorderincident_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_workorderincident_Relationships {
  msdyn_msdyn_workorderincident_msdyn_workorderservicetask_WorkOrderIncident?: msdyn_workorderservicetask_Result[] | null;
  msdyn_workorderincident_Appointments?: Appointment_Result[] | null;
  msdyn_workorderincident_ServiceAppointments?: ServiceAppointment_Result[] | null;
  msdyn_workorderincident_connections1?: Connection_Result[] | null;
  msdyn_workorderincident_connections2?: Connection_Result[] | null;
  msdyn_workorderincident_ovs_CYActions?: ovs_CYAction_Result[] | null;
  msdyn_workorderincident_ovs_cancellationrequests?: ovs_cancellationrequest_Result[] | null;
  msdyn_workorderincident_ovs_revisedquarterrequests?: ovs_revisedquarterrequest_Result[] | null;
}
interface msdyn_workorderincident extends msdyn_workorderincident_Base, msdyn_workorderincident_Relationships {
  msdyn_FunctionalLocation_bind$msdyn_functionallocations?: string | null;
  msdyn_ResourceRequirement_bind$msdyn_resourcerequirements?: string | null;
  msdyn_agreementbookingincident_bind$msdyn_agreementbookingincidents?: string | null;
  msdyn_customerasset_bind$msdyn_customerassets?: string | null;
  msdyn_incidenttype_bind$msdyn_incidenttypes?: string | null;
  msdyn_workorder_bind$msdyn_workorders?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_workorderincident_Create extends msdyn_workorderincident {
}
interface msdyn_workorderincident_Update extends msdyn_workorderincident {
}
interface msdyn_workorderincident_Select {
  createdby_guid: WebAttribute<msdyn_workorderincident_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_workorderincident_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_workorderincident_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_workorderincident_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_workorderincident_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_workorderincident_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_workorderincident_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_agreementbookingincident_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_agreementbookingincident_guid: string | null }, { msdyn_agreementbookingincident_formatted?: string }>;
  msdyn_customerasset_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_customerasset_guid: string | null }, { msdyn_customerasset_formatted?: string }>;
  msdyn_description: WebAttribute<msdyn_workorderincident_Select, { msdyn_description: string | null }, {  }>;
  msdyn_estimatedduration: WebAttribute<msdyn_workorderincident_Select, { msdyn_estimatedduration: number | null }, {  }>;
  msdyn_functionallocation_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_functionallocation_guid: string | null }, { msdyn_functionallocation_formatted?: string }>;
  msdyn_incidentresolved: WebAttribute<msdyn_workorderincident_Select, { msdyn_incidentresolved: boolean | null }, {  }>;
  msdyn_incidenttype_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_incidenttype_guid: string | null }, { msdyn_incidenttype_formatted?: string }>;
  msdyn_internalflags: WebAttribute<msdyn_workorderincident_Select, { msdyn_internalflags: string | null }, {  }>;
  msdyn_ismobile: WebAttribute<msdyn_workorderincident_Select, { msdyn_ismobile: boolean | null }, {  }>;
  msdyn_isprimary: WebAttribute<msdyn_workorderincident_Select, { msdyn_isprimary: boolean | null }, {  }>;
  msdyn_itemspopulated: WebAttribute<msdyn_workorderincident_Select, { msdyn_itemspopulated: boolean | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_workorderincident_Select, { msdyn_name: string | null }, {  }>;
  msdyn_resourcerequirement_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_resourcerequirement_guid: string | null }, { msdyn_resourcerequirement_formatted?: string }>;
  msdyn_taskspercentcompleted: WebAttribute<msdyn_workorderincident_Select, { msdyn_taskspercentcompleted: number | null }, {  }>;
  msdyn_workorder_guid: WebAttribute<msdyn_workorderincident_Select, { msdyn_workorder_guid: string | null }, { msdyn_workorder_formatted?: string }>;
  msdyn_workorderincidentid: WebAttribute<msdyn_workorderincident_Select, { msdyn_workorderincidentid: string | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_workorderincident_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_workorderincident_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_workorderincident_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_workorderincident_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_workorderincident_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_workorderincident_Select, { statecode: msdyn_workorderincident_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_workorderincident_Select, { statuscode: msdyn_workorderincident_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_workorderincident_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_workorderincident_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_workorderincident_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_workorderincident_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_agreementbookingincident_guid: XQW.Guid;
  msdyn_customerasset_guid: XQW.Guid;
  msdyn_description: string;
  msdyn_estimatedduration: number;
  msdyn_functionallocation_guid: XQW.Guid;
  msdyn_incidentresolved: boolean;
  msdyn_incidenttype_guid: XQW.Guid;
  msdyn_internalflags: string;
  msdyn_ismobile: boolean;
  msdyn_isprimary: boolean;
  msdyn_itemspopulated: boolean;
  msdyn_name: string;
  msdyn_resourcerequirement_guid: XQW.Guid;
  msdyn_taskspercentcompleted: number;
  msdyn_workorder_guid: XQW.Guid;
  msdyn_workorderincidentid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_workorderincident_statecode;
  statuscode: msdyn_workorderincident_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_workorderincident_Expand {
  createdby: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_incidenttype: WebExpand<msdyn_workorderincident_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { msdyn_incidenttype: msdyn_incidenttype_Result }>;
  msdyn_msdyn_workorderincident_msdyn_workorderservicetask_WorkOrderIncident: WebExpand<msdyn_workorderincident_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { msdyn_msdyn_workorderincident_msdyn_workorderservicetask_WorkOrderIncident: msdyn_workorderservicetask_Result[] }>;
  msdyn_workorder: WebExpand<msdyn_workorderincident_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_workorder: msdyn_workorder_Result }>;
  msdyn_workorderincident_Appointments: WebExpand<msdyn_workorderincident_Expand, Appointment_Select, Appointment_Filter, { msdyn_workorderincident_Appointments: Appointment_Result[] }>;
  msdyn_workorderincident_ServiceAppointments: WebExpand<msdyn_workorderincident_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { msdyn_workorderincident_ServiceAppointments: ServiceAppointment_Result[] }>;
  msdyn_workorderincident_connections1: WebExpand<msdyn_workorderincident_Expand, Connection_Select, Connection_Filter, { msdyn_workorderincident_connections1: Connection_Result[] }>;
  msdyn_workorderincident_connections2: WebExpand<msdyn_workorderincident_Expand, Connection_Select, Connection_Filter, { msdyn_workorderincident_connections2: Connection_Result[] }>;
  msdyn_workorderincident_ovs_CYActions: WebExpand<msdyn_workorderincident_Expand, ovs_CYAction_Select, ovs_CYAction_Filter, { msdyn_workorderincident_ovs_CYActions: ovs_CYAction_Result[] }>;
  msdyn_workorderincident_ovs_cancellationrequests: WebExpand<msdyn_workorderincident_Expand, ovs_cancellationrequest_Select, ovs_cancellationrequest_Filter, { msdyn_workorderincident_ovs_cancellationrequests: ovs_cancellationrequest_Result[] }>;
  msdyn_workorderincident_ovs_revisedquarterrequests: WebExpand<msdyn_workorderincident_Expand, ovs_revisedquarterrequest_Select, ovs_revisedquarterrequest_Filter, { msdyn_workorderincident_ovs_revisedquarterrequests: ovs_revisedquarterrequest_Result[] }>;
  ownerid: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<msdyn_workorderincident_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<msdyn_workorderincident_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_workorderincident_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_agreementbookingincident_formatted?: string;
  msdyn_customerasset_formatted?: string;
  msdyn_functionallocation_formatted?: string;
  msdyn_incidenttype_formatted?: string;
  msdyn_resourcerequirement_formatted?: string;
  msdyn_workorder_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_workorderincident_Result extends msdyn_workorderincident_Base, msdyn_workorderincident_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_agreementbookingincident_guid: string | null;
  msdyn_customerasset_guid: string | null;
  msdyn_functionallocation_guid: string | null;
  msdyn_incidenttype_guid: string | null;
  msdyn_resourcerequirement_guid: string | null;
  msdyn_workorder_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_workorderincident_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_incidenttype: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_workorderincident_RelatedMany {
  msdyn_msdyn_workorderincident_msdyn_workorderservicetask_WorkOrderIncident: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  msdyn_workorderincident_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  msdyn_workorderincident_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  msdyn_workorderincident_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_workorderincident_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_workorderincident_ovs_CYActions: WebMappingRetrieve<ovs_CYAction_Select,ovs_CYAction_Expand,ovs_CYAction_Filter,ovs_CYAction_Fixed,ovs_CYAction_Result,ovs_CYAction_FormattedResult>;
  msdyn_workorderincident_ovs_cancellationrequests: WebMappingRetrieve<ovs_cancellationrequest_Select,ovs_cancellationrequest_Expand,ovs_cancellationrequest_Filter,ovs_cancellationrequest_Fixed,ovs_cancellationrequest_Result,ovs_cancellationrequest_FormattedResult>;
  msdyn_workorderincident_ovs_revisedquarterrequests: WebMappingRetrieve<ovs_revisedquarterrequest_Select,ovs_revisedquarterrequest_Expand,ovs_revisedquarterrequest_Filter,ovs_revisedquarterrequest_Fixed,ovs_revisedquarterrequest_Result,ovs_revisedquarterrequest_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_workorderincidents: WebMappingRetrieve<msdyn_workorderincident_Select,msdyn_workorderincident_Expand,msdyn_workorderincident_Filter,msdyn_workorderincident_Fixed,msdyn_workorderincident_Result,msdyn_workorderincident_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_workorderincidents: WebMappingRelated<msdyn_workorderincident_RelatedOne,msdyn_workorderincident_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_workorderincidents: WebMappingCUDA<msdyn_workorderincident_Create,msdyn_workorderincident_Update,msdyn_workorderincident_Select>;
}
