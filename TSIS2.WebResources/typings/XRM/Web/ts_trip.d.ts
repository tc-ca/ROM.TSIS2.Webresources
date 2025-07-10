interface ts_trip_Base extends WebEntity {
  createdon?: Date | null;
  exchangerate?: number | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_trip_statecode | null;
  statuscode?: ts_trip_statuscode | null;
  timezoneruleversionnumber?: number | null;
  transactioncurrencyid_guid?: string | null;
  ts_actualcost?: number | null;
  ts_actualcost_base?: number | null;
  ts_costexplanation?: string | null;
  ts_estimatedcost?: number | null;
  ts_estimatedcost_base?: number | null;
  ts_estimatedduration?: number | null;
  ts_estimatedduration_date?: Date | null;
  ts_estimatedduration_state?: number | null;
  ts_estimatedtraveltime?: number | null;
  ts_id?: string | null;
  ts_name?: string | null;
  ts_plannedcost?: number | null;
  ts_plannedcost_base?: number | null;
  ts_traveltime?: number | null;
  ts_tripid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_trip_Relationships {
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
  ts_trip_msdyn_workorder_trip?: msdyn_workorder_Result[] | null;
  ts_ts_file_ts_trip?: ts_File_Result[] | null;
  ts_ts_trip_ts_suggestedinspection_Trip?: ts_SuggestedInspection_Result[] | null;
}
interface ts_trip extends ts_trip_Base, ts_trip_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_Region_bind$territories?: string | null;
  ts_plannedfiscalquarter_bind$tc_tcfiscalquarters?: string | null;
}
interface ts_trip_Create extends ts_trip {
}
interface ts_trip_Update extends ts_trip {
}
interface ts_trip_Select {
  createdby_guid: WebAttribute<ts_trip_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_trip_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_trip_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  exchangerate: WebAttribute<ts_trip_Select, { exchangerate: number | null }, {  }>;
  importsequencenumber: WebAttribute<ts_trip_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_trip_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_trip_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_trip_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_trip_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_trip_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_trip_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_trip_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_trip_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_trip_Select, { statecode: ts_trip_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_trip_Select, { statuscode: ts_trip_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_trip_Select, { timezoneruleversionnumber: number | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<ts_trip_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  ts_actualcost: WebAttribute<ts_trip_Select, { ts_actualcost: number | null; transactioncurrencyid_guid: string | null }, { ts_actualcost_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_actualcost_base: WebAttribute<ts_trip_Select, { ts_actualcost_base: number | null; transactioncurrencyid_guid: string | null }, { ts_actualcost_base_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_costexplanation: WebAttribute<ts_trip_Select, { ts_costexplanation: string | null }, {  }>;
  ts_estimatedcost: WebAttribute<ts_trip_Select, { ts_estimatedcost: number | null; transactioncurrencyid_guid: string | null }, { ts_estimatedcost_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_estimatedcost_base: WebAttribute<ts_trip_Select, { ts_estimatedcost_base: number | null; transactioncurrencyid_guid: string | null }, { ts_estimatedcost_base_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_estimatedduration: WebAttribute<ts_trip_Select, { ts_estimatedduration: number | null }, {  }>;
  ts_estimatedduration_date: WebAttribute<ts_trip_Select, { ts_estimatedduration_date: Date | null }, { ts_estimatedduration_date_formatted?: string }>;
  ts_estimatedduration_state: WebAttribute<ts_trip_Select, { ts_estimatedduration_state: number | null }, {  }>;
  ts_estimatedtraveltime: WebAttribute<ts_trip_Select, { ts_estimatedtraveltime: number | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_trip_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_id: WebAttribute<ts_trip_Select, { ts_id: string | null }, {  }>;
  ts_name: WebAttribute<ts_trip_Select, { ts_name: string | null }, {  }>;
  ts_plannedcost: WebAttribute<ts_trip_Select, { ts_plannedcost: number | null; transactioncurrencyid_guid: string | null }, { ts_plannedcost_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_plannedcost_base: WebAttribute<ts_trip_Select, { ts_plannedcost_base: number | null; transactioncurrencyid_guid: string | null }, { ts_plannedcost_base_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_plannedfiscalquarter_guid: WebAttribute<ts_trip_Select, { ts_plannedfiscalquarter_guid: string | null }, { ts_plannedfiscalquarter_formatted?: string }>;
  ts_region_guid: WebAttribute<ts_trip_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_traveltime: WebAttribute<ts_trip_Select, { ts_traveltime: number | null }, {  }>;
  ts_tripid: WebAttribute<ts_trip_Select, { ts_tripid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_trip_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_trip_Select, { versionnumber: number | null }, {  }>;
}
interface ts_trip_Filter {
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
  statecode: ts_trip_statecode;
  statuscode: ts_trip_statuscode;
  timezoneruleversionnumber: number;
  transactioncurrencyid_guid: XQW.Guid;
  ts_actualcost: number;
  ts_actualcost_base: number;
  ts_costexplanation: string;
  ts_estimatedcost: number;
  ts_estimatedcost_base: number;
  ts_estimatedduration: number;
  ts_estimatedduration_date: Date;
  ts_estimatedduration_state: number;
  ts_estimatedtraveltime: any;
  ts_fiscalyear_guid: XQW.Guid;
  ts_id: string;
  ts_name: string;
  ts_plannedcost: number;
  ts_plannedcost_base: number;
  ts_plannedfiscalquarter_guid: XQW.Guid;
  ts_region_guid: XQW.Guid;
  ts_traveltime: any;
  ts_tripid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_trip_Expand {
  createdby: WebExpand<ts_trip_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_trip_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_trip_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_trip_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_trip_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_trip_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_trip_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_FiscalYear: WebExpand<ts_trip_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
  ts_plannedfiscalquarter: WebExpand<ts_trip_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { ts_plannedfiscalquarter: tc_TCFiscalQuarter_Result }>;
  ts_trip_msdyn_workorder_trip: WebExpand<ts_trip_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_trip_msdyn_workorder_trip: msdyn_workorder_Result[] }>;
  ts_ts_file_ts_trip: WebExpand<ts_trip_Expand, ts_File_Select, ts_File_Filter, { ts_ts_file_ts_trip: ts_File_Result[] }>;
  ts_ts_trip_ts_suggestedinspection_Trip: WebExpand<ts_trip_Expand, ts_SuggestedInspection_Select, ts_SuggestedInspection_Filter, { ts_ts_trip_ts_suggestedinspection_Trip: ts_SuggestedInspection_Result[] }>;
}
interface ts_trip_FormattedResult {
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
  ts_actualcost_base_formatted?: string;
  ts_actualcost_formatted?: string;
  ts_estimatedcost_base_formatted?: string;
  ts_estimatedcost_formatted?: string;
  ts_estimatedduration_date_formatted?: string;
  ts_fiscalyear_formatted?: string;
  ts_plannedcost_base_formatted?: string;
  ts_plannedcost_formatted?: string;
  ts_plannedfiscalquarter_formatted?: string;
  ts_region_formatted?: string;
}
interface ts_trip_Result extends ts_trip_Base, ts_trip_Relationships {
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
  ts_fiscalyear_guid: string | null;
  ts_plannedfiscalquarter_guid: string | null;
  ts_region_guid: string | null;
}
interface ts_trip_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_plannedfiscalquarter: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
}
interface ts_trip_RelatedMany {
  ts_trip_msdyn_workorder_trip: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_ts_file_ts_trip: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
  ts_ts_trip_ts_suggestedinspection_Trip: WebMappingRetrieve<ts_SuggestedInspection_Select,ts_SuggestedInspection_Expand,ts_SuggestedInspection_Filter,ts_SuggestedInspection_Fixed,ts_SuggestedInspection_Result,ts_SuggestedInspection_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_trips: WebMappingRetrieve<ts_trip_Select,ts_trip_Expand,ts_trip_Filter,ts_trip_Fixed,ts_trip_Result,ts_trip_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_trips: WebMappingRelated<ts_trip_RelatedOne,ts_trip_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_trips: WebMappingCUDA<ts_trip_Create,ts_trip_Update,ts_trip_Select>;
}
