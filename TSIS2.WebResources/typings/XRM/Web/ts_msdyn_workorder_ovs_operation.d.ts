interface ts_msdyn_workorder_ovs_operation_Base extends WebEntity {
  msdyn_workorderid?: string | null;
  ovs_operationid?: string | null;
  ts_msdyn_workorder_ovs_operationid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_workorder_ovs_operation_Relationships {
  ts_msdyn_workorder_ovs_operation_ovs_operati?: msdyn_workorder_Result[] | null;
}
interface ts_msdyn_workorder_ovs_operation extends ts_msdyn_workorder_ovs_operation_Base, ts_msdyn_workorder_ovs_operation_Relationships {
}
interface ts_msdyn_workorder_ovs_operation_Create extends ts_msdyn_workorder_ovs_operation {
}
interface ts_msdyn_workorder_ovs_operation_Update extends ts_msdyn_workorder_ovs_operation {
}
interface ts_msdyn_workorder_ovs_operation_Select {
  msdyn_workorderid: WebAttribute<ts_msdyn_workorder_ovs_operation_Select, { msdyn_workorderid: string | null }, {  }>;
  ovs_operationid: WebAttribute<ts_msdyn_workorder_ovs_operation_Select, { ovs_operationid: string | null }, {  }>;
  ts_msdyn_workorder_ovs_operationid: WebAttribute<ts_msdyn_workorder_ovs_operation_Select, { ts_msdyn_workorder_ovs_operationid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_workorder_ovs_operation_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_workorder_ovs_operation_Filter {
  msdyn_workorderid: XQW.Guid;
  ovs_operationid: XQW.Guid;
  ts_msdyn_workorder_ovs_operationid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_workorder_ovs_operation_Expand {
  ts_msdyn_workorder_ovs_operation_ovs_operati: WebExpand<ts_msdyn_workorder_ovs_operation_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_ovs_operation_ovs_operati: msdyn_workorder_Result[] }>;
}
interface ts_msdyn_workorder_ovs_operation_FormattedResult {
}
interface ts_msdyn_workorder_ovs_operation_Result extends ts_msdyn_workorder_ovs_operation_Base, ts_msdyn_workorder_ovs_operation_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_workorder_ovs_operation_RelatedOne {
}
interface ts_msdyn_workorder_ovs_operation_RelatedMany {
  ts_msdyn_workorder_ovs_operation_ovs_operati: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_workorder_ovs_operationset: WebMappingRetrieve<ts_msdyn_workorder_ovs_operation_Select,ts_msdyn_workorder_ovs_operation_Expand,ts_msdyn_workorder_ovs_operation_Filter,ts_msdyn_workorder_ovs_operation_Fixed,ts_msdyn_workorder_ovs_operation_Result,ts_msdyn_workorder_ovs_operation_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_workorder_ovs_operationset: WebMappingRelated<ts_msdyn_workorder_ovs_operation_RelatedOne,ts_msdyn_workorder_ovs_operation_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_workorder_ovs_operationset: WebMappingCUDA<ts_msdyn_workorder_ovs_operation_Create,ts_msdyn_workorder_ovs_operation_Update,ts_msdyn_workorder_ovs_operation_Select>;
}
