interface Territory_Base extends WebEntity {
  createdon?: Date | null;
  description?: string | null;
  entityimageid?: string | null;
  exchangerate?: number | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  name?: string | null;
  overriddencreatedon?: Date | null;
  ovs_territorynameenglish?: string | null;
  ovs_territorynamefrench?: string | null;
  territoryid?: string | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface Territory_Relationships {
  msdyn_territory_account_ServiceTerritory?: Account_Result[] | null;
  msdyn_territory_msdyn_workorder_ServiceTerritory?: msdyn_workorder_Result[] | null;
  ovs_UnplannedForecast_Region_Territory?: ovs_UnplannedForecast_Result[] | null;
  territory_accounts?: Account_Result[] | null;
  territory_connections1?: Connection_Result[] | null;
  territory_connections2?: Connection_Result[] | null;
  territory_parent_territory?: Territory_Result[] | null;
  territory_system_users?: SystemUser_Result[] | null;
}
interface Territory extends Territory_Base, Territory_Relationships {
  managerid_bind$systemusers?: string | null;
  parentterritoryid_bind$territories?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
}
interface Territory_Create extends Territory {
}
interface Territory_Update extends Territory {
}
interface Territory_Select {
  createdby_guid: WebAttribute<Territory_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<Territory_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<Territory_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  description: WebAttribute<Territory_Select, { description: string | null }, {  }>;
  entityimageid: WebAttribute<Territory_Select, { entityimageid: string | null }, {  }>;
  exchangerate: WebAttribute<Territory_Select, { exchangerate: number | null }, {  }>;
  importsequencenumber: WebAttribute<Territory_Select, { importsequencenumber: number | null }, {  }>;
  managerid_guid: WebAttribute<Territory_Select, { managerid_guid: string | null }, { managerid_formatted?: string }>;
  modifiedby_guid: WebAttribute<Territory_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<Territory_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<Territory_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  name: WebAttribute<Territory_Select, { name: string | null }, {  }>;
  organizationid_guid: WebAttribute<Territory_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<Territory_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_territorynameenglish: WebAttribute<Territory_Select, { ovs_territorynameenglish: string | null }, {  }>;
  ovs_territorynamefrench: WebAttribute<Territory_Select, { ovs_territorynamefrench: string | null }, {  }>;
  parentterritoryid_guid: WebAttribute<Territory_Select, { parentterritoryid_guid: string | null }, { parentterritoryid_formatted?: string }>;
  territoryid: WebAttribute<Territory_Select, { territoryid: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<Territory_Select, { timezoneruleversionnumber: number | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<Territory_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<Territory_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<Territory_Select, { versionnumber: number | null }, {  }>;
}
interface Territory_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  description: string;
  entityimageid: XQW.Guid;
  exchangerate: any;
  importsequencenumber: number;
  managerid_guid: XQW.Guid;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  name: string;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_territorynameenglish: string;
  ovs_territorynamefrench: string;
  parentterritoryid_guid: XQW.Guid;
  territoryid: XQW.Guid;
  timezoneruleversionnumber: number;
  transactioncurrencyid_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface Territory_Expand {
  createdby: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  managerid: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { managerid: SystemUser_Result }>;
  modifiedby: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_territory_account_ServiceTerritory: WebExpand<Territory_Expand, Account_Select, Account_Filter, { msdyn_territory_account_ServiceTerritory: Account_Result[] }>;
  msdyn_territory_msdyn_workorder_ServiceTerritory: WebExpand<Territory_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_territory_msdyn_workorder_ServiceTerritory: msdyn_workorder_Result[] }>;
  ovs_UnplannedForecast_Region_Territory: WebExpand<Territory_Expand, ovs_UnplannedForecast_Select, ovs_UnplannedForecast_Filter, { ovs_UnplannedForecast_Region_Territory: ovs_UnplannedForecast_Result[] }>;
  parentterritoryid: WebExpand<Territory_Expand, Territory_Select, Territory_Filter, { parentterritoryid: Territory_Result }>;
  territory_accounts: WebExpand<Territory_Expand, Account_Select, Account_Filter, { territory_accounts: Account_Result[] }>;
  territory_connections1: WebExpand<Territory_Expand, Connection_Select, Connection_Filter, { territory_connections1: Connection_Result[] }>;
  territory_connections2: WebExpand<Territory_Expand, Connection_Select, Connection_Filter, { territory_connections2: Connection_Result[] }>;
  territory_parent_territory: WebExpand<Territory_Expand, Territory_Select, Territory_Filter, { territory_parent_territory: Territory_Result[] }>;
  territory_system_users: WebExpand<Territory_Expand, SystemUser_Select, SystemUser_Filter, { territory_system_users: SystemUser_Result[] }>;
}
interface Territory_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  managerid_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  parentterritoryid_formatted?: string;
  transactioncurrencyid_formatted?: string;
}
interface Territory_Result extends Territory_Base, Territory_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  managerid_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  parentterritoryid_guid: string | null;
  transactioncurrencyid_guid: string | null;
}
interface Territory_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  managerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  parentterritoryid: WebMappingRetrieve<Territory_Select,Territory_Expand,Territory_Filter,Territory_Fixed,Territory_Result,Territory_FormattedResult>;
}
interface Territory_RelatedMany {
  msdyn_territory_account_ServiceTerritory: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  msdyn_territory_msdyn_workorder_ServiceTerritory: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_UnplannedForecast_Region_Territory: WebMappingRetrieve<ovs_UnplannedForecast_Select,ovs_UnplannedForecast_Expand,ovs_UnplannedForecast_Filter,ovs_UnplannedForecast_Fixed,ovs_UnplannedForecast_Result,ovs_UnplannedForecast_FormattedResult>;
  territory_accounts: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  territory_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  territory_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  territory_parent_territory: WebMappingRetrieve<Territory_Select,Territory_Expand,Territory_Filter,Territory_Fixed,Territory_Result,Territory_FormattedResult>;
  territory_system_users: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface WebEntitiesRetrieve {
  territories: WebMappingRetrieve<Territory_Select,Territory_Expand,Territory_Filter,Territory_Fixed,Territory_Result,Territory_FormattedResult>;
}
interface WebEntitiesRelated {
  territories: WebMappingRelated<Territory_RelatedOne,Territory_RelatedMany>;
}
interface WebEntitiesCUDA {
  territories: WebMappingCUDA<Territory_Create,Territory_Update,Territory_Select>;
}
