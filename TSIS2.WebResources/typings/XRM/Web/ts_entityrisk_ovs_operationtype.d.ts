interface ts_EntityRisk_ovs_operationtype_Base extends WebEntity {
  ovs_operationtypeid?: string | null;
  ts_entityrisk_ovs_operationtypeid?: string | null;
  ts_entityriskid?: string | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_ovs_operationtype_Relationships {
  ts_EntityRisk_ovs_operationtype_ovs_operationtype?: ts_EntityRisk_Result[] | null;
}
interface ts_EntityRisk_ovs_operationtype extends ts_EntityRisk_ovs_operationtype_Base, ts_EntityRisk_ovs_operationtype_Relationships {
}
interface ts_EntityRisk_ovs_operationtype_Create extends ts_EntityRisk_ovs_operationtype {
}
interface ts_EntityRisk_ovs_operationtype_Update extends ts_EntityRisk_ovs_operationtype {
}
interface ts_EntityRisk_ovs_operationtype_Select {
  ovs_operationtypeid: WebAttribute<ts_EntityRisk_ovs_operationtype_Select, { ovs_operationtypeid: string | null }, {  }>;
  ts_entityrisk_ovs_operationtypeid: WebAttribute<ts_EntityRisk_ovs_operationtype_Select, { ts_entityrisk_ovs_operationtypeid: string | null }, {  }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_ovs_operationtype_Select, { ts_entityriskid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_ovs_operationtype_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_ovs_operationtype_Filter {
  ovs_operationtypeid: XQW.Guid;
  ts_entityrisk_ovs_operationtypeid: XQW.Guid;
  ts_entityriskid: XQW.Guid;
  versionnumber: number;
}
interface ts_EntityRisk_ovs_operationtype_Expand {
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebExpand<ts_EntityRisk_ovs_operationtype_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_ovs_operationtype_ovs_operationtype: ts_EntityRisk_Result[] }>;
}
interface ts_EntityRisk_ovs_operationtype_FormattedResult {
}
interface ts_EntityRisk_ovs_operationtype_Result extends ts_EntityRisk_ovs_operationtype_Base, ts_EntityRisk_ovs_operationtype_Relationships {
  "@odata.etag": string;
}
interface ts_EntityRisk_ovs_operationtype_RelatedOne {
}
interface ts_EntityRisk_ovs_operationtype_RelatedMany {
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisk_ovs_operationtypeset: WebMappingRetrieve<ts_EntityRisk_ovs_operationtype_Select,ts_EntityRisk_ovs_operationtype_Expand,ts_EntityRisk_ovs_operationtype_Filter,ts_EntityRisk_ovs_operationtype_Fixed,ts_EntityRisk_ovs_operationtype_Result,ts_EntityRisk_ovs_operationtype_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisk_ovs_operationtypeset: WebMappingRelated<ts_EntityRisk_ovs_operationtype_RelatedOne,ts_EntityRisk_ovs_operationtype_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisk_ovs_operationtypeset: WebMappingCUDA<ts_EntityRisk_ovs_operationtype_Create,ts_EntityRisk_ovs_operationtype_Update,ts_EntityRisk_ovs_operationtype_Select>;
}
