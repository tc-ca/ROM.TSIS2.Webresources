interface msdyn_customerassetcategory_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_customerassetcategoryid?: string | null;
  msdyn_name?: string | null;
  overriddencreatedon?: Date | null;
  statecode?: msdyn_customerassetcategory_statecode | null;
  statuscode?: msdyn_customerassetcategory_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_assetcategorynameenglish?: string | null;
  ts_assetcategorynamefrench?: string | null;
  ts_assetcategorytype?: ts_assetcategorytype | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_customerassetcategory_Relationships {
  msdyn_msdyn_customerassetcategory_msdyn_customerasset_CustomerAssetCategory?: msdyn_customerasset_Result[] | null;
  ovs_msdyn_workorder_AssetCategory_msdyn_custo?: msdyn_workorder_Result[] | null;
}
interface msdyn_customerassetcategory extends msdyn_customerassetcategory_Base, msdyn_customerassetcategory_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_customerassetcategory_Create extends msdyn_customerassetcategory {
}
interface msdyn_customerassetcategory_Update extends msdyn_customerassetcategory {
}
interface msdyn_customerassetcategory_Select {
  createdby_guid: WebAttribute<msdyn_customerassetcategory_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_customerassetcategory_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_customerassetcategory_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_customerassetcategory_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_customerassetcategory_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_customerassetcategory_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_customerassetcategory_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_customerassetcategoryid: WebAttribute<msdyn_customerassetcategory_Select, { msdyn_customerassetcategoryid: string | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_customerassetcategory_Select, { msdyn_name: string | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_customerassetcategory_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_customerassetcategory_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_customerassetcategory_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_customerassetcategory_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_customerassetcategory_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_customerassetcategory_Select, { statecode: msdyn_customerassetcategory_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_customerassetcategory_Select, { statuscode: msdyn_customerassetcategory_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_customerassetcategory_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_assetcategorynameenglish: WebAttribute<msdyn_customerassetcategory_Select, { ts_assetcategorynameenglish: string | null }, {  }>;
  ts_assetcategorynamefrench: WebAttribute<msdyn_customerassetcategory_Select, { ts_assetcategorynamefrench: string | null }, {  }>;
  ts_assetcategorytype: WebAttribute<msdyn_customerassetcategory_Select, { ts_assetcategorytype: ts_assetcategorytype | null }, { ts_assetcategorytype_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<msdyn_customerassetcategory_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_customerassetcategory_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_customerassetcategory_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_customerassetcategoryid: XQW.Guid;
  msdyn_name: string;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_customerassetcategory_statecode;
  statuscode: msdyn_customerassetcategory_statuscode;
  timezoneruleversionnumber: number;
  ts_assetcategorynameenglish: string;
  ts_assetcategorynamefrench: string;
  ts_assetcategorytype: ts_assetcategorytype;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_customerassetcategory_Expand {
  createdby: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_msdyn_customerassetcategory_msdyn_customerasset_CustomerAssetCategory: WebExpand<msdyn_customerassetcategory_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_msdyn_customerassetcategory_msdyn_customerasset_CustomerAssetCategory: msdyn_customerasset_Result[] }>;
  ovs_msdyn_workorder_AssetCategory_msdyn_custo: WebExpand<msdyn_customerassetcategory_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_AssetCategory_msdyn_custo: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<msdyn_customerassetcategory_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<msdyn_customerassetcategory_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_customerassetcategory_FormattedResult {
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
  ts_assetcategorytype_formatted?: string;
}
interface msdyn_customerassetcategory_Result extends msdyn_customerassetcategory_Base, msdyn_customerassetcategory_Relationships {
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
interface msdyn_customerassetcategory_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_customerassetcategory_RelatedMany {
  msdyn_msdyn_customerassetcategory_msdyn_customerasset_CustomerAssetCategory: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  ovs_msdyn_workorder_AssetCategory_msdyn_custo: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_customerassetcategories: WebMappingRetrieve<msdyn_customerassetcategory_Select,msdyn_customerassetcategory_Expand,msdyn_customerassetcategory_Filter,msdyn_customerassetcategory_Fixed,msdyn_customerassetcategory_Result,msdyn_customerassetcategory_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_customerassetcategories: WebMappingRelated<msdyn_customerassetcategory_RelatedOne,msdyn_customerassetcategory_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_customerassetcategories: WebMappingCUDA<msdyn_customerassetcategory_Create,msdyn_customerassetcategory_Update,msdyn_customerassetcategory_Select>;
}
