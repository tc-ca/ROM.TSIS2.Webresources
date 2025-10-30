interface ts_ovs_operation_ts_unplannedworkorder_Base extends WebEntity {
  ovs_operationid?: string | null;
  ts_ovs_operation_ts_unplannedworkorderid?: string | null;
  ts_unplannedworkorderid?: string | null;
  versionnumber?: number | null;
}
interface ts_ovs_operation_ts_unplannedworkorder_Relationships {
  ts_ovs_operation_ts_unplannedworkorder_ts_unplannedworkorder?: ovs_operation_Result[] | null;
}
interface ts_ovs_operation_ts_unplannedworkorder extends ts_ovs_operation_ts_unplannedworkorder_Base, ts_ovs_operation_ts_unplannedworkorder_Relationships {
}
interface ts_ovs_operation_ts_unplannedworkorder_Create extends ts_ovs_operation_ts_unplannedworkorder {
}
interface ts_ovs_operation_ts_unplannedworkorder_Update extends ts_ovs_operation_ts_unplannedworkorder {
}
interface ts_ovs_operation_ts_unplannedworkorder_Select {
  ovs_operationid: WebAttribute<ts_ovs_operation_ts_unplannedworkorder_Select, { ovs_operationid: string | null }, {  }>;
  ts_ovs_operation_ts_unplannedworkorderid: WebAttribute<ts_ovs_operation_ts_unplannedworkorder_Select, { ts_ovs_operation_ts_unplannedworkorderid: string | null }, {  }>;
  ts_unplannedworkorderid: WebAttribute<ts_ovs_operation_ts_unplannedworkorder_Select, { ts_unplannedworkorderid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ovs_operation_ts_unplannedworkorder_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ovs_operation_ts_unplannedworkorder_Filter {
  ovs_operationid: XQW.Guid;
  ts_ovs_operation_ts_unplannedworkorderid: XQW.Guid;
  ts_unplannedworkorderid: XQW.Guid;
  versionnumber: number;
}
interface ts_ovs_operation_ts_unplannedworkorder_Expand {
  ts_ovs_operation_ts_unplannedworkorder_ts_unplannedworkorder: WebExpand<ts_ovs_operation_ts_unplannedworkorder_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation_ts_unplannedworkorder_ts_unplannedworkorder: ovs_operation_Result[] }>;
}
interface ts_ovs_operation_ts_unplannedworkorder_FormattedResult {
}
interface ts_ovs_operation_ts_unplannedworkorder_Result extends ts_ovs_operation_ts_unplannedworkorder_Base, ts_ovs_operation_ts_unplannedworkorder_Relationships {
  "@odata.etag": string;
}
interface ts_ovs_operation_ts_unplannedworkorder_RelatedOne {
}
interface ts_ovs_operation_ts_unplannedworkorder_RelatedMany {
  ts_ovs_operation_ts_unplannedworkorder_ts_unplannedworkorder: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ovs_operation_ts_unplannedworkorderset: WebMappingRetrieve<ts_ovs_operation_ts_unplannedworkorder_Select,ts_ovs_operation_ts_unplannedworkorder_Expand,ts_ovs_operation_ts_unplannedworkorder_Filter,ts_ovs_operation_ts_unplannedworkorder_Fixed,ts_ovs_operation_ts_unplannedworkorder_Result,ts_ovs_operation_ts_unplannedworkorder_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ovs_operation_ts_unplannedworkorderset: WebMappingRelated<ts_ovs_operation_ts_unplannedworkorder_RelatedOne,ts_ovs_operation_ts_unplannedworkorder_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ovs_operation_ts_unplannedworkorderset: WebMappingCUDA<ts_ovs_operation_ts_unplannedworkorder_Create,ts_ovs_operation_ts_unplannedworkorder_Update,ts_ovs_operation_ts_unplannedworkorder_Select>;
}
