interface msdyn_customerasset_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_alert?: boolean | null;
  msdyn_alertcount?: number | null;
  msdyn_alertcount_date?: Date | null;
  msdyn_alertcount_state?: number | null;
  msdyn_customerassetid?: string | null;
  msdyn_deviceid?: string | null;
  msdyn_lastalerttime?: Date | null;
  msdyn_lastalerttime_date?: Date | null;
  msdyn_lastalerttime_state?: number | null;
  msdyn_lastcommandsenttime?: Date | null;
  msdyn_latitude?: number | null;
  msdyn_longitude?: number | null;
  msdyn_name?: string | null;
  msdyn_registrationstatus?: msdyn_customerasset_msdyn_registrationstatus | null;
  overriddencreatedon?: Date | null;
  statecode?: msdyn_customerasset_statecode | null;
  statuscode?: msdyn_customerasset_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_customerassetenglish?: string | null;
  ts_customerassetfrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_customerasset_Relationships {
  msdyn_CustomerAssetCategory?: msdyn_customerassetcategory_Result | null;
  msdyn_FunctionalLocation?: msdyn_FunctionalLocation_Result | null;
  msdyn_customerasset_Appointments?: Appointment_Result[] | null;
  msdyn_customerasset_Emails?: Email_Result[] | null;
  msdyn_customerasset_ServiceAppointments?: ServiceAppointment_Result[] | null;
  msdyn_customerasset_connections1?: Connection_Result[] | null;
  msdyn_customerasset_connections2?: Connection_Result[] | null;
  msdyn_customerasset_ts_enforcementactions?: ts_enforcementaction_Result[] | null;
  msdyn_incident_msdyn_customerasset?: Incident_Result[] | null;
  msdyn_masterasset_msdyn_customerasset?: msdyn_customerasset_Result | null;
  msdyn_msdyn_customerasset_msdyn_customerasset_MasterAsset?: msdyn_customerasset_Result[] | null;
  msdyn_msdyn_customerasset_msdyn_customerasset_ParentAsset?: msdyn_customerasset_Result[] | null;
  msdyn_msdyn_customerasset_msdyn_workorder_CustomerAsset?: msdyn_workorder_Result[] | null;
  msdyn_msdyn_customerasset_msdyn_workorderservicetask_CustomerAsset?: msdyn_workorderservicetask_Result[] | null;
  msdyn_parentasset_msdyn_customerasset?: msdyn_customerasset_Result | null;
  msdyn_workorder_ovs_asset_msdyn_customera?: msdyn_workorder_Result[] | null;
  ts_msdyn_customerasset_msdyn_customerasset?: msdyn_customerasset_Result[] | null;
  ts_msdyn_customerasset_msdyn_workorder_msdyn?: msdyn_workorder_Result[] | null;
  ts_msdyn_customerasset_ts_workordercreationw?: ts_workordercreationwizard_Result[] | null;
}
interface msdyn_customerasset extends msdyn_customerasset_Base, msdyn_customerasset_Relationships {
  msdyn_CustomerAssetCategory_bind$msdyn_customerassetcategories?: string | null;
  msdyn_FunctionalLocation_bind$msdyn_functionallocations?: string | null;
  msdyn_LastCommandSent_bind$msdyn_iotdevicecommands?: string | null;
  msdyn_account_bind$accounts?: string | null;
  msdyn_masterasset_msdyn_customerasset_bind$msdyn_customerassets?: string | null;
  msdyn_parentasset_msdyn_customerasset_bind$msdyn_customerassets?: string | null;
  msdyn_product_bind$products?: string | null;
  msdyn_workorderproduct_bind$msdyn_workorderproducts?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_customerasset_Create extends msdyn_customerasset {
}
interface msdyn_customerasset_Update extends msdyn_customerasset {
}
interface msdyn_customerasset_Select {
  createdby_guid: WebAttribute<msdyn_customerasset_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_customerasset_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_customerasset_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_customerasset_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_customerasset_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_customerasset_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_customerasset_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_account_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_account_guid: string | null }, { msdyn_account_formatted?: string }>;
  msdyn_alert: WebAttribute<msdyn_customerasset_Select, { msdyn_alert: boolean | null }, {  }>;
  msdyn_alertcount: WebAttribute<msdyn_customerasset_Select, { msdyn_alertcount: number | null }, {  }>;
  msdyn_alertcount_date: WebAttribute<msdyn_customerasset_Select, { msdyn_alertcount_date: Date | null }, { msdyn_alertcount_date_formatted?: string }>;
  msdyn_alertcount_state: WebAttribute<msdyn_customerasset_Select, { msdyn_alertcount_state: number | null }, {  }>;
  msdyn_customerassetcategory_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_customerassetcategory_guid: string | null }, { msdyn_customerassetcategory_formatted?: string }>;
  msdyn_customerassetid: WebAttribute<msdyn_customerasset_Select, { msdyn_customerassetid: string | null }, {  }>;
  msdyn_deviceid: WebAttribute<msdyn_customerasset_Select, { msdyn_deviceid: string | null }, {  }>;
  msdyn_functionallocation_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_functionallocation_guid: string | null }, { msdyn_functionallocation_formatted?: string }>;
  msdyn_lastalerttime: WebAttribute<msdyn_customerasset_Select, { msdyn_lastalerttime: Date | null }, { msdyn_lastalerttime_formatted?: string }>;
  msdyn_lastalerttime_date: WebAttribute<msdyn_customerasset_Select, { msdyn_lastalerttime_date: Date | null }, { msdyn_lastalerttime_date_formatted?: string }>;
  msdyn_lastalerttime_state: WebAttribute<msdyn_customerasset_Select, { msdyn_lastalerttime_state: number | null }, {  }>;
  msdyn_lastcommandsent_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_lastcommandsent_guid: string | null }, { msdyn_lastcommandsent_formatted?: string }>;
  msdyn_lastcommandsenttime: WebAttribute<msdyn_customerasset_Select, { msdyn_lastcommandsenttime: Date | null }, { msdyn_lastcommandsenttime_formatted?: string }>;
  msdyn_latitude: WebAttribute<msdyn_customerasset_Select, { msdyn_latitude: number | null }, {  }>;
  msdyn_longitude: WebAttribute<msdyn_customerasset_Select, { msdyn_longitude: number | null }, {  }>;
  msdyn_masterasset_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_masterasset_guid: string | null }, { msdyn_masterasset_formatted?: string }>;
  msdyn_name: WebAttribute<msdyn_customerasset_Select, { msdyn_name: string | null }, {  }>;
  msdyn_parentasset_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_parentasset_guid: string | null }, { msdyn_parentasset_formatted?: string }>;
  msdyn_product_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_product_guid: string | null }, { msdyn_product_formatted?: string }>;
  msdyn_registrationstatus: WebAttribute<msdyn_customerasset_Select, { msdyn_registrationstatus: msdyn_customerasset_msdyn_registrationstatus | null }, { msdyn_registrationstatus_formatted?: string }>;
  msdyn_workorderproduct_guid: WebAttribute<msdyn_customerasset_Select, { msdyn_workorderproduct_guid: string | null }, { msdyn_workorderproduct_formatted?: string }>;
  overriddencreatedon: WebAttribute<msdyn_customerasset_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_customerasset_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_customerasset_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_customerasset_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_customerasset_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_customerasset_Select, { statecode: msdyn_customerasset_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_customerasset_Select, { statuscode: msdyn_customerasset_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_customerasset_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_customerassetenglish: WebAttribute<msdyn_customerasset_Select, { ts_customerassetenglish: string | null }, {  }>;
  ts_customerassetfrench: WebAttribute<msdyn_customerasset_Select, { ts_customerassetfrench: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_customerasset_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_customerasset_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_customerasset_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_account_guid: XQW.Guid;
  msdyn_alert: boolean;
  msdyn_alertcount: number;
  msdyn_alertcount_date: Date;
  msdyn_alertcount_state: number;
  msdyn_customerassetcategory_guid: XQW.Guid;
  msdyn_customerassetid: XQW.Guid;
  msdyn_deviceid: string;
  msdyn_functionallocation_guid: XQW.Guid;
  msdyn_lastalerttime: Date;
  msdyn_lastalerttime_date: Date;
  msdyn_lastalerttime_state: number;
  msdyn_lastcommandsent_guid: XQW.Guid;
  msdyn_lastcommandsenttime: Date;
  msdyn_latitude: number;
  msdyn_longitude: number;
  msdyn_masterasset_guid: XQW.Guid;
  msdyn_name: string;
  msdyn_parentasset_guid: XQW.Guid;
  msdyn_product_guid: XQW.Guid;
  msdyn_registrationstatus: msdyn_customerasset_msdyn_registrationstatus;
  msdyn_workorderproduct_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_customerasset_statecode;
  statuscode: msdyn_customerasset_statuscode;
  timezoneruleversionnumber: number;
  ts_customerassetenglish: string;
  ts_customerassetfrench: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_customerasset_Expand {
  createdby: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_CustomerAssetCategory: WebExpand<msdyn_customerasset_Expand, msdyn_customerassetcategory_Select, msdyn_customerassetcategory_Filter, { msdyn_CustomerAssetCategory: msdyn_customerassetcategory_Result }>;
  msdyn_FunctionalLocation: WebExpand<msdyn_customerasset_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { msdyn_FunctionalLocation: msdyn_FunctionalLocation_Result }>;
  msdyn_account: WebExpand<msdyn_customerasset_Expand, Account_Select, Account_Filter, { msdyn_account: Account_Result }>;
  msdyn_customerasset_Appointments: WebExpand<msdyn_customerasset_Expand, Appointment_Select, Appointment_Filter, { msdyn_customerasset_Appointments: Appointment_Result[] }>;
  msdyn_customerasset_Emails: WebExpand<msdyn_customerasset_Expand, Email_Select, Email_Filter, { msdyn_customerasset_Emails: Email_Result[] }>;
  msdyn_customerasset_ServiceAppointments: WebExpand<msdyn_customerasset_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { msdyn_customerasset_ServiceAppointments: ServiceAppointment_Result[] }>;
  msdyn_customerasset_connections1: WebExpand<msdyn_customerasset_Expand, Connection_Select, Connection_Filter, { msdyn_customerasset_connections1: Connection_Result[] }>;
  msdyn_customerasset_connections2: WebExpand<msdyn_customerasset_Expand, Connection_Select, Connection_Filter, { msdyn_customerasset_connections2: Connection_Result[] }>;
  msdyn_customerasset_ts_enforcementactions: WebExpand<msdyn_customerasset_Expand, ts_enforcementaction_Select, ts_enforcementaction_Filter, { msdyn_customerasset_ts_enforcementactions: ts_enforcementaction_Result[] }>;
  msdyn_incident_msdyn_customerasset: WebExpand<msdyn_customerasset_Expand, Incident_Select, Incident_Filter, { msdyn_incident_msdyn_customerasset: Incident_Result[] }>;
  msdyn_masterasset_msdyn_customerasset: WebExpand<msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_masterasset_msdyn_customerasset: msdyn_customerasset_Result }>;
  msdyn_msdyn_customerasset_msdyn_customerasset_MasterAsset: WebExpand<msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_msdyn_customerasset_msdyn_customerasset_MasterAsset: msdyn_customerasset_Result[] }>;
  msdyn_msdyn_customerasset_msdyn_customerasset_ParentAsset: WebExpand<msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_msdyn_customerasset_msdyn_customerasset_ParentAsset: msdyn_customerasset_Result[] }>;
  msdyn_msdyn_customerasset_msdyn_workorder_CustomerAsset: WebExpand<msdyn_customerasset_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_msdyn_customerasset_msdyn_workorder_CustomerAsset: msdyn_workorder_Result[] }>;
  msdyn_msdyn_customerasset_msdyn_workorderservicetask_CustomerAsset: WebExpand<msdyn_customerasset_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { msdyn_msdyn_customerasset_msdyn_workorderservicetask_CustomerAsset: msdyn_workorderservicetask_Result[] }>;
  msdyn_parentasset_msdyn_customerasset: WebExpand<msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_parentasset_msdyn_customerasset: msdyn_customerasset_Result }>;
  msdyn_workorder_ovs_asset_msdyn_customera: WebExpand<msdyn_customerasset_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_workorder_ovs_asset_msdyn_customera: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<msdyn_customerasset_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_msdyn_customerasset_msdyn_customerasset: WebExpand<msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { ts_msdyn_customerasset_msdyn_customerasset: msdyn_customerasset_Result[] }>;
  ts_msdyn_customerasset_msdyn_workorder_msdyn: WebExpand<msdyn_customerasset_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_customerasset_msdyn_workorder_msdyn: msdyn_workorder_Result[] }>;
  ts_msdyn_customerasset_ts_workordercreationw: WebExpand<msdyn_customerasset_Expand, ts_workordercreationwizard_Select, ts_workordercreationwizard_Filter, { ts_msdyn_customerasset_ts_workordercreationw: ts_workordercreationwizard_Result[] }>;
}
interface msdyn_customerasset_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_account_formatted?: string;
  msdyn_alertcount_date_formatted?: string;
  msdyn_customerassetcategory_formatted?: string;
  msdyn_functionallocation_formatted?: string;
  msdyn_lastalerttime_date_formatted?: string;
  msdyn_lastalerttime_formatted?: string;
  msdyn_lastcommandsent_formatted?: string;
  msdyn_lastcommandsenttime_formatted?: string;
  msdyn_masterasset_formatted?: string;
  msdyn_parentasset_formatted?: string;
  msdyn_product_formatted?: string;
  msdyn_registrationstatus_formatted?: string;
  msdyn_workorderproduct_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_customerasset_Result extends msdyn_customerasset_Base, msdyn_customerasset_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_account_guid: string | null;
  msdyn_customerassetcategory_guid: string | null;
  msdyn_functionallocation_guid: string | null;
  msdyn_lastcommandsent_guid: string | null;
  msdyn_masterasset_guid: string | null;
  msdyn_parentasset_guid: string | null;
  msdyn_product_guid: string | null;
  msdyn_workorderproduct_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_customerasset_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_CustomerAssetCategory: WebMappingRetrieve<msdyn_customerassetcategory_Select,msdyn_customerassetcategory_Expand,msdyn_customerassetcategory_Filter,msdyn_customerassetcategory_Fixed,msdyn_customerassetcategory_Result,msdyn_customerassetcategory_FormattedResult>;
  msdyn_FunctionalLocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  msdyn_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  msdyn_masterasset_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  msdyn_parentasset_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_customerasset_RelatedMany {
  msdyn_customerasset_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  msdyn_customerasset_Emails: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
  msdyn_customerasset_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  msdyn_customerasset_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_customerasset_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_customerasset_ts_enforcementactions: WebMappingRetrieve<ts_enforcementaction_Select,ts_enforcementaction_Expand,ts_enforcementaction_Filter,ts_enforcementaction_Fixed,ts_enforcementaction_Result,ts_enforcementaction_FormattedResult>;
  msdyn_incident_msdyn_customerasset: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  msdyn_msdyn_customerasset_msdyn_customerasset_MasterAsset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  msdyn_msdyn_customerasset_msdyn_customerasset_ParentAsset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  msdyn_msdyn_customerasset_msdyn_workorder_CustomerAsset: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  msdyn_msdyn_customerasset_msdyn_workorderservicetask_CustomerAsset: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  msdyn_workorder_ovs_asset_msdyn_customera: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_msdyn_customerasset_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  ts_msdyn_customerasset_msdyn_workorder_msdyn: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_msdyn_customerasset_ts_workordercreationw: WebMappingRetrieve<ts_workordercreationwizard_Select,ts_workordercreationwizard_Expand,ts_workordercreationwizard_Filter,ts_workordercreationwizard_Fixed,ts_workordercreationwizard_Result,ts_workordercreationwizard_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_customerassets: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_customerassets: WebMappingRelated<msdyn_customerasset_RelatedOne,msdyn_customerasset_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_customerassets: WebMappingCUDA<msdyn_customerasset_Create,msdyn_customerasset_Update,msdyn_customerasset_Select>;
}
