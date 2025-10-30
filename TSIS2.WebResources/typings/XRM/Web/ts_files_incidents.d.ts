interface ts_Files_Incidents_Base extends WebEntity {
  incidentid?: string | null;
  ts_fileid?: string | null;
  ts_files_incidentsid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_Incidents_Relationships {
  ts_Files_Incidents?: ts_File_Result[] | null;
}
interface ts_Files_Incidents extends ts_Files_Incidents_Base, ts_Files_Incidents_Relationships {
}
interface ts_Files_Incidents_Create extends ts_Files_Incidents {
}
interface ts_Files_Incidents_Update extends ts_Files_Incidents {
}
interface ts_Files_Incidents_Select {
  incidentid: WebAttribute<ts_Files_Incidents_Select, { incidentid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_Incidents_Select, { ts_fileid: string | null }, {  }>;
  ts_files_incidentsid: WebAttribute<ts_Files_Incidents_Select, { ts_files_incidentsid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_Incidents_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_Incidents_Filter {
  incidentid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_incidentsid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_Incidents_Expand {
  ts_Files_Incidents: WebExpand<ts_Files_Incidents_Expand, ts_File_Select, ts_File_Filter, { ts_Files_Incidents: ts_File_Result[] }>;
}
interface ts_Files_Incidents_FormattedResult {
}
interface ts_Files_Incidents_Result extends ts_Files_Incidents_Base, ts_Files_Incidents_Relationships {
  "@odata.etag": string;
}
interface ts_Files_Incidents_RelatedOne {
}
interface ts_Files_Incidents_RelatedMany {
  ts_Files_Incidents: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_incidentsset: WebMappingRetrieve<ts_Files_Incidents_Select,ts_Files_Incidents_Expand,ts_Files_Incidents_Filter,ts_Files_Incidents_Fixed,ts_Files_Incidents_Result,ts_Files_Incidents_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_incidentsset: WebMappingRelated<ts_Files_Incidents_RelatedOne,ts_Files_Incidents_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_incidentsset: WebMappingCUDA<ts_Files_Incidents_Create,ts_Files_Incidents_Update,ts_Files_Incidents_Select>;
}
