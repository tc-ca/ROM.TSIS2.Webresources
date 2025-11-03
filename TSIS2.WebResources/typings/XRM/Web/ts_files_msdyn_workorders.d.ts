interface ts_Files_msdyn_workorders_Base extends WebEntity {
  msdyn_workorderid?: string | null;
  ts_fileid?: string | null;
  ts_files_msdyn_workordersid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_msdyn_workorders_Relationships {
  ts_Files_msdyn_workorders?: ts_File_Result[] | null;
}
interface ts_Files_msdyn_workorders extends ts_Files_msdyn_workorders_Base, ts_Files_msdyn_workorders_Relationships {
}
interface ts_Files_msdyn_workorders_Create extends ts_Files_msdyn_workorders {
}
interface ts_Files_msdyn_workorders_Update extends ts_Files_msdyn_workorders {
}
interface ts_Files_msdyn_workorders_Select {
  msdyn_workorderid: WebAttribute<ts_Files_msdyn_workorders_Select, { msdyn_workorderid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_msdyn_workorders_Select, { ts_fileid: string | null }, {  }>;
  ts_files_msdyn_workordersid: WebAttribute<ts_Files_msdyn_workorders_Select, { ts_files_msdyn_workordersid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_msdyn_workorders_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_msdyn_workorders_Filter {
  msdyn_workorderid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_msdyn_workordersid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_msdyn_workorders_Expand {
  ts_Files_msdyn_workorders: WebExpand<ts_Files_msdyn_workorders_Expand, ts_File_Select, ts_File_Filter, { ts_Files_msdyn_workorders: ts_File_Result[] }>;
}
interface ts_Files_msdyn_workorders_FormattedResult {
}
interface ts_Files_msdyn_workorders_Result extends ts_Files_msdyn_workorders_Base, ts_Files_msdyn_workorders_Relationships {
  "@odata.etag": string;
}
interface ts_Files_msdyn_workorders_RelatedOne {
}
interface ts_Files_msdyn_workorders_RelatedMany {
  ts_Files_msdyn_workorders: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_msdyn_workordersset: WebMappingRetrieve<ts_Files_msdyn_workorders_Select,ts_Files_msdyn_workorders_Expand,ts_Files_msdyn_workorders_Filter,ts_Files_msdyn_workorders_Fixed,ts_Files_msdyn_workorders_Result,ts_Files_msdyn_workorders_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_msdyn_workordersset: WebMappingRelated<ts_Files_msdyn_workorders_RelatedOne,ts_Files_msdyn_workorders_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_msdyn_workordersset: WebMappingCUDA<ts_Files_msdyn_workorders_Create,ts_Files_msdyn_workorders_Update,ts_Files_msdyn_workorders_Select>;
}
