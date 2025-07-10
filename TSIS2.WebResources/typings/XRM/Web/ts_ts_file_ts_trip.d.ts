interface ts_ts_file_ts_trip_Base extends WebEntity {
  ts_fileid?: string | null;
  ts_tripid?: string | null;
  ts_ts_file_ts_tripid?: string | null;
  versionnumber?: number | null;
}
interface ts_ts_file_ts_trip_Relationships {
  ts_ts_file_ts_trip?: ts_trip_Result[] | null;
}
interface ts_ts_file_ts_trip extends ts_ts_file_ts_trip_Base, ts_ts_file_ts_trip_Relationships {
}
interface ts_ts_file_ts_trip_Create extends ts_ts_file_ts_trip {
}
interface ts_ts_file_ts_trip_Update extends ts_ts_file_ts_trip {
}
interface ts_ts_file_ts_trip_Select {
  ts_fileid: WebAttribute<ts_ts_file_ts_trip_Select, { ts_fileid: string | null }, {  }>;
  ts_tripid: WebAttribute<ts_ts_file_ts_trip_Select, { ts_tripid: string | null }, {  }>;
  ts_ts_file_ts_tripid: WebAttribute<ts_ts_file_ts_trip_Select, { ts_ts_file_ts_tripid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ts_file_ts_trip_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ts_file_ts_trip_Filter {
  ts_fileid: XQW.Guid;
  ts_tripid: XQW.Guid;
  ts_ts_file_ts_tripid: XQW.Guid;
  versionnumber: number;
}
interface ts_ts_file_ts_trip_Expand {
  ts_ts_file_ts_trip: WebExpand<ts_ts_file_ts_trip_Expand, ts_trip_Select, ts_trip_Filter, { ts_ts_file_ts_trip: ts_trip_Result[] }>;
}
interface ts_ts_file_ts_trip_FormattedResult {
}
interface ts_ts_file_ts_trip_Result extends ts_ts_file_ts_trip_Base, ts_ts_file_ts_trip_Relationships {
  "@odata.etag": string;
}
interface ts_ts_file_ts_trip_RelatedOne {
}
interface ts_ts_file_ts_trip_RelatedMany {
  ts_ts_file_ts_trip: WebMappingRetrieve<ts_trip_Select,ts_trip_Expand,ts_trip_Filter,ts_trip_Fixed,ts_trip_Result,ts_trip_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ts_file_ts_tripset: WebMappingRetrieve<ts_ts_file_ts_trip_Select,ts_ts_file_ts_trip_Expand,ts_ts_file_ts_trip_Filter,ts_ts_file_ts_trip_Fixed,ts_ts_file_ts_trip_Result,ts_ts_file_ts_trip_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ts_file_ts_tripset: WebMappingRelated<ts_ts_file_ts_trip_RelatedOne,ts_ts_file_ts_trip_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ts_file_ts_tripset: WebMappingCUDA<ts_ts_file_ts_trip_Create,ts_ts_file_ts_trip_Update,ts_ts_file_ts_trip_Select>;
}
