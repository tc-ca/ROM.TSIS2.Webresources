interface qm_tylegislationsource_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_legislationsourceelbl?: string | null;
  qm_legislationsourceetxt?: string | null;
  qm_legislationsourceflbl?: string | null;
  qm_legislationsourceftxt?: string | null;
  qm_name?: string | null;
  qm_tylegislationsourceid?: string | null;
  statecode?: qm_tylegislationsource_statecode | null;
  statuscode?: qm_tylegislationsource_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_tylegislationsource_Relationships {
  qm_tylegislationsource_rclegislation?: qm_rclegislation_Result[] | null;
}
interface qm_tylegislationsource extends qm_tylegislationsource_Base, qm_tylegislationsource_Relationships {
}
interface qm_tylegislationsource_Create extends qm_tylegislationsource {
}
interface qm_tylegislationsource_Update extends qm_tylegislationsource {
}
interface qm_tylegislationsource_Select {
  createdby_guid: WebAttribute<qm_tylegislationsource_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_tylegislationsource_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_tylegislationsource_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_tylegislationsource_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_tylegislationsource_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_tylegislationsource_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_tylegislationsource_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_tylegislationsource_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_tylegislationsource_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_legislationsourceelbl: WebAttribute<qm_tylegislationsource_Select, { qm_legislationsourceelbl: string | null }, {  }>;
  qm_legislationsourceetxt: WebAttribute<qm_tylegislationsource_Select, { qm_legislationsourceetxt: string | null }, {  }>;
  qm_legislationsourceflbl: WebAttribute<qm_tylegislationsource_Select, { qm_legislationsourceflbl: string | null }, {  }>;
  qm_legislationsourceftxt: WebAttribute<qm_tylegislationsource_Select, { qm_legislationsourceftxt: string | null }, {  }>;
  qm_name: WebAttribute<qm_tylegislationsource_Select, { qm_name: string | null }, {  }>;
  qm_tylegislationsourceid: WebAttribute<qm_tylegislationsource_Select, { qm_tylegislationsourceid: string | null }, {  }>;
  statecode: WebAttribute<qm_tylegislationsource_Select, { statecode: qm_tylegislationsource_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_tylegislationsource_Select, { statuscode: qm_tylegislationsource_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_tylegislationsource_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_tylegislationsource_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_tylegislationsource_Select, { versionnumber: number | null }, {  }>;
}
interface qm_tylegislationsource_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_legislationsourceelbl: string;
  qm_legislationsourceetxt: string;
  qm_legislationsourceflbl: string;
  qm_legislationsourceftxt: string;
  qm_name: string;
  qm_tylegislationsourceid: XQW.Guid;
  statecode: qm_tylegislationsource_statecode;
  statuscode: qm_tylegislationsource_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_tylegislationsource_Expand {
  createdby: WebExpand<qm_tylegislationsource_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_tylegislationsource_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_tylegislationsource_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_tylegislationsource_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_tylegislationsource_rclegislation: WebExpand<qm_tylegislationsource_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_tylegislationsource_rclegislation: qm_rclegislation_Result[] }>;
}
interface qm_tylegislationsource_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_tylegislationsource_Result extends qm_tylegislationsource_Base, qm_tylegislationsource_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
}
interface qm_tylegislationsource_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface qm_tylegislationsource_RelatedMany {
  qm_tylegislationsource_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_tylegislationsources: WebMappingRetrieve<qm_tylegislationsource_Select,qm_tylegislationsource_Expand,qm_tylegislationsource_Filter,qm_tylegislationsource_Fixed,qm_tylegislationsource_Result,qm_tylegislationsource_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_tylegislationsources: WebMappingRelated<qm_tylegislationsource_RelatedOne,qm_tylegislationsource_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_tylegislationsources: WebMappingCUDA<qm_tylegislationsource_Create,qm_tylegislationsource_Update,qm_tylegislationsource_Select>;
}
