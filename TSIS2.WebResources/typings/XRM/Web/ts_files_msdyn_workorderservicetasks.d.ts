interface ts_Files_msdyn_workorderservicetasks_Base extends WebEntity {
  msdyn_workorderservicetaskid?: string | null;
  ts_fileid?: string | null;
  ts_files_msdyn_workorderservicetasksid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_msdyn_workorderservicetasks_Relationships {
  ts_Files_msdyn_workorderservicetasks?: ts_File_Result[] | null;
}
interface ts_Files_msdyn_workorderservicetasks extends ts_Files_msdyn_workorderservicetasks_Base, ts_Files_msdyn_workorderservicetasks_Relationships {
}
interface ts_Files_msdyn_workorderservicetasks_Create extends ts_Files_msdyn_workorderservicetasks {
}
interface ts_Files_msdyn_workorderservicetasks_Update extends ts_Files_msdyn_workorderservicetasks {
}
interface ts_Files_msdyn_workorderservicetasks_Select {
  msdyn_workorderservicetaskid: WebAttribute<ts_Files_msdyn_workorderservicetasks_Select, { msdyn_workorderservicetaskid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_msdyn_workorderservicetasks_Select, { ts_fileid: string | null }, {  }>;
  ts_files_msdyn_workorderservicetasksid: WebAttribute<ts_Files_msdyn_workorderservicetasks_Select, { ts_files_msdyn_workorderservicetasksid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_msdyn_workorderservicetasks_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_msdyn_workorderservicetasks_Filter {
  msdyn_workorderservicetaskid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_msdyn_workorderservicetasksid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_msdyn_workorderservicetasks_Expand {
  ts_Files_msdyn_workorderservicetasks: WebExpand<ts_Files_msdyn_workorderservicetasks_Expand, ts_File_Select, ts_File_Filter, { ts_Files_msdyn_workorderservicetasks: ts_File_Result[] }>;
}
interface ts_Files_msdyn_workorderservicetasks_FormattedResult {
}
interface ts_Files_msdyn_workorderservicetasks_Result extends ts_Files_msdyn_workorderservicetasks_Base, ts_Files_msdyn_workorderservicetasks_Relationships {
  "@odata.etag": string;
}
interface ts_Files_msdyn_workorderservicetasks_RelatedOne {
}
interface ts_Files_msdyn_workorderservicetasks_RelatedMany {
  ts_Files_msdyn_workorderservicetasks: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_msdyn_workorderservicetasksset: WebMappingRetrieve<ts_Files_msdyn_workorderservicetasks_Select,ts_Files_msdyn_workorderservicetasks_Expand,ts_Files_msdyn_workorderservicetasks_Filter,ts_Files_msdyn_workorderservicetasks_Fixed,ts_Files_msdyn_workorderservicetasks_Result,ts_Files_msdyn_workorderservicetasks_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_msdyn_workorderservicetasksset: WebMappingRelated<ts_Files_msdyn_workorderservicetasks_RelatedOne,ts_Files_msdyn_workorderservicetasks_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_msdyn_workorderservicetasksset: WebMappingCUDA<ts_Files_msdyn_workorderservicetasks_Create,ts_Files_msdyn_workorderservicetasks_Update,ts_Files_msdyn_workorderservicetasks_Select>;
}
