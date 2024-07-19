interface ts_SuggestedInspection_Base extends WebEntity {
  createdon?: Date | null;
  exchangerate?: number | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_suggestedinspection_statecode | null;
  statuscode?: ts_suggestedinspection_statuscode | null;
  timezoneruleversionnumber?: number | null;
  transactioncurrencyid_guid?: string | null;
  ts_category?: ts_plancategory | null;
  ts_estimatedcost?: number | null;
  ts_estimatedcost_base?: number | null;
  ts_estimatedduration?: number | null;
  ts_estimatedtraveltime?: number | null;
  ts_name?: string | null;
  ts_q1?: number | null;
  ts_q2?: number | null;
  ts_q3?: number | null;
  ts_q4?: number | null;
  ts_suggestedinspectionid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_SuggestedInspection_Relationships {
  ts_Site_Site?: ts_site_Result | null;
  ts_ts_suggestedinspection_systemuser?: SystemUser_Result[] | null;
  ts_workorder_suggestedinspection?: msdyn_workorder_Result[] | null;
}
interface ts_SuggestedInspection extends ts_SuggestedInspection_Base, ts_SuggestedInspection_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
  ts_Site_Site_bind$ts_sites?: string | null;
  ts_Trip_bind$ts_trips?: string | null;
  ts_activitytype_bind$msdyn_incidenttypes?: string | null;
  ts_inspector_bind$systemusers?: string | null;
  ts_operation_bind$ovs_operations?: string | null;
  ts_operationtype_bind$ovs_operationtypes?: string | null;
  ts_plan_bind$ts_plans?: string | null;
  ts_riskthreshold_bind$ts_riskcategories?: string | null;
  ts_site_bind$msdyn_functionallocations?: string | null;
  ts_stakeholder_bind$accounts?: string | null;
}
interface ts_SuggestedInspection_Create extends ts_SuggestedInspection {
}
interface ts_SuggestedInspection_Update extends ts_SuggestedInspection {
}
interface ts_SuggestedInspection_Select {
  createdby_guid: WebAttribute<ts_SuggestedInspection_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_SuggestedInspection_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_SuggestedInspection_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  exchangerate: WebAttribute<ts_SuggestedInspection_Select, { exchangerate: number | null }, {  }>;
  importsequencenumber: WebAttribute<ts_SuggestedInspection_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_SuggestedInspection_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_SuggestedInspection_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_SuggestedInspection_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_SuggestedInspection_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_SuggestedInspection_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_SuggestedInspection_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_SuggestedInspection_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_SuggestedInspection_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_SuggestedInspection_Select, { statecode: ts_suggestedinspection_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_SuggestedInspection_Select, { statuscode: ts_suggestedinspection_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_SuggestedInspection_Select, { timezoneruleversionnumber: number | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<ts_SuggestedInspection_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  ts_activitytype_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_activitytype_guid: string | null }, { ts_activitytype_formatted?: string }>;
  ts_category: WebAttribute<ts_SuggestedInspection_Select, { ts_category: ts_plancategory | null }, { ts_category_formatted?: string }>;
  ts_estimatedcost: WebAttribute<ts_SuggestedInspection_Select, { ts_estimatedcost: number | null; transactioncurrencyid_guid: string | null }, { ts_estimatedcost_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_estimatedcost_base: WebAttribute<ts_SuggestedInspection_Select, { ts_estimatedcost_base: number | null; transactioncurrencyid_guid: string | null }, { ts_estimatedcost_base_formatted?: string; transactioncurrencyid_formatted?: string }>;
  ts_estimatedduration: WebAttribute<ts_SuggestedInspection_Select, { ts_estimatedduration: number | null }, {  }>;
  ts_estimatedtraveltime: WebAttribute<ts_SuggestedInspection_Select, { ts_estimatedtraveltime: number | null }, {  }>;
  ts_inspector_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_inspector_guid: string | null }, { ts_inspector_formatted?: string }>;
  ts_name: WebAttribute<ts_SuggestedInspection_Select, { ts_name: string | null }, {  }>;
  ts_operation_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_operation_guid: string | null }, { ts_operation_formatted?: string }>;
  ts_operationtype_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_plan_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_plan_guid: string | null }, { ts_plan_formatted?: string }>;
  ts_q1: WebAttribute<ts_SuggestedInspection_Select, { ts_q1: number | null }, {  }>;
  ts_q2: WebAttribute<ts_SuggestedInspection_Select, { ts_q2: number | null }, {  }>;
  ts_q3: WebAttribute<ts_SuggestedInspection_Select, { ts_q3: number | null }, {  }>;
  ts_q4: WebAttribute<ts_SuggestedInspection_Select, { ts_q4: number | null }, {  }>;
  ts_riskthreshold_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_riskthreshold_guid: string | null }, { ts_riskthreshold_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_site_site_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_site_site_guid: string | null }, { ts_site_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_suggestedinspectionid: WebAttribute<ts_SuggestedInspection_Select, { ts_suggestedinspectionid: string | null }, {  }>;
  ts_trip_guid: WebAttribute<ts_SuggestedInspection_Select, { ts_trip_guid: string | null }, { ts_trip_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_SuggestedInspection_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_SuggestedInspection_Select, { versionnumber: number | null }, {  }>;
}
interface ts_SuggestedInspection_Filter {
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
  statecode: ts_suggestedinspection_statecode;
  statuscode: ts_suggestedinspection_statuscode;
  timezoneruleversionnumber: number;
  transactioncurrencyid_guid: XQW.Guid;
  ts_activitytype_guid: XQW.Guid;
  ts_category: ts_plancategory;
  ts_estimatedcost: number;
  ts_estimatedcost_base: number;
  ts_estimatedduration: any;
  ts_estimatedtraveltime: any;
  ts_inspector_guid: XQW.Guid;
  ts_name: string;
  ts_operation_guid: XQW.Guid;
  ts_operationtype_guid: XQW.Guid;
  ts_plan_guid: XQW.Guid;
  ts_q1: number;
  ts_q2: number;
  ts_q3: number;
  ts_q4: number;
  ts_riskthreshold_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_site_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_suggestedinspectionid: XQW.Guid;
  ts_trip_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_SuggestedInspection_Expand {
  createdby: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_SuggestedInspection_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Site_Site: WebExpand<ts_SuggestedInspection_Expand, ts_site_Select, ts_site_Filter, { ts_Site_Site: ts_site_Result }>;
  ts_activitytype: WebExpand<ts_SuggestedInspection_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_activitytype: msdyn_incidenttype_Result }>;
  ts_inspector: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { ts_inspector: SystemUser_Result }>;
  ts_operation: WebExpand<ts_SuggestedInspection_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_operation: ovs_operation_Result }>;
  ts_plan: WebExpand<ts_SuggestedInspection_Expand, ts_Plan_Select, ts_Plan_Filter, { ts_plan: ts_Plan_Result }>;
  ts_riskthreshold: WebExpand<ts_SuggestedInspection_Expand, ts_RiskCategory_Select, ts_RiskCategory_Filter, { ts_riskthreshold: ts_RiskCategory_Result }>;
  ts_site: WebExpand<ts_SuggestedInspection_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_site: msdyn_FunctionalLocation_Result }>;
  ts_stakeholder: WebExpand<ts_SuggestedInspection_Expand, Account_Select, Account_Filter, { ts_stakeholder: Account_Result }>;
  ts_ts_suggestedinspection_systemuser: WebExpand<ts_SuggestedInspection_Expand, SystemUser_Select, SystemUser_Filter, { ts_ts_suggestedinspection_systemuser: SystemUser_Result[] }>;
  ts_workorder_suggestedinspection: WebExpand<ts_SuggestedInspection_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_workorder_suggestedinspection: msdyn_workorder_Result[] }>;
}
interface ts_SuggestedInspection_FormattedResult {
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
  ts_activitytype_formatted?: string;
  ts_category_formatted?: string;
  ts_estimatedcost_base_formatted?: string;
  ts_estimatedcost_formatted?: string;
  ts_inspector_formatted?: string;
  ts_operation_formatted?: string;
  ts_operationtype_formatted?: string;
  ts_plan_formatted?: string;
  ts_riskthreshold_formatted?: string;
  ts_site_formatted?: string;
  ts_site_site_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_trip_formatted?: string;
}
interface ts_SuggestedInspection_Result extends ts_SuggestedInspection_Base, ts_SuggestedInspection_Relationships {
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
  ts_activitytype_guid: string | null;
  ts_inspector_guid: string | null;
  ts_operation_guid: string | null;
  ts_operationtype_guid: string | null;
  ts_plan_guid: string | null;
  ts_riskthreshold_guid: string | null;
  ts_site_guid: string | null;
  ts_site_site_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_trip_guid: string | null;
}
interface ts_SuggestedInspection_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Site_Site: WebMappingRetrieve<ts_site_Select,ts_site_Expand,ts_site_Filter,ts_site_Fixed,ts_site_Result,ts_site_FormattedResult>;
  ts_activitytype: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_inspector: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_plan: WebMappingRetrieve<ts_Plan_Select,ts_Plan_Expand,ts_Plan_Filter,ts_Plan_Fixed,ts_Plan_Result,ts_Plan_FormattedResult>;
  ts_riskthreshold: WebMappingRetrieve<ts_RiskCategory_Select,ts_RiskCategory_Expand,ts_RiskCategory_Filter,ts_RiskCategory_Fixed,ts_RiskCategory_Result,ts_RiskCategory_FormattedResult>;
  ts_site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_SuggestedInspection_RelatedMany {
  ts_ts_suggestedinspection_systemuser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_workorder_suggestedinspection: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_suggestedinspections: WebMappingRetrieve<ts_SuggestedInspection_Select,ts_SuggestedInspection_Expand,ts_SuggestedInspection_Filter,ts_SuggestedInspection_Fixed,ts_SuggestedInspection_Result,ts_SuggestedInspection_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_suggestedinspections: WebMappingRelated<ts_SuggestedInspection_RelatedOne,ts_SuggestedInspection_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_suggestedinspections: WebMappingCUDA<ts_SuggestedInspection_Create,ts_SuggestedInspection_Update,ts_SuggestedInspection_Select>;
}
