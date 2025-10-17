interface ts_site_ts_file_Base extends WebEntity {
  ts_fileid?: string | null;
  ts_site_ts_fileid?: string | null;
  ts_siteid?: string | null;
  versionnumber?: number | null;
}
interface ts_site_ts_file_Relationships {
  ts_site_ts_file?: ts_File_Result[] | null;
}
interface ts_site_ts_file extends ts_site_ts_file_Base, ts_site_ts_file_Relationships {
}
interface ts_site_ts_file_Create extends ts_site_ts_file {
}
interface ts_site_ts_file_Update extends ts_site_ts_file {
}
interface ts_site_ts_file_Select {
  ts_fileid: WebAttribute<ts_site_ts_file_Select, { ts_fileid: string | null }, {  }>;
  ts_site_ts_fileid: WebAttribute<ts_site_ts_file_Select, { ts_site_ts_fileid: string | null }, {  }>;
  ts_siteid: WebAttribute<ts_site_ts_file_Select, { ts_siteid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_site_ts_file_Select, { versionnumber: number | null }, {  }>;
}
interface ts_site_ts_file_Filter {
  ts_fileid: XQW.Guid;
  ts_site_ts_fileid: XQW.Guid;
  ts_siteid: XQW.Guid;
  versionnumber: number;
}
interface ts_site_ts_file_Expand {
  ts_site_ts_file: WebExpand<ts_site_ts_file_Expand, ts_File_Select, ts_File_Filter, { ts_site_ts_file: ts_File_Result[] }>;
}
interface ts_site_ts_file_FormattedResult {
}
interface ts_site_ts_file_Result extends ts_site_ts_file_Base, ts_site_ts_file_Relationships {
  "@odata.etag": string;
}
interface ts_site_ts_file_RelatedOne {
}
interface ts_site_ts_file_RelatedMany {
  ts_site_ts_file: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_site_ts_fileset: WebMappingRetrieve<ts_site_ts_file_Select,ts_site_ts_file_Expand,ts_site_ts_file_Filter,ts_site_ts_file_Fixed,ts_site_ts_file_Result,ts_site_ts_file_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_site_ts_fileset: WebMappingRelated<ts_site_ts_file_RelatedOne,ts_site_ts_file_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_site_ts_fileset: WebMappingCUDA<ts_site_ts_file_Create,ts_site_ts_file_Update,ts_site_ts_file_Select>;
}
