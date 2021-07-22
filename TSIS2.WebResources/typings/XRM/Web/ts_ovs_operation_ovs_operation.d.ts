interface ts_ovs_operation_ovs_operation_Base extends WebEntity {
  ovs_operationidone?: string | null;
  ovs_operationidtwo?: string | null;
  ts_ovs_operation_ovs_operationid?: string | null;
  versionnumber?: number | null;
}
interface ts_ovs_operation_ovs_operation_Relationships {
  ts_ovs_operation_ovs_operation_ovs_operation?: ovs_operation_Result[] | null;
}
interface ts_ovs_operation_ovs_operation extends ts_ovs_operation_ovs_operation_Base, ts_ovs_operation_ovs_operation_Relationships {
}
interface ts_ovs_operation_ovs_operation_Create extends ts_ovs_operation_ovs_operation {
}
interface ts_ovs_operation_ovs_operation_Update extends ts_ovs_operation_ovs_operation {
}
interface ts_ovs_operation_ovs_operation_Select {
  ovs_operationidone: WebAttribute<ts_ovs_operation_ovs_operation_Select, { ovs_operationidone: string | null }, {  }>;
  ovs_operationidtwo: WebAttribute<ts_ovs_operation_ovs_operation_Select, { ovs_operationidtwo: string | null }, {  }>;
  ts_ovs_operation_ovs_operationid: WebAttribute<ts_ovs_operation_ovs_operation_Select, { ts_ovs_operation_ovs_operationid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ovs_operation_ovs_operation_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ovs_operation_ovs_operation_Filter {
  ovs_operationidone: XQW.Guid;
  ovs_operationidtwo: XQW.Guid;
  ts_ovs_operation_ovs_operationid: XQW.Guid;
  versionnumber: number;
}
interface ts_ovs_operation_ovs_operation_Expand {
  ts_ovs_operation_ovs_operation_ovs_operation: WebExpand<ts_ovs_operation_ovs_operation_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation_ovs_operation_ovs_operation: ovs_operation_Result[] }>;
}
interface ts_ovs_operation_ovs_operation_FormattedResult {
}
interface ts_ovs_operation_ovs_operation_Result extends ts_ovs_operation_ovs_operation_Base, ts_ovs_operation_ovs_operation_Relationships {
  "@odata.etag": string;
}
interface ts_ovs_operation_ovs_operation_RelatedOne {
}
interface ts_ovs_operation_ovs_operation_RelatedMany {
  ts_ovs_operation_ovs_operation_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ovs_operation_ovs_operationset: WebMappingRetrieve<ts_ovs_operation_ovs_operation_Select,ts_ovs_operation_ovs_operation_Expand,ts_ovs_operation_ovs_operation_Filter,ts_ovs_operation_ovs_operation_Fixed,ts_ovs_operation_ovs_operation_Result,ts_ovs_operation_ovs_operation_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ovs_operation_ovs_operationset: WebMappingRelated<ts_ovs_operation_ovs_operation_RelatedOne,ts_ovs_operation_ovs_operation_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ovs_operation_ovs_operationset: WebMappingCUDA<ts_ovs_operation_ovs_operation_Create,ts_ovs_operation_ovs_operation_Update,ts_ovs_operation_ovs_operation_Select>;
}
