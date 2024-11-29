interface ts_EntityRisk_msdyn_incidenttype_Base extends WebEntity {
  msdyn_incidenttypeid?: string | null;
  ts_entityrisk_msdyn_incidenttypeid?: string | null;
  ts_entityriskid?: string | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_msdyn_incidenttype_Relationships {
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype?: ts_EntityRisk_Result[] | null;
}
interface ts_EntityRisk_msdyn_incidenttype extends ts_EntityRisk_msdyn_incidenttype_Base, ts_EntityRisk_msdyn_incidenttype_Relationships {
}
interface ts_EntityRisk_msdyn_incidenttype_Create extends ts_EntityRisk_msdyn_incidenttype {
}
interface ts_EntityRisk_msdyn_incidenttype_Update extends ts_EntityRisk_msdyn_incidenttype {
}
interface ts_EntityRisk_msdyn_incidenttype_Select {
  msdyn_incidenttypeid: WebAttribute<ts_EntityRisk_msdyn_incidenttype_Select, { msdyn_incidenttypeid: string | null }, {  }>;
  ts_entityrisk_msdyn_incidenttypeid: WebAttribute<ts_EntityRisk_msdyn_incidenttype_Select, { ts_entityrisk_msdyn_incidenttypeid: string | null }, {  }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_msdyn_incidenttype_Select, { ts_entityriskid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_msdyn_incidenttype_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_msdyn_incidenttype_Filter {
  msdyn_incidenttypeid: XQW.Guid;
  ts_entityrisk_msdyn_incidenttypeid: XQW.Guid;
  ts_entityriskid: XQW.Guid;
  versionnumber: number;
}
interface ts_EntityRisk_msdyn_incidenttype_Expand {
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: WebExpand<ts_EntityRisk_msdyn_incidenttype_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: ts_EntityRisk_Result[] }>;
}
interface ts_EntityRisk_msdyn_incidenttype_FormattedResult {
}
interface ts_EntityRisk_msdyn_incidenttype_Result extends ts_EntityRisk_msdyn_incidenttype_Base, ts_EntityRisk_msdyn_incidenttype_Relationships {
  "@odata.etag": string;
}
interface ts_EntityRisk_msdyn_incidenttype_RelatedOne {
}
interface ts_EntityRisk_msdyn_incidenttype_RelatedMany {
  ts_EntityRisk_msdyn_incidenttype_msdyn_incidenttype: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisk_msdyn_incidenttypeset: WebMappingRetrieve<ts_EntityRisk_msdyn_incidenttype_Select,ts_EntityRisk_msdyn_incidenttype_Expand,ts_EntityRisk_msdyn_incidenttype_Filter,ts_EntityRisk_msdyn_incidenttype_Fixed,ts_EntityRisk_msdyn_incidenttype_Result,ts_EntityRisk_msdyn_incidenttype_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisk_msdyn_incidenttypeset: WebMappingRelated<ts_EntityRisk_msdyn_incidenttype_RelatedOne,ts_EntityRisk_msdyn_incidenttype_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisk_msdyn_incidenttypeset: WebMappingCUDA<ts_EntityRisk_msdyn_incidenttype_Create,ts_EntityRisk_msdyn_incidenttype_Update,ts_EntityRisk_msdyn_incidenttype_Select>;
}
