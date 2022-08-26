interface ts_RiskCategory_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_riskcategory_statecode | null;
  statuscode?: ts_riskcategory_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_frequency?: number | null;
  ts_interval?: number | null;
  ts_name?: string | null;
  ts_riskcategoryen?: string | null;
  ts_riskcategoryfr?: string | null;
  ts_riskcategoryid?: string | null;
  ts_riskscoremaximum?: number | null;
  ts_riskscoreminimum?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_RiskCategory_Relationships {
  ts_riskcategory_ovs_operation_risk?: ovs_operation_Result[] | null;
}
interface ts_RiskCategory extends ts_RiskCategory_Base, ts_RiskCategory_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_OperationFrequency_bind$ts_operationfrequencies?: string | null;
  ts_OperationType_bind$ovs_operationtypes?: string | null;
}
interface ts_RiskCategory_Create extends ts_RiskCategory {
}
interface ts_RiskCategory_Update extends ts_RiskCategory {
}
interface ts_RiskCategory_Select {
  createdby_guid: WebAttribute<ts_RiskCategory_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_RiskCategory_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_RiskCategory_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_RiskCategory_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_RiskCategory_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_RiskCategory_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_RiskCategory_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_RiskCategory_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_RiskCategory_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_RiskCategory_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_RiskCategory_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_RiskCategory_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_RiskCategory_Select, { statecode: ts_riskcategory_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_RiskCategory_Select, { statuscode: ts_riskcategory_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_RiskCategory_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_frequency: WebAttribute<ts_RiskCategory_Select, { ts_frequency: number | null }, {  }>;
  ts_interval: WebAttribute<ts_RiskCategory_Select, { ts_interval: number | null }, {  }>;
  ts_name: WebAttribute<ts_RiskCategory_Select, { ts_name: string | null }, {  }>;
  ts_operationfrequency_guid: WebAttribute<ts_RiskCategory_Select, { ts_operationfrequency_guid: string | null }, { ts_operationfrequency_formatted?: string }>;
  ts_operationtype_guid: WebAttribute<ts_RiskCategory_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_riskcategoryen: WebAttribute<ts_RiskCategory_Select, { ts_riskcategoryen: string | null }, {  }>;
  ts_riskcategoryfr: WebAttribute<ts_RiskCategory_Select, { ts_riskcategoryfr: string | null }, {  }>;
  ts_riskcategoryid: WebAttribute<ts_RiskCategory_Select, { ts_riskcategoryid: string | null }, {  }>;
  ts_riskscoremaximum: WebAttribute<ts_RiskCategory_Select, { ts_riskscoremaximum: number | null }, {  }>;
  ts_riskscoreminimum: WebAttribute<ts_RiskCategory_Select, { ts_riskscoreminimum: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_RiskCategory_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_RiskCategory_Select, { versionnumber: number | null }, {  }>;
}
interface ts_RiskCategory_Filter {
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
  statecode: ts_riskcategory_statecode;
  statuscode: ts_riskcategory_statuscode;
  timezoneruleversionnumber: number;
  ts_frequency: number;
  ts_interval: number;
  ts_name: string;
  ts_operationfrequency_guid: XQW.Guid;
  ts_operationtype_guid: XQW.Guid;
  ts_riskcategoryen: string;
  ts_riskcategoryfr: string;
  ts_riskcategoryid: XQW.Guid;
  ts_riskscoremaximum: number;
  ts_riskscoreminimum: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_RiskCategory_Expand {
  createdby: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_RiskCategory_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_riskcategory_ovs_operation_risk: WebExpand<ts_RiskCategory_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_riskcategory_ovs_operation_risk: ovs_operation_Result[] }>;
}
interface ts_RiskCategory_FormattedResult {
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
  ts_operationfrequency_formatted?: string;
  ts_operationtype_formatted?: string;
}
interface ts_RiskCategory_Result extends ts_RiskCategory_Base, ts_RiskCategory_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_operationfrequency_guid: string | null;
  ts_operationtype_guid: string | null;
}
interface ts_RiskCategory_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_RiskCategory_RelatedMany {
  ts_riskcategory_ovs_operation_risk: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_riskcategories: WebMappingRetrieve<ts_RiskCategory_Select,ts_RiskCategory_Expand,ts_RiskCategory_Filter,ts_RiskCategory_Fixed,ts_RiskCategory_Result,ts_RiskCategory_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_riskcategories: WebMappingRelated<ts_RiskCategory_RelatedOne,ts_RiskCategory_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_riskcategories: WebMappingCUDA<ts_RiskCategory_Create,ts_RiskCategory_Update,ts_RiskCategory_Select>;
}
