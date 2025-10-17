interface ts_File_Team_Base extends WebEntity {
  teamid?: string | null;
  ts_file_teamid?: string | null;
  ts_fileid?: string | null;
  versionnumber?: number | null;
}
interface ts_File_Team_Relationships {
  ts_File_Team_Team?: ts_File_Result[] | null;
}
interface ts_File_Team extends ts_File_Team_Base, ts_File_Team_Relationships {
}
interface ts_File_Team_Create extends ts_File_Team {
}
interface ts_File_Team_Update extends ts_File_Team {
}
interface ts_File_Team_Select {
  teamid: WebAttribute<ts_File_Team_Select, { teamid: string | null }, {  }>;
  ts_file_teamid: WebAttribute<ts_File_Team_Select, { ts_file_teamid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_File_Team_Select, { ts_fileid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_File_Team_Select, { versionnumber: number | null }, {  }>;
}
interface ts_File_Team_Filter {
  teamid: XQW.Guid;
  ts_file_teamid: XQW.Guid;
  ts_fileid: XQW.Guid;
  versionnumber: number;
}
interface ts_File_Team_Expand {
  ts_File_Team_Team: WebExpand<ts_File_Team_Expand, ts_File_Select, ts_File_Filter, { ts_File_Team_Team: ts_File_Result[] }>;
}
interface ts_File_Team_FormattedResult {
}
interface ts_File_Team_Result extends ts_File_Team_Base, ts_File_Team_Relationships {
  "@odata.etag": string;
}
interface ts_File_Team_RelatedOne {
}
interface ts_File_Team_RelatedMany {
  ts_File_Team_Team: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_file_teamset: WebMappingRetrieve<ts_File_Team_Select,ts_File_Team_Expand,ts_File_Team_Filter,ts_File_Team_Fixed,ts_File_Team_Result,ts_File_Team_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_file_teamset: WebMappingRelated<ts_File_Team_RelatedOne,ts_File_Team_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_file_teamset: WebMappingCUDA<ts_File_Team_Create,ts_File_Team_Update,ts_File_Team_Select>;
}
