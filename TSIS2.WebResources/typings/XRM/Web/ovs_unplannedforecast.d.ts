interface ovs_UnplannedForecast_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_actual?: number | null;
  ovs_capacity?: number | null;
  ovs_forecast?: number | null;
  ovs_name?: string | null;
  ovs_unplannedforecastid?: string | null;
  ovs_variance?: number | null;
  statecode?: ovs_unplannedforecast_statecode | null;
  statuscode?: ovs_unplannedforecast_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_UnplannedForecast_Relationships {
  ovs_FiscalYear?: tc_TCFiscalYear_Result | null;
  ovs_Quarter?: tc_TCFiscalQuarter_Result | null;
  ovs_Region?: Territory_Result | null;
}
interface ovs_UnplannedForecast extends ovs_UnplannedForecast_Base, ovs_UnplannedForecast_Relationships {
  ovs_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ovs_Quarter_bind$tc_tcfiscalquarters?: string | null;
  ovs_Region_bind$territories?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_UnplannedForecast_Create extends ovs_UnplannedForecast {
}
interface ovs_UnplannedForecast_Update extends ovs_UnplannedForecast {
}
interface ovs_UnplannedForecast_Select {
  createdby_guid: WebAttribute<ovs_UnplannedForecast_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_UnplannedForecast_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_UnplannedForecast_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_UnplannedForecast_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_UnplannedForecast_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_UnplannedForecast_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_UnplannedForecast_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_UnplannedForecast_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_actual: WebAttribute<ovs_UnplannedForecast_Select, { ovs_actual: number | null }, {  }>;
  ovs_capacity: WebAttribute<ovs_UnplannedForecast_Select, { ovs_capacity: number | null }, {  }>;
  ovs_fiscalyear_guid: WebAttribute<ovs_UnplannedForecast_Select, { ovs_fiscalyear_guid: string | null }, { ovs_fiscalyear_formatted?: string }>;
  ovs_forecast: WebAttribute<ovs_UnplannedForecast_Select, { ovs_forecast: number | null }, {  }>;
  ovs_name: WebAttribute<ovs_UnplannedForecast_Select, { ovs_name: string | null }, {  }>;
  ovs_quarter_guid: WebAttribute<ovs_UnplannedForecast_Select, { ovs_quarter_guid: string | null }, { ovs_quarter_formatted?: string }>;
  ovs_region_guid: WebAttribute<ovs_UnplannedForecast_Select, { ovs_region_guid: string | null }, { ovs_region_formatted?: string }>;
  ovs_unplannedforecastid: WebAttribute<ovs_UnplannedForecast_Select, { ovs_unplannedforecastid: string | null }, {  }>;
  ovs_variance: WebAttribute<ovs_UnplannedForecast_Select, { ovs_variance: number | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_UnplannedForecast_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_UnplannedForecast_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_UnplannedForecast_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_UnplannedForecast_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_UnplannedForecast_Select, { statecode: ovs_unplannedforecast_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_UnplannedForecast_Select, { statuscode: ovs_unplannedforecast_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_UnplannedForecast_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_UnplannedForecast_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_UnplannedForecast_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_UnplannedForecast_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_actual: number;
  ovs_capacity: number;
  ovs_fiscalyear_guid: XQW.Guid;
  ovs_forecast: number;
  ovs_name: string;
  ovs_quarter_guid: XQW.Guid;
  ovs_region_guid: XQW.Guid;
  ovs_unplannedforecastid: XQW.Guid;
  ovs_variance: number;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_unplannedforecast_statecode;
  statuscode: ovs_unplannedforecast_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_UnplannedForecast_Expand {
  createdby: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_FiscalYear: WebExpand<ovs_UnplannedForecast_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ovs_FiscalYear: tc_TCFiscalYear_Result }>;
  ovs_Quarter: WebExpand<ovs_UnplannedForecast_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { ovs_Quarter: tc_TCFiscalQuarter_Result }>;
  ovs_Region: WebExpand<ovs_UnplannedForecast_Expand, Territory_Select, Territory_Filter, { ovs_Region: Territory_Result }>;
  ownerid: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_UnplannedForecast_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_UnplannedForecast_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ovs_UnplannedForecast_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_fiscalyear_formatted?: string;
  ovs_quarter_formatted?: string;
  ovs_region_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface ovs_UnplannedForecast_Result extends ovs_UnplannedForecast_Base, ovs_UnplannedForecast_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ovs_fiscalyear_guid: string | null;
  ovs_quarter_guid: string | null;
  ovs_region_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface ovs_UnplannedForecast_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ovs_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ovs_Quarter: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  ovs_Region: WebMappingRetrieve<Territory_Select,Territory_Expand,Territory_Filter,Territory_Fixed,Territory_Result,Territory_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_UnplannedForecast_RelatedMany {
}
interface WebEntitiesRetrieve {
  ovs_unplannedforecasts: WebMappingRetrieve<ovs_UnplannedForecast_Select,ovs_UnplannedForecast_Expand,ovs_UnplannedForecast_Filter,ovs_UnplannedForecast_Fixed,ovs_UnplannedForecast_Result,ovs_UnplannedForecast_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_unplannedforecasts: WebMappingRelated<ovs_UnplannedForecast_RelatedOne,ovs_UnplannedForecast_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_unplannedforecasts: WebMappingCUDA<ovs_UnplannedForecast_Create,ovs_UnplannedForecast_Update,ovs_UnplannedForecast_Select>;
}
