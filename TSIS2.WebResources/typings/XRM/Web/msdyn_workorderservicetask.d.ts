interface msdyn_workorderservicetask_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_actualduration?: number | null;
  msdyn_description?: string | null;
  msdyn_estimatedduration?: number | null;
  msdyn_inspectionenabled?: boolean | null;
  msdyn_inspectionresult?: msdyn_msdyn_workorderservicetask_msdyn_inspectionresult | null;
  msdyn_inspectiontaskresult?: msdyn_inspectionresult | null;
  msdyn_internalflags?: string | null;
  msdyn_lineorder?: number | null;
  msdyn_name?: string | null;
  msdyn_percentcomplete?: number | null;
  msdyn_surveyboundedoutput?: string | null;
  msdyn_workorderservicetaskid?: string | null;
  overriddencreatedon?: Date | null;
  ovs_isquestionnairecomplete?: boolean | null;
  ovs_questionnairedefinition?: string | null;
  ovs_questionnaireresponse?: string | null;
  ovs_questionnaireresultjson?: string | null;
  qm_blobpath?: string | null;
  qm_isquestionnaireupdated?: boolean | null;
  statecode?: msdyn_workorderservicetask_statecode | null;
  statuscode?: msdyn_workorderservicetask_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_workorderservicetask_Relationships {
  msdyn_workorderservicetask_Appointments?: Appointment_Result[] | null;
  msdyn_workorderservicetask_ServiceAppointments?: ServiceAppointment_Result[] | null;
  msdyn_workorderservicetask_connections1?: Connection_Result[] | null;
  msdyn_workorderservicetask_connections2?: Connection_Result[] | null;
  ovs_CaseId?: Incident_Result | null;
  ovs_Questionnaire?: ovs_Questionnaire_Result | null;
}
interface msdyn_workorderservicetask extends msdyn_workorderservicetask_Base, msdyn_workorderservicetask_Relationships {
  msdyn_Inspection_bind$msdyn_inspections?: string | null;
  msdyn_agreementbookingservicetask_bind$msdyn_agreementbookingservicetasks?: string | null;
  msdyn_booking_bind$bookableresourcebookings?: string | null;
  msdyn_customerasset_bind$msdyn_customerassets?: string | null;
  msdyn_inspectiondefinitionid_bind$msdyn_inspectiondefinitions?: string | null;
  msdyn_inspectionresponseid_bind$msdyn_inspectionresponses?: string | null;
  msdyn_tasktype_bind$msdyn_servicetasktypes?: string | null;
  msdyn_workorder_bind$msdyn_workorders?: string | null;
  msdyn_workorderincident_bind$msdyn_workorderincidents?: string | null;
  ovs_CaseId_bind$incidents?: string | null;
  ovs_Questionnaire_bind$ovs_questionnaires?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_workorderservicetask_Create extends msdyn_workorderservicetask {
}
interface msdyn_workorderservicetask_Update extends msdyn_workorderservicetask {
}
interface msdyn_workorderservicetask_Select {
  createdby_guid: WebAttribute<msdyn_workorderservicetask_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_workorderservicetask_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_workorderservicetask_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_workorderservicetask_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_workorderservicetask_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_workorderservicetask_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_workorderservicetask_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_actualduration: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_actualduration: number | null }, {  }>;
  msdyn_agreementbookingservicetask_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_agreementbookingservicetask_guid: string | null }, { msdyn_agreementbookingservicetask_formatted?: string }>;
  msdyn_booking_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_booking_guid: string | null }, { msdyn_booking_formatted?: string }>;
  msdyn_customerasset_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_customerasset_guid: string | null }, { msdyn_customerasset_formatted?: string }>;
  msdyn_description: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_description: string | null }, {  }>;
  msdyn_estimatedduration: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_estimatedduration: number | null }, {  }>;
  msdyn_inspection_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspection_guid: string | null }, { msdyn_inspection_formatted?: string }>;
  msdyn_inspectiondefinitionid_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspectiondefinitionid_guid: string | null }, { msdyn_inspectiondefinitionid_formatted?: string }>;
  msdyn_inspectionenabled: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspectionenabled: boolean | null }, {  }>;
  msdyn_inspectionresponseid_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspectionresponseid_guid: string | null }, { msdyn_inspectionresponseid_formatted?: string }>;
  msdyn_inspectionresult: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspectionresult: msdyn_msdyn_workorderservicetask_msdyn_inspectionresult | null }, { msdyn_inspectionresult_formatted?: string }>;
  msdyn_inspectiontaskresult: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_inspectiontaskresult: msdyn_inspectionresult | null }, { msdyn_inspectiontaskresult_formatted?: string }>;
  msdyn_internalflags: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_internalflags: string | null }, {  }>;
  msdyn_lineorder: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_lineorder: number | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_name: string | null }, {  }>;
  msdyn_percentcomplete: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_percentcomplete: number | null }, {  }>;
  msdyn_surveyboundedoutput: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_surveyboundedoutput: string | null }, {  }>;
  msdyn_tasktype_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_tasktype_guid: string | null }, { msdyn_tasktype_formatted?: string }>;
  msdyn_workorder_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_workorder_guid: string | null }, { msdyn_workorder_formatted?: string }>;
  msdyn_workorderincident_guid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_workorderincident_guid: string | null }, { msdyn_workorderincident_formatted?: string }>;
  msdyn_workorderservicetaskid: WebAttribute<msdyn_workorderservicetask_Select, { msdyn_workorderservicetaskid: string | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_workorderservicetask_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_caseid_guid: WebAttribute<msdyn_workorderservicetask_Select, { ovs_caseid_guid: string | null }, { ovs_caseid_formatted?: string }>;
  ovs_isquestionnairecomplete: WebAttribute<msdyn_workorderservicetask_Select, { ovs_isquestionnairecomplete: boolean | null }, {  }>;
  ovs_questionnaire_guid: WebAttribute<msdyn_workorderservicetask_Select, { ovs_questionnaire_guid: string | null }, { ovs_questionnaire_formatted?: string }>;
  ovs_questionnairedefinition: WebAttribute<msdyn_workorderservicetask_Select, { ovs_questionnairedefinition: string | null }, {  }>;
  ovs_questionnaireresponse: WebAttribute<msdyn_workorderservicetask_Select, { ovs_questionnaireresponse: string | null }, {  }>;
  ovs_questionnaireresultjson: WebAttribute<msdyn_workorderservicetask_Select, { ovs_questionnaireresultjson: string | null }, {  }>;
  ownerid_guid: WebAttribute<msdyn_workorderservicetask_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_workorderservicetask_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_workorderservicetask_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_workorderservicetask_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  qm_blobpath: WebAttribute<msdyn_workorderservicetask_Select, { qm_blobpath: string | null }, {  }>;
  qm_isquestionnaireupdated: WebAttribute<msdyn_workorderservicetask_Select, { qm_isquestionnaireupdated: boolean | null }, {  }>;
  statecode: WebAttribute<msdyn_workorderservicetask_Select, { statecode: msdyn_workorderservicetask_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_workorderservicetask_Select, { statuscode: msdyn_workorderservicetask_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_workorderservicetask_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_workorderservicetask_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_workorderservicetask_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_workorderservicetask_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_actualduration: number;
  msdyn_agreementbookingservicetask_guid: XQW.Guid;
  msdyn_booking_guid: XQW.Guid;
  msdyn_customerasset_guid: XQW.Guid;
  msdyn_description: string;
  msdyn_estimatedduration: number;
  msdyn_inspection_guid: XQW.Guid;
  msdyn_inspectiondefinitionid_guid: XQW.Guid;
  msdyn_inspectionenabled: boolean;
  msdyn_inspectionresponseid_guid: XQW.Guid;
  msdyn_inspectionresult: msdyn_msdyn_workorderservicetask_msdyn_inspectionresult;
  msdyn_inspectiontaskresult: msdyn_inspectionresult;
  msdyn_internalflags: string;
  msdyn_lineorder: number;
  msdyn_name: string;
  msdyn_percentcomplete: number;
  msdyn_surveyboundedoutput: string;
  msdyn_tasktype_guid: XQW.Guid;
  msdyn_workorder_guid: XQW.Guid;
  msdyn_workorderincident_guid: XQW.Guid;
  msdyn_workorderservicetaskid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_caseid_guid: XQW.Guid;
  ovs_isquestionnairecomplete: boolean;
  ovs_questionnaire_guid: XQW.Guid;
  ovs_questionnairedefinition: string;
  ovs_questionnaireresponse: string;
  ovs_questionnaireresultjson: string;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  qm_blobpath: string;
  qm_isquestionnaireupdated: boolean;
  statecode: msdyn_workorderservicetask_statecode;
  statuscode: msdyn_workorderservicetask_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_workorderservicetask_Expand {
  createdby: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_booking: WebExpand<msdyn_workorderservicetask_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { msdyn_booking: BookableResourceBooking_Result }>;
  msdyn_tasktype: WebExpand<msdyn_workorderservicetask_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { msdyn_tasktype: msdyn_servicetasktype_Result }>;
  msdyn_workorder: WebExpand<msdyn_workorderservicetask_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_workorder: msdyn_workorder_Result }>;
  msdyn_workorderservicetask_Appointments: WebExpand<msdyn_workorderservicetask_Expand, Appointment_Select, Appointment_Filter, { msdyn_workorderservicetask_Appointments: Appointment_Result[] }>;
  msdyn_workorderservicetask_ServiceAppointments: WebExpand<msdyn_workorderservicetask_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { msdyn_workorderservicetask_ServiceAppointments: ServiceAppointment_Result[] }>;
  msdyn_workorderservicetask_connections1: WebExpand<msdyn_workorderservicetask_Expand, Connection_Select, Connection_Filter, { msdyn_workorderservicetask_connections1: Connection_Result[] }>;
  msdyn_workorderservicetask_connections2: WebExpand<msdyn_workorderservicetask_Expand, Connection_Select, Connection_Filter, { msdyn_workorderservicetask_connections2: Connection_Result[] }>;
  ovs_CaseId: WebExpand<msdyn_workorderservicetask_Expand, Incident_Select, Incident_Filter, { ovs_CaseId: Incident_Result }>;
  ovs_Questionnaire: WebExpand<msdyn_workorderservicetask_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ovs_Questionnaire: ovs_Questionnaire_Result }>;
  ownerid: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<msdyn_workorderservicetask_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_workorderservicetask_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_agreementbookingservicetask_formatted?: string;
  msdyn_booking_formatted?: string;
  msdyn_customerasset_formatted?: string;
  msdyn_inspection_formatted?: string;
  msdyn_inspectiondefinitionid_formatted?: string;
  msdyn_inspectionresponseid_formatted?: string;
  msdyn_inspectionresult_formatted?: string;
  msdyn_inspectiontaskresult_formatted?: string;
  msdyn_tasktype_formatted?: string;
  msdyn_workorder_formatted?: string;
  msdyn_workorderincident_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_caseid_formatted?: string;
  ovs_questionnaire_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_workorderservicetask_Result extends msdyn_workorderservicetask_Base, msdyn_workorderservicetask_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_agreementbookingservicetask_guid: string | null;
  msdyn_booking_guid: string | null;
  msdyn_customerasset_guid: string | null;
  msdyn_inspection_guid: string | null;
  msdyn_inspectiondefinitionid_guid: string | null;
  msdyn_inspectionresponseid_guid: string | null;
  msdyn_tasktype_guid: string | null;
  msdyn_workorder_guid: string | null;
  msdyn_workorderincident_guid: string | null;
  ovs_caseid_guid: string | null;
  ovs_questionnaire_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_workorderservicetask_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_booking: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  msdyn_tasktype: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_CaseId: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ovs_Questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_workorderservicetask_RelatedMany {
  msdyn_workorderservicetask_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  msdyn_workorderservicetask_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  msdyn_workorderservicetask_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_workorderservicetask_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_workorderservicetasks: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_workorderservicetasks: WebMappingRelated<msdyn_workorderservicetask_RelatedOne,msdyn_workorderservicetask_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_workorderservicetasks: WebMappingCUDA<msdyn_workorderservicetask_Create,msdyn_workorderservicetask_Update,msdyn_workorderservicetask_Select>;
}
