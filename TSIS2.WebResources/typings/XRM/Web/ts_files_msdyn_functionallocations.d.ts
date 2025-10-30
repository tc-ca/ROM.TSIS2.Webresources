interface ts_Files_msdyn_FunctionalLocations_Base extends WebEntity {
  msdyn_functionallocationid?: string | null;
  ts_fileid?: string | null;
  ts_files_msdyn_functionallocationsid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_msdyn_FunctionalLocations_Relationships {
  ts_Files_msdyn_FunctionalLocations?: ts_File_Result[] | null;
}
interface ts_Files_msdyn_FunctionalLocations extends ts_Files_msdyn_FunctionalLocations_Base, ts_Files_msdyn_FunctionalLocations_Relationships {
}
interface ts_Files_msdyn_FunctionalLocations_Create extends ts_Files_msdyn_FunctionalLocations {
}
interface ts_Files_msdyn_FunctionalLocations_Update extends ts_Files_msdyn_FunctionalLocations {
}
interface ts_Files_msdyn_FunctionalLocations_Select {
  msdyn_functionallocationid: WebAttribute<ts_Files_msdyn_FunctionalLocations_Select, { msdyn_functionallocationid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_msdyn_FunctionalLocations_Select, { ts_fileid: string | null }, {  }>;
  ts_files_msdyn_functionallocationsid: WebAttribute<ts_Files_msdyn_FunctionalLocations_Select, { ts_files_msdyn_functionallocationsid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_msdyn_FunctionalLocations_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_msdyn_FunctionalLocations_Filter {
  msdyn_functionallocationid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_msdyn_functionallocationsid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_msdyn_FunctionalLocations_Expand {
  ts_Files_msdyn_FunctionalLocations: WebExpand<ts_Files_msdyn_FunctionalLocations_Expand, ts_File_Select, ts_File_Filter, { ts_Files_msdyn_FunctionalLocations: ts_File_Result[] }>;
}
interface ts_Files_msdyn_FunctionalLocations_FormattedResult {
}
interface ts_Files_msdyn_FunctionalLocations_Result extends ts_Files_msdyn_FunctionalLocations_Base, ts_Files_msdyn_FunctionalLocations_Relationships {
  "@odata.etag": string;
}
interface ts_Files_msdyn_FunctionalLocations_RelatedOne {
}
interface ts_Files_msdyn_FunctionalLocations_RelatedMany {
  ts_Files_msdyn_FunctionalLocations: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_msdyn_functionallocationsset: WebMappingRetrieve<ts_Files_msdyn_FunctionalLocations_Select,ts_Files_msdyn_FunctionalLocations_Expand,ts_Files_msdyn_FunctionalLocations_Filter,ts_Files_msdyn_FunctionalLocations_Fixed,ts_Files_msdyn_FunctionalLocations_Result,ts_Files_msdyn_FunctionalLocations_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_msdyn_functionallocationsset: WebMappingRelated<ts_Files_msdyn_FunctionalLocations_RelatedOne,ts_Files_msdyn_FunctionalLocations_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_msdyn_functionallocationsset: WebMappingCUDA<ts_Files_msdyn_FunctionalLocations_Create,ts_Files_msdyn_FunctionalLocations_Update,ts_Files_msdyn_FunctionalLocations_Select>;
}
