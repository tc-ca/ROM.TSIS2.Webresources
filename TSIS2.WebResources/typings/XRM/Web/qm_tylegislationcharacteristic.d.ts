interface qm_tylegislationcharacteristic_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_legislationcharacteristicelbl?: string | null;
  qm_legislationcharacteristicflbl?: string | null;
  qm_name?: string | null;
  qm_tylegislationcharacteristicid?: string | null;
  statecode?: qm_tylegislationcharacteristic_statecode | null;
  statuscode?: qm_tylegislationcharacteristic_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_tylegislationcharacteristic_Relationships {
  qm_CategoryId?: qm_tylegislationcharacteristic_Result | null;
  qm_account_tylegislationcharacteristic?: Account_Result[] | null;
  qm_rclegislation_tylegislationcharacteristic?: qm_rclegislation_Result[] | null;
  qm_tylegislationcharacteristic_itself?: qm_tylegislationcharacteristic_Result[] | null;
}
interface qm_tylegislationcharacteristic extends qm_tylegislationcharacteristic_Base, qm_tylegislationcharacteristic_Relationships {
  qm_CategoryId_bind$qm_tylegislationcharacteristics?: string | null;
}
interface qm_tylegislationcharacteristic_Create extends qm_tylegislationcharacteristic {
}
interface qm_tylegislationcharacteristic_Update extends qm_tylegislationcharacteristic {
}
interface qm_tylegislationcharacteristic_Select {
  createdby_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_tylegislationcharacteristic_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_tylegislationcharacteristic_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_tylegislationcharacteristic_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_tylegislationcharacteristic_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_categoryid_guid: WebAttribute<qm_tylegislationcharacteristic_Select, { qm_categoryid_guid: string | null }, { qm_categoryid_formatted?: string }>;
  qm_legislationcharacteristicelbl: WebAttribute<qm_tylegislationcharacteristic_Select, { qm_legislationcharacteristicelbl: string | null }, {  }>;
  qm_legislationcharacteristicflbl: WebAttribute<qm_tylegislationcharacteristic_Select, { qm_legislationcharacteristicflbl: string | null }, {  }>;
  qm_name: WebAttribute<qm_tylegislationcharacteristic_Select, { qm_name: string | null }, {  }>;
  qm_tylegislationcharacteristicid: WebAttribute<qm_tylegislationcharacteristic_Select, { qm_tylegislationcharacteristicid: string | null }, {  }>;
  statecode: WebAttribute<qm_tylegislationcharacteristic_Select, { statecode: qm_tylegislationcharacteristic_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_tylegislationcharacteristic_Select, { statuscode: qm_tylegislationcharacteristic_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_tylegislationcharacteristic_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_tylegislationcharacteristic_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_tylegislationcharacteristic_Select, { versionnumber: number | null }, {  }>;
}
interface qm_tylegislationcharacteristic_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_categoryid_guid: XQW.Guid;
  qm_legislationcharacteristicelbl: string;
  qm_legislationcharacteristicflbl: string;
  qm_name: string;
  qm_tylegislationcharacteristicid: XQW.Guid;
  statecode: qm_tylegislationcharacteristic_statecode;
  statuscode: qm_tylegislationcharacteristic_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_tylegislationcharacteristic_Expand {
  createdby: WebExpand<qm_tylegislationcharacteristic_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_tylegislationcharacteristic_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_tylegislationcharacteristic_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_tylegislationcharacteristic_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_CategoryId: WebExpand<qm_tylegislationcharacteristic_Expand, qm_tylegislationcharacteristic_Select, qm_tylegislationcharacteristic_Filter, { qm_CategoryId: qm_tylegislationcharacteristic_Result }>;
  qm_account_tylegislationcharacteristic: WebExpand<qm_tylegislationcharacteristic_Expand, Account_Select, Account_Filter, { qm_account_tylegislationcharacteristic: Account_Result[] }>;
  qm_rclegislation_tylegislationcharacteristic: WebExpand<qm_tylegislationcharacteristic_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_rclegislation_tylegislationcharacteristic: qm_rclegislation_Result[] }>;
  qm_tylegislationcharacteristic_itself: WebExpand<qm_tylegislationcharacteristic_Expand, qm_tylegislationcharacteristic_Select, qm_tylegislationcharacteristic_Filter, { qm_tylegislationcharacteristic_itself: qm_tylegislationcharacteristic_Result[] }>;
}
interface qm_tylegislationcharacteristic_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_categoryid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_tylegislationcharacteristic_Result extends qm_tylegislationcharacteristic_Base, qm_tylegislationcharacteristic_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_categoryid_guid: string | null;
}
interface qm_tylegislationcharacteristic_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_CategoryId: WebMappingRetrieve<qm_tylegislationcharacteristic_Select,qm_tylegislationcharacteristic_Expand,qm_tylegislationcharacteristic_Filter,qm_tylegislationcharacteristic_Fixed,qm_tylegislationcharacteristic_Result,qm_tylegislationcharacteristic_FormattedResult>;
}
interface qm_tylegislationcharacteristic_RelatedMany {
  qm_account_tylegislationcharacteristic: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  qm_rclegislation_tylegislationcharacteristic: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  qm_tylegislationcharacteristic_itself: WebMappingRetrieve<qm_tylegislationcharacteristic_Select,qm_tylegislationcharacteristic_Expand,qm_tylegislationcharacteristic_Filter,qm_tylegislationcharacteristic_Fixed,qm_tylegislationcharacteristic_Result,qm_tylegislationcharacteristic_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_tylegislationcharacteristics: WebMappingRetrieve<qm_tylegislationcharacteristic_Select,qm_tylegislationcharacteristic_Expand,qm_tylegislationcharacteristic_Filter,qm_tylegislationcharacteristic_Fixed,qm_tylegislationcharacteristic_Result,qm_tylegislationcharacteristic_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_tylegislationcharacteristics: WebMappingRelated<qm_tylegislationcharacteristic_RelatedOne,qm_tylegislationcharacteristic_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_tylegislationcharacteristics: WebMappingCUDA<qm_tylegislationcharacteristic_Create,qm_tylegislationcharacteristic_Update,qm_tylegislationcharacteristic_Select>;
}
