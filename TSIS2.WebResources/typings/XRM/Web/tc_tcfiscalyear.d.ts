interface tc_TCFiscalYear_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: tc_tcfiscalyear_statecode | null;
  statuscode?: tc_tcfiscalyear_statuscode | null;
  tc_fiscalend?: Date | null;
  tc_fiscalstart?: Date | null;
  tc_fiscalyearlonglbl?: string | null;
  tc_fiscalyearnum?: string | null;
  tc_iscurrentfiscalyear?: boolean | null;
  tc_name?: string | null;
  tc_tcfiscalyearid?: string | null;
  tc_todaysdate?: Date | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface tc_TCFiscalYear_Relationships {
  ovs_msdyn_workorder_FiscalYear_tc_TCFiscalYea?: msdyn_workorder_Result[] | null;
  ovs_tc_tcfiscalyear_bookableresourcebooking?: BookableResourceBooking_Result[] | null;
  tc_TCFiscalQuarter_TCFiscalYear?: tc_TCFiscalQuarter_Result[] | null;
  ts_tc_tcfiscalyear_ts_nonoversightactivity_FiscalYear?: ts_nonoversightactivity_Result[] | null;
  ts_ts_planningdata_FiscalYear_tc_tcfiscalyea?: ts_PlanningData_Result[] | null;
  ts_ts_teamplanningdata_FiscalYear_tc_tcfisca?: ts_TeamPlanningData_Result[] | null;
}
interface tc_TCFiscalYear extends tc_TCFiscalYear_Base, tc_TCFiscalYear_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface tc_TCFiscalYear_Create extends tc_TCFiscalYear {
}
interface tc_TCFiscalYear_Update extends tc_TCFiscalYear {
}
interface tc_TCFiscalYear_Select {
  createdby_guid: WebAttribute<tc_TCFiscalYear_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<tc_TCFiscalYear_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<tc_TCFiscalYear_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<tc_TCFiscalYear_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<tc_TCFiscalYear_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<tc_TCFiscalYear_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<tc_TCFiscalYear_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<tc_TCFiscalYear_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<tc_TCFiscalYear_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<tc_TCFiscalYear_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<tc_TCFiscalYear_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<tc_TCFiscalYear_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<tc_TCFiscalYear_Select, { statecode: tc_tcfiscalyear_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<tc_TCFiscalYear_Select, { statuscode: tc_tcfiscalyear_statuscode | null }, { statuscode_formatted?: string }>;
  tc_fiscalend: WebAttribute<tc_TCFiscalYear_Select, { tc_fiscalend: Date | null }, { tc_fiscalend_formatted?: string }>;
  tc_fiscalstart: WebAttribute<tc_TCFiscalYear_Select, { tc_fiscalstart: Date | null }, { tc_fiscalstart_formatted?: string }>;
  tc_fiscalyearlonglbl: WebAttribute<tc_TCFiscalYear_Select, { tc_fiscalyearlonglbl: string | null }, {  }>;
  tc_fiscalyearnum: WebAttribute<tc_TCFiscalYear_Select, { tc_fiscalyearnum: string | null }, {  }>;
  tc_iscurrentfiscalyear: WebAttribute<tc_TCFiscalYear_Select, { tc_iscurrentfiscalyear: boolean | null }, {  }>;
  tc_name: WebAttribute<tc_TCFiscalYear_Select, { tc_name: string | null }, {  }>;
  tc_tcfiscalyearid: WebAttribute<tc_TCFiscalYear_Select, { tc_tcfiscalyearid: string | null }, {  }>;
  tc_todaysdate: WebAttribute<tc_TCFiscalYear_Select, { tc_todaysdate: Date | null }, { tc_todaysdate_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<tc_TCFiscalYear_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<tc_TCFiscalYear_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<tc_TCFiscalYear_Select, { versionnumber: number | null }, {  }>;
}
interface tc_TCFiscalYear_Filter {
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
  statecode: tc_tcfiscalyear_statecode;
  statuscode: tc_tcfiscalyear_statuscode;
  tc_fiscalend: Date;
  tc_fiscalstart: Date;
  tc_fiscalyearlonglbl: string;
  tc_fiscalyearnum: string;
  tc_iscurrentfiscalyear: boolean;
  tc_name: string;
  tc_tcfiscalyearid: XQW.Guid;
  tc_todaysdate: Date;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface tc_TCFiscalYear_Expand {
  createdby: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_msdyn_workorder_FiscalYear_tc_TCFiscalYea: WebExpand<tc_TCFiscalYear_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_FiscalYear_tc_TCFiscalYea: msdyn_workorder_Result[] }>;
  ovs_tc_tcfiscalyear_bookableresourcebooking: WebExpand<tc_TCFiscalYear_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { ovs_tc_tcfiscalyear_bookableresourcebooking: BookableResourceBooking_Result[] }>;
  ownerid: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<tc_TCFiscalYear_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<tc_TCFiscalYear_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  tc_TCFiscalQuarter_TCFiscalYear: WebExpand<tc_TCFiscalYear_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { tc_TCFiscalQuarter_TCFiscalYear: tc_TCFiscalQuarter_Result[] }>;
  ts_tc_tcfiscalyear_ts_nonoversightactivity_FiscalYear: WebExpand<tc_TCFiscalYear_Expand, ts_nonoversightactivity_Select, ts_nonoversightactivity_Filter, { ts_tc_tcfiscalyear_ts_nonoversightactivity_FiscalYear: ts_nonoversightactivity_Result[] }>;
  ts_ts_planningdata_FiscalYear_tc_tcfiscalyea: WebExpand<tc_TCFiscalYear_Expand, ts_PlanningData_Select, ts_PlanningData_Filter, { ts_ts_planningdata_FiscalYear_tc_tcfiscalyea: ts_PlanningData_Result[] }>;
  ts_ts_teamplanningdata_FiscalYear_tc_tcfisca: WebExpand<tc_TCFiscalYear_Expand, ts_TeamPlanningData_Select, ts_TeamPlanningData_Filter, { ts_ts_teamplanningdata_FiscalYear_tc_tcfisca: ts_TeamPlanningData_Result[] }>;
}
interface tc_TCFiscalYear_FormattedResult {
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
  tc_fiscalend_formatted?: string;
  tc_fiscalstart_formatted?: string;
  tc_todaysdate_formatted?: string;
}
interface tc_TCFiscalYear_Result extends tc_TCFiscalYear_Base, tc_TCFiscalYear_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface tc_TCFiscalYear_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface tc_TCFiscalYear_RelatedMany {
  ovs_msdyn_workorder_FiscalYear_tc_TCFiscalYea: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_tc_tcfiscalyear_bookableresourcebooking: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  tc_TCFiscalQuarter_TCFiscalYear: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  ts_tc_tcfiscalyear_ts_nonoversightactivity_FiscalYear: WebMappingRetrieve<ts_nonoversightactivity_Select,ts_nonoversightactivity_Expand,ts_nonoversightactivity_Filter,ts_nonoversightactivity_Fixed,ts_nonoversightactivity_Result,ts_nonoversightactivity_FormattedResult>;
  ts_ts_planningdata_FiscalYear_tc_tcfiscalyea: WebMappingRetrieve<ts_PlanningData_Select,ts_PlanningData_Expand,ts_PlanningData_Filter,ts_PlanningData_Fixed,ts_PlanningData_Result,ts_PlanningData_FormattedResult>;
  ts_ts_teamplanningdata_FiscalYear_tc_tcfisca: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface WebEntitiesRetrieve {
  tc_tcfiscalyears: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface WebEntitiesRelated {
  tc_tcfiscalyears: WebMappingRelated<tc_TCFiscalYear_RelatedOne,tc_TCFiscalYear_RelatedMany>;
}
interface WebEntitiesCUDA {
  tc_tcfiscalyears: WebMappingCUDA<tc_TCFiscalYear_Create,tc_TCFiscalYear_Update,tc_TCFiscalYear_Select>;
}
