interface ts_EntityRisk_Account_Base extends WebEntity {
  accountid?: string | null;
  ts_entityrisk_accountid?: string | null;
  ts_entityriskid?: string | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_Account_Relationships {
  ts_EntityRisk_Account_Account?: ts_EntityRisk_Result[] | null;
}
interface ts_EntityRisk_Account extends ts_EntityRisk_Account_Base, ts_EntityRisk_Account_Relationships {
}
interface ts_EntityRisk_Account_Create extends ts_EntityRisk_Account {
}
interface ts_EntityRisk_Account_Update extends ts_EntityRisk_Account {
}
interface ts_EntityRisk_Account_Select {
  accountid: WebAttribute<ts_EntityRisk_Account_Select, { accountid: string | null }, {  }>;
  ts_entityrisk_accountid: WebAttribute<ts_EntityRisk_Account_Select, { ts_entityrisk_accountid: string | null }, {  }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_Account_Select, { ts_entityriskid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_Account_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_Account_Filter {
  accountid: XQW.Guid;
  ts_entityrisk_accountid: XQW.Guid;
  ts_entityriskid: XQW.Guid;
  versionnumber: number;
}
interface ts_EntityRisk_Account_Expand {
  ts_EntityRisk_Account_Account: WebExpand<ts_EntityRisk_Account_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_Account_Account: ts_EntityRisk_Result[] }>;
}
interface ts_EntityRisk_Account_FormattedResult {
}
interface ts_EntityRisk_Account_Result extends ts_EntityRisk_Account_Base, ts_EntityRisk_Account_Relationships {
  "@odata.etag": string;
}
interface ts_EntityRisk_Account_RelatedOne {
}
interface ts_EntityRisk_Account_RelatedMany {
  ts_EntityRisk_Account_Account: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisk_accountset: WebMappingRetrieve<ts_EntityRisk_Account_Select,ts_EntityRisk_Account_Expand,ts_EntityRisk_Account_Filter,ts_EntityRisk_Account_Fixed,ts_EntityRisk_Account_Result,ts_EntityRisk_Account_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisk_accountset: WebMappingRelated<ts_EntityRisk_Account_RelatedOne,ts_EntityRisk_Account_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisk_accountset: WebMappingCUDA<ts_EntityRisk_Account_Create,ts_EntityRisk_Account_Update,ts_EntityRisk_Account_Select>;
}
