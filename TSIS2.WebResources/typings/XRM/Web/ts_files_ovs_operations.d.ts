interface ts_Files_ovs_operations_Base extends WebEntity {
  ovs_operationid?: string | null;
  ts_fileid?: string | null;
  ts_files_ovs_operationsid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_ovs_operations_Relationships {
  ts_Files_ovs_operations?: ts_File_Result[] | null;
}
interface ts_Files_ovs_operations extends ts_Files_ovs_operations_Base, ts_Files_ovs_operations_Relationships {
}
interface ts_Files_ovs_operations_Create extends ts_Files_ovs_operations {
}
interface ts_Files_ovs_operations_Update extends ts_Files_ovs_operations {
}
interface ts_Files_ovs_operations_Select {
  ovs_operationid: WebAttribute<ts_Files_ovs_operations_Select, { ovs_operationid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_ovs_operations_Select, { ts_fileid: string | null }, {  }>;
  ts_files_ovs_operationsid: WebAttribute<ts_Files_ovs_operations_Select, { ts_files_ovs_operationsid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_ovs_operations_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_ovs_operations_Filter {
  ovs_operationid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_ovs_operationsid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_ovs_operations_Expand {
  ts_Files_ovs_operations: WebExpand<ts_Files_ovs_operations_Expand, ts_File_Select, ts_File_Filter, { ts_Files_ovs_operations: ts_File_Result[] }>;
}
interface ts_Files_ovs_operations_FormattedResult {
}
interface ts_Files_ovs_operations_Result extends ts_Files_ovs_operations_Base, ts_Files_ovs_operations_Relationships {
  "@odata.etag": string;
}
interface ts_Files_ovs_operations_RelatedOne {
}
interface ts_Files_ovs_operations_RelatedMany {
  ts_Files_ovs_operations: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_ovs_operationsset: WebMappingRetrieve<ts_Files_ovs_operations_Select,ts_Files_ovs_operations_Expand,ts_Files_ovs_operations_Filter,ts_Files_ovs_operations_Fixed,ts_Files_ovs_operations_Result,ts_Files_ovs_operations_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_ovs_operationsset: WebMappingRelated<ts_Files_ovs_operations_RelatedOne,ts_Files_ovs_operations_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_ovs_operationsset: WebMappingCUDA<ts_Files_ovs_operations_Create,ts_Files_ovs_operations_Update,ts_Files_ovs_operations_Select>;
}
