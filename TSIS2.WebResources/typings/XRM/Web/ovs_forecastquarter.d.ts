interface ovs_ForecastQuarter_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_enddate?: Date | null;
  ovs_forecastquarterid?: string | null;
  ovs_name?: string | null;
  ovs_numberofunplannedinspections?: string | null;
  ovs_quarternumber?: number | null;
  ovs_startdate?: Date | null;
  ovs_year?: number | null;
  statecode?: ovs_forecastquarter_statecode | null;
  statuscode?: ovs_forecastquarter_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_ForecastQuarter_Relationships {
}
interface ovs_ForecastQuarter extends ovs_ForecastQuarter_Base, ovs_ForecastQuarter_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_ForecastQuarter_Create extends ovs_ForecastQuarter {
}
interface ovs_ForecastQuarter_Update extends ovs_ForecastQuarter {
}
interface ovs_ForecastQuarter_Select {
  createdby_guid: WebAttribute<ovs_ForecastQuarter_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_ForecastQuarter_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_ForecastQuarter_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_ForecastQuarter_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_ForecastQuarter_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_ForecastQuarter_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_ForecastQuarter_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_ForecastQuarter_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_enddate: WebAttribute<ovs_ForecastQuarter_Select, { ovs_enddate: Date | null }, { ovs_enddate_formatted?: string }>;
  ovs_forecastquarterid: WebAttribute<ovs_ForecastQuarter_Select, { ovs_forecastquarterid: string | null }, {  }>;
  ovs_name: WebAttribute<ovs_ForecastQuarter_Select, { ovs_name: string | null }, {  }>;
  ovs_numberofunplannedinspections: WebAttribute<ovs_ForecastQuarter_Select, { ovs_numberofunplannedinspections: string | null }, {  }>;
  ovs_quarternumber: WebAttribute<ovs_ForecastQuarter_Select, { ovs_quarternumber: number | null }, {  }>;
  ovs_startdate: WebAttribute<ovs_ForecastQuarter_Select, { ovs_startdate: Date | null }, { ovs_startdate_formatted?: string }>;
  ovs_year: WebAttribute<ovs_ForecastQuarter_Select, { ovs_year: number | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_ForecastQuarter_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_ForecastQuarter_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_ForecastQuarter_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_ForecastQuarter_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_ForecastQuarter_Select, { statecode: ovs_forecastquarter_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_ForecastQuarter_Select, { statuscode: ovs_forecastquarter_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_ForecastQuarter_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_ForecastQuarter_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_ForecastQuarter_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_ForecastQuarter_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_enddate: Date;
  ovs_forecastquarterid: XQW.Guid;
  ovs_name: string;
  ovs_numberofunplannedinspections: string;
  ovs_quarternumber: number;
  ovs_startdate: Date;
  ovs_year: number;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_forecastquarter_statecode;
  statuscode: ovs_forecastquarter_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_ForecastQuarter_Expand {
  createdby: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_ForecastQuarter_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_ForecastQuarter_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ovs_ForecastQuarter_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_enddate_formatted?: string;
  ovs_startdate_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface ovs_ForecastQuarter_Result extends ovs_ForecastQuarter_Base, ovs_ForecastQuarter_Relationships {
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
interface ovs_ForecastQuarter_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_ForecastQuarter_RelatedMany {
}
interface WebEntitiesRetrieve {
  ovs_forecastquarters: WebMappingRetrieve<ovs_ForecastQuarter_Select,ovs_ForecastQuarter_Expand,ovs_ForecastQuarter_Filter,ovs_ForecastQuarter_Fixed,ovs_ForecastQuarter_Result,ovs_ForecastQuarter_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_forecastquarters: WebMappingRelated<ovs_ForecastQuarter_RelatedOne,ovs_ForecastQuarter_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_forecastquarters: WebMappingCUDA<ovs_ForecastQuarter_Create,ovs_ForecastQuarter_Update,ovs_ForecastQuarter_Select>;
}
