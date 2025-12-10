interface ts_msdyn_workorder_Team_Base extends WebEntity {
  msdyn_workorderid?: string | null;
  teamid?: string | null;
  ts_msdyn_workorder_teamid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_workorder_Team_Relationships {
  ts_msdyn_workorder_Team_Team?: msdyn_workorder_Result[] | null;
}
interface ts_msdyn_workorder_Team extends ts_msdyn_workorder_Team_Base, ts_msdyn_workorder_Team_Relationships {
}
interface ts_msdyn_workorder_Team_Create extends ts_msdyn_workorder_Team {
}
interface ts_msdyn_workorder_Team_Update extends ts_msdyn_workorder_Team {
}
interface ts_msdyn_workorder_Team_Select {
  msdyn_workorderid: WebAttribute<ts_msdyn_workorder_Team_Select, { msdyn_workorderid: string | null }, {  }>;
  teamid: WebAttribute<ts_msdyn_workorder_Team_Select, { teamid: string | null }, {  }>;
  ts_msdyn_workorder_teamid: WebAttribute<ts_msdyn_workorder_Team_Select, { ts_msdyn_workorder_teamid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_workorder_Team_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_workorder_Team_Filter {
  msdyn_workorderid: XQW.Guid;
  teamid: XQW.Guid;
  ts_msdyn_workorder_teamid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_workorder_Team_Expand {
  ts_msdyn_workorder_Team_Team: WebExpand<ts_msdyn_workorder_Team_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_Team_Team: msdyn_workorder_Result[] }>;
}
interface ts_msdyn_workorder_Team_FormattedResult {
}
interface ts_msdyn_workorder_Team_Result extends ts_msdyn_workorder_Team_Base, ts_msdyn_workorder_Team_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_workorder_Team_RelatedOne {
}
interface ts_msdyn_workorder_Team_RelatedMany {
  ts_msdyn_workorder_Team_Team: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_workorder_teamset: WebMappingRetrieve<ts_msdyn_workorder_Team_Select,ts_msdyn_workorder_Team_Expand,ts_msdyn_workorder_Team_Filter,ts_msdyn_workorder_Team_Fixed,ts_msdyn_workorder_Team_Result,ts_msdyn_workorder_Team_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_workorder_teamset: WebMappingRelated<ts_msdyn_workorder_Team_RelatedOne,ts_msdyn_workorder_Team_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_workorder_teamset: WebMappingCUDA<ts_msdyn_workorder_Team_Create,ts_msdyn_workorder_Team_Update,ts_msdyn_workorder_Team_Select>;
}
