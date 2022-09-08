interface ts_InspectionHours_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_inspectionhours_statecode | null;
  statuscode?: ts_inspectionhours_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_inspectionhoursid?: string | null;
  ts_name?: string | null;
  ts_plannedq1?: number | null;
  ts_plannedq2?: number | null;
  ts_plannedq3?: number | null;
  ts_plannedq4?: number | null;
  ts_totalhours?: number | null;
  ts_totalhoursq1?: number | null;
  ts_totalhoursq2?: number | null;
  ts_totalhoursq3?: number | null;
  ts_totalhoursq4?: number | null;
  ts_unplannedq1?: number | null;
  ts_unplannedq2?: number | null;
  ts_unplannedq3?: number | null;
  ts_unplannedq4?: number | null;
  ts_varianceq1?: number | null;
  ts_varianceq2?: number | null;
  ts_varianceq3?: number | null;
  ts_varianceq4?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_InspectionHours_Relationships {
  ts_Inspector?: SystemUser_Result | null;
  ts_systemuser_InspectionHours_ts_inspectionh?: SystemUser_Result[] | null;
}
interface ts_InspectionHours extends ts_InspectionHours_Base, ts_InspectionHours_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_BaselineHours_bind$ts_baselinehourses?: string | null;
  ts_Inspector_bind$systemusers?: string | null;
}
interface ts_InspectionHours_Create extends ts_InspectionHours {
}
interface ts_InspectionHours_Update extends ts_InspectionHours {
}
interface ts_InspectionHours_Select {
  createdby_guid: WebAttribute<ts_InspectionHours_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_InspectionHours_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_InspectionHours_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_InspectionHours_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_InspectionHours_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_InspectionHours_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_InspectionHours_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_InspectionHours_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_InspectionHours_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_InspectionHours_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_InspectionHours_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_InspectionHours_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_InspectionHours_Select, { statecode: ts_inspectionhours_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_InspectionHours_Select, { statuscode: ts_inspectionhours_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_InspectionHours_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_baselinehours_guid: WebAttribute<ts_InspectionHours_Select, { ts_baselinehours_guid: string | null }, { ts_baselinehours_formatted?: string }>;
  ts_inspectionhoursid: WebAttribute<ts_InspectionHours_Select, { ts_inspectionhoursid: string | null }, {  }>;
  ts_inspector_guid: WebAttribute<ts_InspectionHours_Select, { ts_inspector_guid: string | null }, { ts_inspector_formatted?: string }>;
  ts_name: WebAttribute<ts_InspectionHours_Select, { ts_name: string | null }, {  }>;
  ts_plannedq1: WebAttribute<ts_InspectionHours_Select, { ts_plannedq1: number | null }, {  }>;
  ts_plannedq2: WebAttribute<ts_InspectionHours_Select, { ts_plannedq2: number | null }, {  }>;
  ts_plannedq3: WebAttribute<ts_InspectionHours_Select, { ts_plannedq3: number | null }, {  }>;
  ts_plannedq4: WebAttribute<ts_InspectionHours_Select, { ts_plannedq4: number | null }, {  }>;
  ts_totalhours: WebAttribute<ts_InspectionHours_Select, { ts_totalhours: number | null }, {  }>;
  ts_totalhoursq1: WebAttribute<ts_InspectionHours_Select, { ts_totalhoursq1: number | null }, {  }>;
  ts_totalhoursq2: WebAttribute<ts_InspectionHours_Select, { ts_totalhoursq2: number | null }, {  }>;
  ts_totalhoursq3: WebAttribute<ts_InspectionHours_Select, { ts_totalhoursq3: number | null }, {  }>;
  ts_totalhoursq4: WebAttribute<ts_InspectionHours_Select, { ts_totalhoursq4: number | null }, {  }>;
  ts_unplannedq1: WebAttribute<ts_InspectionHours_Select, { ts_unplannedq1: number | null }, {  }>;
  ts_unplannedq2: WebAttribute<ts_InspectionHours_Select, { ts_unplannedq2: number | null }, {  }>;
  ts_unplannedq3: WebAttribute<ts_InspectionHours_Select, { ts_unplannedq3: number | null }, {  }>;
  ts_unplannedq4: WebAttribute<ts_InspectionHours_Select, { ts_unplannedq4: number | null }, {  }>;
  ts_varianceq1: WebAttribute<ts_InspectionHours_Select, { ts_varianceq1: number | null }, {  }>;
  ts_varianceq2: WebAttribute<ts_InspectionHours_Select, { ts_varianceq2: number | null }, {  }>;
  ts_varianceq3: WebAttribute<ts_InspectionHours_Select, { ts_varianceq3: number | null }, {  }>;
  ts_varianceq4: WebAttribute<ts_InspectionHours_Select, { ts_varianceq4: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_InspectionHours_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_InspectionHours_Select, { versionnumber: number | null }, {  }>;
}
interface ts_InspectionHours_Filter {
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
  statecode: ts_inspectionhours_statecode;
  statuscode: ts_inspectionhours_statuscode;
  timezoneruleversionnumber: number;
  ts_baselinehours_guid: XQW.Guid;
  ts_inspectionhoursid: XQW.Guid;
  ts_inspector_guid: XQW.Guid;
  ts_name: string;
  ts_plannedq1: number;
  ts_plannedq2: number;
  ts_plannedq3: number;
  ts_plannedq4: number;
  ts_totalhours: number;
  ts_totalhoursq1: number;
  ts_totalhoursq2: number;
  ts_totalhoursq3: number;
  ts_totalhoursq4: number;
  ts_unplannedq1: number;
  ts_unplannedq2: number;
  ts_unplannedq3: number;
  ts_unplannedq4: number;
  ts_varianceq1: number;
  ts_varianceq2: number;
  ts_varianceq3: number;
  ts_varianceq4: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_InspectionHours_Expand {
  createdby: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Inspector: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { ts_Inspector: SystemUser_Result }>;
  ts_systemuser_InspectionHours_ts_inspectionh: WebExpand<ts_InspectionHours_Expand, SystemUser_Select, SystemUser_Filter, { ts_systemuser_InspectionHours_ts_inspectionh: SystemUser_Result[] }>;
}
interface ts_InspectionHours_FormattedResult {
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
  ts_baselinehours_formatted?: string;
  ts_inspector_formatted?: string;
}
interface ts_InspectionHours_Result extends ts_InspectionHours_Base, ts_InspectionHours_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_baselinehours_guid: string | null;
  ts_inspector_guid: string | null;
}
interface ts_InspectionHours_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Inspector: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_InspectionHours_RelatedMany {
  ts_systemuser_InspectionHours_ts_inspectionh: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_inspectionhourses: WebMappingRetrieve<ts_InspectionHours_Select,ts_InspectionHours_Expand,ts_InspectionHours_Filter,ts_InspectionHours_Fixed,ts_InspectionHours_Result,ts_InspectionHours_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_inspectionhourses: WebMappingRelated<ts_InspectionHours_RelatedOne,ts_InspectionHours_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_inspectionhourses: WebMappingCUDA<ts_InspectionHours_Create,ts_InspectionHours_Update,ts_InspectionHours_Select>;
}
