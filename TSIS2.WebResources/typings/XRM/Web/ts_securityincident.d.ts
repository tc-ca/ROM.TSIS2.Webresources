interface ts_securityincident_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  new_location?: string | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_securityincident_statecode | null;
  statuscode?: ts_securityincident_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_additionaldetails?: string | null;
  ts_arrests?: ts_arrestsknownorunknown | null;
  ts_arrestsdetails?: string | null;
  ts_bridgeclosure?: ts_bridgeclosure | null;
  ts_canvasapp?: string | null;
  ts_closedon?: Date | null;
  ts_comments?: string | null;
  ts_contact?: string | null;
  ts_damagestoibtproperty?: ts_damagestoibtproperty | null;
  ts_degreesminutesseconds?: string | null;
  ts_delayduration?: number | null;
  ts_delaystooperation?: ts_delaystooperation | null;
  ts_details?: string | null;
  ts_email?: string | null;
  ts_estimatedarrivaltime?: Date | null;
  ts_flightnumber?: string | null;
  ts_furtheractionrequired?: boolean | null;
  ts_incidentdatetime?: Date | null;
  ts_incidentdatetimeadjust?: Date | null;
  ts_inflight?: boolean | null;
  ts_injuries?: ts_injuries | null;
  ts_latitude?: number | null;
  ts_locationcontext?: string | null;
  ts_locationtype?: ts_locationtype | null;
  ts_longitude?: number | null;
  ts_markerpost?: string | null;
  ts_milemarker?: string | null;
  ts_mode?: ts_securityincidentmode | null;
  ts_name?: string | null;
  ts_organization?: string | null;
  ts_othercompany?: string | null;
  ts_overtime?: number | null;
  ts_owneroftherailwaylinetrack?: string | null;
  ts_phone?: string | null;
  ts_policeresponse?: boolean | null;
  ts_province?: ts_province | null;
  ts_publicorprivatecrossing?: ts_publicorprivatecrossing | null;
  ts_quarterofsitime?: ts_quarter | null;
  ts_quarterofsitraveltime?: ts_quarter | null;
  ts_recordstatus?: ts_securityincidentstatus | null;
  ts_reporteddatetime?: Date | null;
  ts_reporteddatetimeadjust?: Date | null;
  ts_reportingcompany_name?: string | null;
  ts_ruralorurban?: ts_ruralorurban | null;
  ts_securityincidentid?: string | null;
  ts_securityincidenttime?: number | null;
  ts_stakeholder_name?: string | null;
  ts_statusofrailwayowner?: ts_statusofrailwayowner | null;
  ts_statusrationale?: string | null;
  ts_subdivision?: string | null;
  ts_tamperingsubcategory?: ts_tamperingsubcategory | null;
  ts_tcomscategoryenglish?: string | null;
  ts_tcomscategoryfrench?: string | null;
  ts_tcomseventfollowupenglish?: string | null;
  ts_tcomseventfollowupfrench?: string | null;
  ts_tcomseventname?: string | null;
  ts_tcomsid?: string | null;
  ts_tcomsinteractionenglish?: string | null;
  ts_tcomsinteractionfrench?: string | null;
  ts_tcomsofficer?: string | null;
  ts_tcomsseverityenglish?: string | null;
  ts_tcomsseverityfrench?: string | null;
  ts_tcomssubcategoryenglish?: string | null;
  ts_tcomssubcategoryfrench?: string | null;
  ts_timetakenforstakeholdertoreport?: number | null;
  ts_timezone?: ts_timezone | null;
  ts_traveltime?: number | null;
  ts_yardorstationname?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_securityincident_Relationships {
  ts_AirCarrier?: Account_Result | null;
  ts_Contact_ts_securityincident_ts_securityin?: Contact_Result[] | null;
  ts_Destination?: msdyn_FunctionalLocation_Result | null;
  ts_DiversionAerodrome?: msdyn_FunctionalLocation_Result | null;
  ts_Origin?: msdyn_FunctionalLocation_Result | null;
  ts_ReportingCompany?: Account_Result | null;
  ts_Site?: msdyn_FunctionalLocation_Result | null;
  ts_Stakeholder?: Account_Result | null;
  ts_Subsite?: msdyn_FunctionalLocation_Result | null;
  ts_securityincident_Appointments?: Appointment_Result[] | null;
  ts_securityincident_Emails?: Email_Result[] | null;
  ts_securityincident_PostFollows?: PostFollow_Result[] | null;
  ts_securityincident_ServiceAppointments?: ServiceAppointment_Result[] | null;
  ts_securityincident_ts_enforcementactions?: ts_enforcementaction_Result[] | null;
  ts_ts_securityincident_msdyn_workorder_SecurityIncident?: msdyn_workorder_Result[] | null;
}
interface ts_securityincident extends ts_securityincident_Base, ts_securityincident_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_AirCarrier_bind$accounts?: string | null;
  ts_Destination_bind$msdyn_functionallocations?: string | null;
  ts_DiversionAerodrome_bind$msdyn_functionallocations?: string | null;
  ts_Origin_bind$msdyn_functionallocations?: string | null;
  ts_Region_bind$territories?: string | null;
  ts_ReportingCompany_bind$accounts?: string | null;
  ts_SecurityIncidentType_bind$ts_securityincidenttypes?: string | null;
  ts_SiteType_bind$ovs_sitetypes?: string | null;
  ts_Site_bind$msdyn_functionallocations?: string | null;
  ts_Stakeholder_bind$accounts?: string | null;
  ts_SubsiteType_bind$ovs_sitetypes?: string | null;
  ts_Subsite_bind$msdyn_functionallocations?: string | null;
  ts_TargetElement_bind$ts_targetelements?: string | null;
  ts_closedby_bind$systemusers?: string | null;
}
interface ts_securityincident_Create extends ts_securityincident {
}
interface ts_securityincident_Update extends ts_securityincident {
}
interface ts_securityincident_Select {
  createdby_guid: WebAttribute<ts_securityincident_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_securityincident_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_securityincident_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_securityincident_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_securityincident_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_securityincident_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_securityincident_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  new_location: WebAttribute<ts_securityincident_Select, { new_location: string | null }, {  }>;
  overriddencreatedon: WebAttribute<ts_securityincident_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_securityincident_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_securityincident_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_securityincident_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_securityincident_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_securityincident_Select, { statecode: ts_securityincident_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_securityincident_Select, { statuscode: ts_securityincident_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_securityincident_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_additionaldetails: WebAttribute<ts_securityincident_Select, { ts_additionaldetails: string | null }, {  }>;
  ts_aircarrier_guid: WebAttribute<ts_securityincident_Select, { ts_aircarrier_guid: string | null }, { ts_aircarrier_formatted?: string }>;
  ts_arrests: WebAttribute<ts_securityincident_Select, { ts_arrests: ts_arrestsknownorunknown | null }, { ts_arrests_formatted?: string }>;
  ts_arrestsdetails: WebAttribute<ts_securityincident_Select, { ts_arrestsdetails: string | null }, {  }>;
  ts_bridgeclosure: WebAttribute<ts_securityincident_Select, { ts_bridgeclosure: ts_bridgeclosure | null }, { ts_bridgeclosure_formatted?: string }>;
  ts_canvasapp: WebAttribute<ts_securityincident_Select, { ts_canvasapp: string | null }, {  }>;
  ts_closedby_guid: WebAttribute<ts_securityincident_Select, { ts_closedby_guid: string | null }, { ts_closedby_formatted?: string }>;
  ts_closedon: WebAttribute<ts_securityincident_Select, { ts_closedon: Date | null }, { ts_closedon_formatted?: string }>;
  ts_comments: WebAttribute<ts_securityincident_Select, { ts_comments: string | null }, {  }>;
  ts_contact: WebAttribute<ts_securityincident_Select, { ts_contact: string | null }, {  }>;
  ts_damagestoibtproperty: WebAttribute<ts_securityincident_Select, { ts_damagestoibtproperty: ts_damagestoibtproperty | null }, { ts_damagestoibtproperty_formatted?: string }>;
  ts_degreesminutesseconds: WebAttribute<ts_securityincident_Select, { ts_degreesminutesseconds: string | null }, {  }>;
  ts_delayduration: WebAttribute<ts_securityincident_Select, { ts_delayduration: number | null }, {  }>;
  ts_delaystooperation: WebAttribute<ts_securityincident_Select, { ts_delaystooperation: ts_delaystooperation | null }, { ts_delaystooperation_formatted?: string }>;
  ts_destination_guid: WebAttribute<ts_securityincident_Select, { ts_destination_guid: string | null }, { ts_destination_formatted?: string }>;
  ts_details: WebAttribute<ts_securityincident_Select, { ts_details: string | null }, {  }>;
  ts_diversionaerodrome_guid: WebAttribute<ts_securityincident_Select, { ts_diversionaerodrome_guid: string | null }, { ts_diversionaerodrome_formatted?: string }>;
  ts_email: WebAttribute<ts_securityincident_Select, { ts_email: string | null }, {  }>;
  ts_estimatedarrivaltime: WebAttribute<ts_securityincident_Select, { ts_estimatedarrivaltime: Date | null }, { ts_estimatedarrivaltime_formatted?: string }>;
  ts_flightnumber: WebAttribute<ts_securityincident_Select, { ts_flightnumber: string | null }, {  }>;
  ts_furtheractionrequired: WebAttribute<ts_securityincident_Select, { ts_furtheractionrequired: boolean | null }, {  }>;
  ts_incidentdatetime: WebAttribute<ts_securityincident_Select, { ts_incidentdatetime: Date | null }, { ts_incidentdatetime_formatted?: string }>;
  ts_incidentdatetimeadjust: WebAttribute<ts_securityincident_Select, { ts_incidentdatetimeadjust: Date | null }, { ts_incidentdatetimeadjust_formatted?: string }>;
  ts_inflight: WebAttribute<ts_securityincident_Select, { ts_inflight: boolean | null }, {  }>;
  ts_injuries: WebAttribute<ts_securityincident_Select, { ts_injuries: ts_injuries | null }, { ts_injuries_formatted?: string }>;
  ts_latitude: WebAttribute<ts_securityincident_Select, { ts_latitude: number | null }, {  }>;
  ts_locationcontext: WebAttribute<ts_securityincident_Select, { ts_locationcontext: string | null }, {  }>;
  ts_locationtype: WebAttribute<ts_securityincident_Select, { ts_locationtype: ts_locationtype | null }, { ts_locationtype_formatted?: string }>;
  ts_longitude: WebAttribute<ts_securityincident_Select, { ts_longitude: number | null }, {  }>;
  ts_markerpost: WebAttribute<ts_securityincident_Select, { ts_markerpost: string | null }, {  }>;
  ts_milemarker: WebAttribute<ts_securityincident_Select, { ts_milemarker: string | null }, {  }>;
  ts_mode: WebAttribute<ts_securityincident_Select, { ts_mode: ts_securityincidentmode | null }, { ts_mode_formatted?: string }>;
  ts_name: WebAttribute<ts_securityincident_Select, { ts_name: string | null }, {  }>;
  ts_organization: WebAttribute<ts_securityincident_Select, { ts_organization: string | null }, {  }>;
  ts_origin_guid: WebAttribute<ts_securityincident_Select, { ts_origin_guid: string | null }, { ts_origin_formatted?: string }>;
  ts_othercompany: WebAttribute<ts_securityincident_Select, { ts_othercompany: string | null }, {  }>;
  ts_overtime: WebAttribute<ts_securityincident_Select, { ts_overtime: number | null }, {  }>;
  ts_owneroftherailwaylinetrack: WebAttribute<ts_securityincident_Select, { ts_owneroftherailwaylinetrack: string | null }, {  }>;
  ts_phone: WebAttribute<ts_securityincident_Select, { ts_phone: string | null }, {  }>;
  ts_policeresponse: WebAttribute<ts_securityincident_Select, { ts_policeresponse: boolean | null }, {  }>;
  ts_province: WebAttribute<ts_securityincident_Select, { ts_province: ts_province | null }, { ts_province_formatted?: string }>;
  ts_publicorprivatecrossing: WebAttribute<ts_securityincident_Select, { ts_publicorprivatecrossing: ts_publicorprivatecrossing | null }, { ts_publicorprivatecrossing_formatted?: string }>;
  ts_quarterofsitime: WebAttribute<ts_securityincident_Select, { ts_quarterofsitime: ts_quarter | null }, { ts_quarterofsitime_formatted?: string }>;
  ts_quarterofsitraveltime: WebAttribute<ts_securityincident_Select, { ts_quarterofsitraveltime: ts_quarter | null }, { ts_quarterofsitraveltime_formatted?: string }>;
  ts_recordstatus: WebAttribute<ts_securityincident_Select, { ts_recordstatus: ts_securityincidentstatus | null }, { ts_recordstatus_formatted?: string }>;
  ts_region_guid: WebAttribute<ts_securityincident_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_reporteddatetime: WebAttribute<ts_securityincident_Select, { ts_reporteddatetime: Date | null }, { ts_reporteddatetime_formatted?: string }>;
  ts_reporteddatetimeadjust: WebAttribute<ts_securityincident_Select, { ts_reporteddatetimeadjust: Date | null }, { ts_reporteddatetimeadjust_formatted?: string }>;
  ts_reportingcompany_guid: WebAttribute<ts_securityincident_Select, { ts_reportingcompany_guid: string | null }, { ts_reportingcompany_formatted?: string }>;
  ts_reportingcompany_name: WebAttribute<ts_securityincident_Select, { ts_reportingcompany_name: string | null }, {  }>;
  ts_ruralorurban: WebAttribute<ts_securityincident_Select, { ts_ruralorurban: ts_ruralorurban | null }, { ts_ruralorurban_formatted?: string }>;
  ts_securityincidentid: WebAttribute<ts_securityincident_Select, { ts_securityincidentid: string | null }, {  }>;
  ts_securityincidenttime: WebAttribute<ts_securityincident_Select, { ts_securityincidenttime: number | null }, {  }>;
  ts_securityincidenttype_guid: WebAttribute<ts_securityincident_Select, { ts_securityincidenttype_guid: string | null }, { ts_securityincidenttype_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_securityincident_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_sitetype_guid: WebAttribute<ts_securityincident_Select, { ts_sitetype_guid: string | null }, { ts_sitetype_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_securityincident_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_stakeholder_name: WebAttribute<ts_securityincident_Select, { ts_stakeholder_name: string | null }, {  }>;
  ts_statusofrailwayowner: WebAttribute<ts_securityincident_Select, { ts_statusofrailwayowner: ts_statusofrailwayowner | null }, { ts_statusofrailwayowner_formatted?: string }>;
  ts_statusrationale: WebAttribute<ts_securityincident_Select, { ts_statusrationale: string | null }, {  }>;
  ts_subdivision: WebAttribute<ts_securityincident_Select, { ts_subdivision: string | null }, {  }>;
  ts_subsite_guid: WebAttribute<ts_securityincident_Select, { ts_subsite_guid: string | null }, { ts_subsite_formatted?: string }>;
  ts_subsitetype_guid: WebAttribute<ts_securityincident_Select, { ts_subsitetype_guid: string | null }, { ts_subsitetype_formatted?: string }>;
  ts_tamperingsubcategory: WebAttribute<ts_securityincident_Select, { ts_tamperingsubcategory: ts_tamperingsubcategory | null }, { ts_tamperingsubcategory_formatted?: string }>;
  ts_targetelement_guid: WebAttribute<ts_securityincident_Select, { ts_targetelement_guid: string | null }, { ts_targetelement_formatted?: string }>;
  ts_tcomscategoryenglish: WebAttribute<ts_securityincident_Select, { ts_tcomscategoryenglish: string | null }, {  }>;
  ts_tcomscategoryfrench: WebAttribute<ts_securityincident_Select, { ts_tcomscategoryfrench: string | null }, {  }>;
  ts_tcomseventfollowupenglish: WebAttribute<ts_securityincident_Select, { ts_tcomseventfollowupenglish: string | null }, {  }>;
  ts_tcomseventfollowupfrench: WebAttribute<ts_securityincident_Select, { ts_tcomseventfollowupfrench: string | null }, {  }>;
  ts_tcomseventname: WebAttribute<ts_securityincident_Select, { ts_tcomseventname: string | null }, {  }>;
  ts_tcomsid: WebAttribute<ts_securityincident_Select, { ts_tcomsid: string | null }, {  }>;
  ts_tcomsinteractionenglish: WebAttribute<ts_securityincident_Select, { ts_tcomsinteractionenglish: string | null }, {  }>;
  ts_tcomsinteractionfrench: WebAttribute<ts_securityincident_Select, { ts_tcomsinteractionfrench: string | null }, {  }>;
  ts_tcomsofficer: WebAttribute<ts_securityincident_Select, { ts_tcomsofficer: string | null }, {  }>;
  ts_tcomsseverityenglish: WebAttribute<ts_securityincident_Select, { ts_tcomsseverityenglish: string | null }, {  }>;
  ts_tcomsseverityfrench: WebAttribute<ts_securityincident_Select, { ts_tcomsseverityfrench: string | null }, {  }>;
  ts_tcomssubcategoryenglish: WebAttribute<ts_securityincident_Select, { ts_tcomssubcategoryenglish: string | null }, {  }>;
  ts_tcomssubcategoryfrench: WebAttribute<ts_securityincident_Select, { ts_tcomssubcategoryfrench: string | null }, {  }>;
  ts_timetakenforstakeholdertoreport: WebAttribute<ts_securityincident_Select, { ts_timetakenforstakeholdertoreport: number | null }, {  }>;
  ts_timezone: WebAttribute<ts_securityincident_Select, { ts_timezone: ts_timezone | null }, { ts_timezone_formatted?: string }>;
  ts_traveltime: WebAttribute<ts_securityincident_Select, { ts_traveltime: number | null }, {  }>;
  ts_yardorstationname: WebAttribute<ts_securityincident_Select, { ts_yardorstationname: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_securityincident_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_securityincident_Select, { versionnumber: number | null }, {  }>;
}
interface ts_securityincident_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  new_location: string;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ts_securityincident_statecode;
  statuscode: ts_securityincident_statuscode;
  timezoneruleversionnumber: number;
  ts_additionaldetails: string;
  ts_aircarrier_guid: XQW.Guid;
  ts_arrests: ts_arrestsknownorunknown;
  ts_arrestsdetails: string;
  ts_bridgeclosure: ts_bridgeclosure;
  ts_canvasapp: string;
  ts_closedby_guid: XQW.Guid;
  ts_closedon: Date;
  ts_comments: string;
  ts_contact: string;
  ts_damagestoibtproperty: ts_damagestoibtproperty;
  ts_degreesminutesseconds: string;
  ts_delayduration: number;
  ts_delaystooperation: ts_delaystooperation;
  ts_destination_guid: XQW.Guid;
  ts_details: string;
  ts_diversionaerodrome_guid: XQW.Guid;
  ts_email: string;
  ts_estimatedarrivaltime: Date;
  ts_flightnumber: string;
  ts_furtheractionrequired: boolean;
  ts_incidentdatetime: Date;
  ts_incidentdatetimeadjust: Date;
  ts_inflight: boolean;
  ts_injuries: ts_injuries;
  ts_latitude: number;
  ts_locationcontext: string;
  ts_locationtype: ts_locationtype;
  ts_longitude: number;
  ts_markerpost: string;
  ts_milemarker: string;
  ts_mode: ts_securityincidentmode;
  ts_name: string;
  ts_organization: string;
  ts_origin_guid: XQW.Guid;
  ts_othercompany: string;
  ts_overtime: any;
  ts_owneroftherailwaylinetrack: string;
  ts_phone: string;
  ts_policeresponse: boolean;
  ts_province: ts_province;
  ts_publicorprivatecrossing: ts_publicorprivatecrossing;
  ts_quarterofsitime: ts_quarter;
  ts_quarterofsitraveltime: ts_quarter;
  ts_recordstatus: ts_securityincidentstatus;
  ts_region_guid: XQW.Guid;
  ts_reporteddatetime: Date;
  ts_reporteddatetimeadjust: Date;
  ts_reportingcompany_guid: XQW.Guid;
  ts_reportingcompany_name: string;
  ts_ruralorurban: ts_ruralorurban;
  ts_securityincidentid: XQW.Guid;
  ts_securityincidenttime: any;
  ts_securityincidenttype_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_sitetype_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_stakeholder_name: string;
  ts_statusofrailwayowner: ts_statusofrailwayowner;
  ts_statusrationale: string;
  ts_subdivision: string;
  ts_subsite_guid: XQW.Guid;
  ts_subsitetype_guid: XQW.Guid;
  ts_tamperingsubcategory: ts_tamperingsubcategory;
  ts_targetelement_guid: XQW.Guid;
  ts_tcomscategoryenglish: string;
  ts_tcomscategoryfrench: string;
  ts_tcomseventfollowupenglish: string;
  ts_tcomseventfollowupfrench: string;
  ts_tcomseventname: string;
  ts_tcomsid: string;
  ts_tcomsinteractionenglish: string;
  ts_tcomsinteractionfrench: string;
  ts_tcomsofficer: string;
  ts_tcomsseverityenglish: string;
  ts_tcomsseverityfrench: string;
  ts_tcomssubcategoryenglish: string;
  ts_tcomssubcategoryfrench: string;
  ts_timetakenforstakeholdertoreport: number;
  ts_timezone: ts_timezone;
  ts_traveltime: any;
  ts_yardorstationname: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_securityincident_Expand {
  createdby: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_securityincident_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_securityincident_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_AirCarrier: WebExpand<ts_securityincident_Expand, Account_Select, Account_Filter, { ts_AirCarrier: Account_Result }>;
  ts_Contact_ts_securityincident_ts_securityin: WebExpand<ts_securityincident_Expand, Contact_Select, Contact_Filter, { ts_Contact_ts_securityincident_ts_securityin: Contact_Result[] }>;
  ts_Destination: WebExpand<ts_securityincident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Destination: msdyn_FunctionalLocation_Result }>;
  ts_DiversionAerodrome: WebExpand<ts_securityincident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_DiversionAerodrome: msdyn_FunctionalLocation_Result }>;
  ts_Origin: WebExpand<ts_securityincident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Origin: msdyn_FunctionalLocation_Result }>;
  ts_ReportingCompany: WebExpand<ts_securityincident_Expand, Account_Select, Account_Filter, { ts_ReportingCompany: Account_Result }>;
  ts_Site: WebExpand<ts_securityincident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Site: msdyn_FunctionalLocation_Result }>;
  ts_Stakeholder: WebExpand<ts_securityincident_Expand, Account_Select, Account_Filter, { ts_Stakeholder: Account_Result }>;
  ts_Subsite: WebExpand<ts_securityincident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_Subsite: msdyn_FunctionalLocation_Result }>;
  ts_closedby: WebExpand<ts_securityincident_Expand, SystemUser_Select, SystemUser_Filter, { ts_closedby: SystemUser_Result }>;
  ts_securityincident_Appointments: WebExpand<ts_securityincident_Expand, Appointment_Select, Appointment_Filter, { ts_securityincident_Appointments: Appointment_Result[] }>;
  ts_securityincident_Emails: WebExpand<ts_securityincident_Expand, Email_Select, Email_Filter, { ts_securityincident_Emails: Email_Result[] }>;
  ts_securityincident_PostFollows: WebExpand<ts_securityincident_Expand, PostFollow_Select, PostFollow_Filter, { ts_securityincident_PostFollows: PostFollow_Result[] }>;
  ts_securityincident_ServiceAppointments: WebExpand<ts_securityincident_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { ts_securityincident_ServiceAppointments: ServiceAppointment_Result[] }>;
  ts_securityincident_ts_enforcementactions: WebExpand<ts_securityincident_Expand, ts_enforcementaction_Select, ts_enforcementaction_Filter, { ts_securityincident_ts_enforcementactions: ts_enforcementaction_Result[] }>;
  ts_ts_securityincident_msdyn_workorder_SecurityIncident: WebExpand<ts_securityincident_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_ts_securityincident_msdyn_workorder_SecurityIncident: msdyn_workorder_Result[] }>;
}
interface ts_securityincident_FormattedResult {
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
  ts_aircarrier_formatted?: string;
  ts_arrests_formatted?: string;
  ts_bridgeclosure_formatted?: string;
  ts_closedby_formatted?: string;
  ts_closedon_formatted?: string;
  ts_damagestoibtproperty_formatted?: string;
  ts_delaystooperation_formatted?: string;
  ts_destination_formatted?: string;
  ts_diversionaerodrome_formatted?: string;
  ts_estimatedarrivaltime_formatted?: string;
  ts_incidentdatetime_formatted?: string;
  ts_incidentdatetimeadjust_formatted?: string;
  ts_injuries_formatted?: string;
  ts_locationtype_formatted?: string;
  ts_mode_formatted?: string;
  ts_origin_formatted?: string;
  ts_province_formatted?: string;
  ts_publicorprivatecrossing_formatted?: string;
  ts_quarterofsitime_formatted?: string;
  ts_quarterofsitraveltime_formatted?: string;
  ts_recordstatus_formatted?: string;
  ts_region_formatted?: string;
  ts_reporteddatetime_formatted?: string;
  ts_reporteddatetimeadjust_formatted?: string;
  ts_reportingcompany_formatted?: string;
  ts_ruralorurban_formatted?: string;
  ts_securityincidenttype_formatted?: string;
  ts_site_formatted?: string;
  ts_sitetype_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_statusofrailwayowner_formatted?: string;
  ts_subsite_formatted?: string;
  ts_subsitetype_formatted?: string;
  ts_tamperingsubcategory_formatted?: string;
  ts_targetelement_formatted?: string;
  ts_timezone_formatted?: string;
}
interface ts_securityincident_Result extends ts_securityincident_Base, ts_securityincident_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_aircarrier_guid: string | null;
  ts_closedby_guid: string | null;
  ts_destination_guid: string | null;
  ts_diversionaerodrome_guid: string | null;
  ts_origin_guid: string | null;
  ts_region_guid: string | null;
  ts_reportingcompany_guid: string | null;
  ts_securityincidenttype_guid: string | null;
  ts_site_guid: string | null;
  ts_sitetype_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_subsite_guid: string | null;
  ts_subsitetype_guid: string | null;
  ts_targetelement_guid: string | null;
}
interface ts_securityincident_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_AirCarrier: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Destination: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_DiversionAerodrome: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Origin: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_ReportingCompany: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_Stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Subsite: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_closedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_securityincident_RelatedMany {
  ts_Contact_ts_securityincident_ts_securityin: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ts_securityincident_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  ts_securityincident_Emails: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
  ts_securityincident_PostFollows: WebMappingRetrieve<PostFollow_Select,PostFollow_Expand,PostFollow_Filter,PostFollow_Fixed,PostFollow_Result,PostFollow_FormattedResult>;
  ts_securityincident_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  ts_securityincident_ts_enforcementactions: WebMappingRetrieve<ts_enforcementaction_Select,ts_enforcementaction_Expand,ts_enforcementaction_Filter,ts_enforcementaction_Fixed,ts_enforcementaction_Result,ts_enforcementaction_FormattedResult>;
  ts_ts_securityincident_msdyn_workorder_SecurityIncident: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_securityincidents: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_securityincidents: WebMappingRelated<ts_securityincident_RelatedOne,ts_securityincident_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_securityincidents: WebMappingCUDA<ts_securityincident_Create,ts_securityincident_Update,ts_securityincident_Select>;
}
