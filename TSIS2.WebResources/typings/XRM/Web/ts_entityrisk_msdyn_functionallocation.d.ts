interface ts_EntityRisk_msdyn_FunctionalLocation_Base extends WebEntity {
  msdyn_functionallocationid?: string | null;
  ts_entityrisk_msdyn_functionallocationid?: string | null;
  ts_entityriskid?: string | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Relationships {
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation?: ts_EntityRisk_Result[] | null;
}
interface ts_EntityRisk_msdyn_FunctionalLocation extends ts_EntityRisk_msdyn_FunctionalLocation_Base, ts_EntityRisk_msdyn_FunctionalLocation_Relationships {
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Create extends ts_EntityRisk_msdyn_FunctionalLocation {
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Update extends ts_EntityRisk_msdyn_FunctionalLocation {
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Select {
  msdyn_functionallocationid: WebAttribute<ts_EntityRisk_msdyn_FunctionalLocation_Select, { msdyn_functionallocationid: string | null }, {  }>;
  ts_entityrisk_msdyn_functionallocationid: WebAttribute<ts_EntityRisk_msdyn_FunctionalLocation_Select, { ts_entityrisk_msdyn_functionallocationid: string | null }, {  }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_msdyn_FunctionalLocation_Select, { ts_entityriskid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_msdyn_FunctionalLocation_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Filter {
  msdyn_functionallocationid: XQW.Guid;
  ts_entityrisk_msdyn_functionallocationid: XQW.Guid;
  ts_entityriskid: XQW.Guid;
  versionnumber: number;
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Expand {
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: WebExpand<ts_EntityRisk_msdyn_FunctionalLocation_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: ts_EntityRisk_Result[] }>;
}
interface ts_EntityRisk_msdyn_FunctionalLocation_FormattedResult {
}
interface ts_EntityRisk_msdyn_FunctionalLocation_Result extends ts_EntityRisk_msdyn_FunctionalLocation_Base, ts_EntityRisk_msdyn_FunctionalLocation_Relationships {
  "@odata.etag": string;
}
interface ts_EntityRisk_msdyn_FunctionalLocation_RelatedOne {
}
interface ts_EntityRisk_msdyn_FunctionalLocation_RelatedMany {
  ts_EntityRisk_msdyn_FunctionalLocation_msdyn_FunctionalLocation: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisk_msdyn_functionallocationset: WebMappingRetrieve<ts_EntityRisk_msdyn_FunctionalLocation_Select,ts_EntityRisk_msdyn_FunctionalLocation_Expand,ts_EntityRisk_msdyn_FunctionalLocation_Filter,ts_EntityRisk_msdyn_FunctionalLocation_Fixed,ts_EntityRisk_msdyn_FunctionalLocation_Result,ts_EntityRisk_msdyn_FunctionalLocation_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisk_msdyn_functionallocationset: WebMappingRelated<ts_EntityRisk_msdyn_FunctionalLocation_RelatedOne,ts_EntityRisk_msdyn_FunctionalLocation_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisk_msdyn_functionallocationset: WebMappingCUDA<ts_EntityRisk_msdyn_FunctionalLocation_Create,ts_EntityRisk_msdyn_FunctionalLocation_Update,ts_EntityRisk_msdyn_FunctionalLocation_Select>;
}
