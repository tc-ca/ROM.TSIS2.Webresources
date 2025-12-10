interface ts_unplannedworkorder_Team_Base extends WebEntity {
  teamid?: string | null;
  ts_unplannedworkorder_teamid?: string | null;
  ts_unplannedworkorderid?: string | null;
  versionnumber?: number | null;
}
interface ts_unplannedworkorder_Team_Relationships {
  ts_unplannedworkorder_Team_Team?: ts_unplannedworkorder_Result[] | null;
}
interface ts_unplannedworkorder_Team extends ts_unplannedworkorder_Team_Base, ts_unplannedworkorder_Team_Relationships {
}
interface ts_unplannedworkorder_Team_Create extends ts_unplannedworkorder_Team {
}
interface ts_unplannedworkorder_Team_Update extends ts_unplannedworkorder_Team {
}
interface ts_unplannedworkorder_Team_Select {
  teamid: WebAttribute<ts_unplannedworkorder_Team_Select, { teamid: string | null }, {  }>;
  ts_unplannedworkorder_teamid: WebAttribute<ts_unplannedworkorder_Team_Select, { ts_unplannedworkorder_teamid: string | null }, {  }>;
  ts_unplannedworkorderid: WebAttribute<ts_unplannedworkorder_Team_Select, { ts_unplannedworkorderid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_unplannedworkorder_Team_Select, { versionnumber: number | null }, {  }>;
}
interface ts_unplannedworkorder_Team_Filter {
  teamid: XQW.Guid;
  ts_unplannedworkorder_teamid: XQW.Guid;
  ts_unplannedworkorderid: XQW.Guid;
  versionnumber: number;
}
interface ts_unplannedworkorder_Team_Expand {
  ts_unplannedworkorder_Team_Team: WebExpand<ts_unplannedworkorder_Team_Expand, ts_unplannedworkorder_Select, ts_unplannedworkorder_Filter, { ts_unplannedworkorder_Team_Team: ts_unplannedworkorder_Result[] }>;
}
interface ts_unplannedworkorder_Team_FormattedResult {
}
interface ts_unplannedworkorder_Team_Result extends ts_unplannedworkorder_Team_Base, ts_unplannedworkorder_Team_Relationships {
  "@odata.etag": string;
}
interface ts_unplannedworkorder_Team_RelatedOne {
}
interface ts_unplannedworkorder_Team_RelatedMany {
  ts_unplannedworkorder_Team_Team: WebMappingRetrieve<ts_unplannedworkorder_Select,ts_unplannedworkorder_Expand,ts_unplannedworkorder_Filter,ts_unplannedworkorder_Fixed,ts_unplannedworkorder_Result,ts_unplannedworkorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_unplannedworkorder_teamset: WebMappingRetrieve<ts_unplannedworkorder_Team_Select,ts_unplannedworkorder_Team_Expand,ts_unplannedworkorder_Team_Filter,ts_unplannedworkorder_Team_Fixed,ts_unplannedworkorder_Team_Result,ts_unplannedworkorder_Team_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_unplannedworkorder_teamset: WebMappingRelated<ts_unplannedworkorder_Team_RelatedOne,ts_unplannedworkorder_Team_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_unplannedworkorder_teamset: WebMappingCUDA<ts_unplannedworkorder_Team_Create,ts_unplannedworkorder_Team_Update,ts_unplannedworkorder_Team_Select>;
}
