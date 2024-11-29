interface ts_EntityRisk_ovs_operation_Base extends WebEntity {
  ovs_operationid?: string | null;
  ts_entityrisk_ovs_operationid?: string | null;
  ts_entityriskid?: string | null;
  versionnumber?: number | null;
}
interface ts_EntityRisk_ovs_operation_Relationships {
  ts_EntityRisk_ovs_operation_ovs_operation?: ts_EntityRisk_Result[] | null;
}
interface ts_EntityRisk_ovs_operation extends ts_EntityRisk_ovs_operation_Base, ts_EntityRisk_ovs_operation_Relationships {
}
interface ts_EntityRisk_ovs_operation_Create extends ts_EntityRisk_ovs_operation {
}
interface ts_EntityRisk_ovs_operation_Update extends ts_EntityRisk_ovs_operation {
}
interface ts_EntityRisk_ovs_operation_Select {
  ovs_operationid: WebAttribute<ts_EntityRisk_ovs_operation_Select, { ovs_operationid: string | null }, {  }>;
  ts_entityrisk_ovs_operationid: WebAttribute<ts_EntityRisk_ovs_operation_Select, { ts_entityrisk_ovs_operationid: string | null }, {  }>;
  ts_entityriskid: WebAttribute<ts_EntityRisk_ovs_operation_Select, { ts_entityriskid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_EntityRisk_ovs_operation_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EntityRisk_ovs_operation_Filter {
  ovs_operationid: XQW.Guid;
  ts_entityrisk_ovs_operationid: XQW.Guid;
  ts_entityriskid: XQW.Guid;
  versionnumber: number;
}
interface ts_EntityRisk_ovs_operation_Expand {
  ts_EntityRisk_ovs_operation_ovs_operation: WebExpand<ts_EntityRisk_ovs_operation_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_ovs_operation_ovs_operation: ts_EntityRisk_Result[] }>;
}
interface ts_EntityRisk_ovs_operation_FormattedResult {
}
interface ts_EntityRisk_ovs_operation_Result extends ts_EntityRisk_ovs_operation_Base, ts_EntityRisk_ovs_operation_Relationships {
  "@odata.etag": string;
}
interface ts_EntityRisk_ovs_operation_RelatedOne {
}
interface ts_EntityRisk_ovs_operation_RelatedMany {
  ts_EntityRisk_ovs_operation_ovs_operation: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_entityrisk_ovs_operationset: WebMappingRetrieve<ts_EntityRisk_ovs_operation_Select,ts_EntityRisk_ovs_operation_Expand,ts_EntityRisk_ovs_operation_Filter,ts_EntityRisk_ovs_operation_Fixed,ts_EntityRisk_ovs_operation_Result,ts_EntityRisk_ovs_operation_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_entityrisk_ovs_operationset: WebMappingRelated<ts_EntityRisk_ovs_operation_RelatedOne,ts_EntityRisk_ovs_operation_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_entityrisk_ovs_operationset: WebMappingCUDA<ts_EntityRisk_ovs_operation_Create,ts_EntityRisk_ovs_operation_Update,ts_EntityRisk_ovs_operation_Select>;
}
