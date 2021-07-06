interface ts_msdyn_customerasset_msdyn_customerasset_Base extends WebEntity {
  msdyn_customerassetidone?: string | null;
  msdyn_customerassetidtwo?: string | null;
  ts_msdyn_customerasset_msdyn_customerassetid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_customerasset_msdyn_customerasset_Relationships {
  ts_msdyn_customerasset_msdyn_customerasset?: msdyn_customerasset_Result[] | null;
}
interface ts_msdyn_customerasset_msdyn_customerasset extends ts_msdyn_customerasset_msdyn_customerasset_Base, ts_msdyn_customerasset_msdyn_customerasset_Relationships {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Create extends ts_msdyn_customerasset_msdyn_customerasset {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Update extends ts_msdyn_customerasset_msdyn_customerasset {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Select {
  msdyn_customerassetidone: WebAttribute<ts_msdyn_customerasset_msdyn_customerasset_Select, { msdyn_customerassetidone: string | null }, {  }>;
  msdyn_customerassetidtwo: WebAttribute<ts_msdyn_customerasset_msdyn_customerasset_Select, { msdyn_customerassetidtwo: string | null }, {  }>;
  ts_msdyn_customerasset_msdyn_customerassetid: WebAttribute<ts_msdyn_customerasset_msdyn_customerasset_Select, { ts_msdyn_customerasset_msdyn_customerassetid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_customerasset_msdyn_customerasset_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_customerasset_msdyn_customerasset_Filter {
  msdyn_customerassetidone: XQW.Guid;
  msdyn_customerassetidtwo: XQW.Guid;
  ts_msdyn_customerasset_msdyn_customerassetid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_customerasset_msdyn_customerasset_Expand {
  ts_msdyn_customerasset_msdyn_customerasset: WebExpand<ts_msdyn_customerasset_msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { ts_msdyn_customerasset_msdyn_customerasset: msdyn_customerasset_Result[] }>;
}
interface ts_msdyn_customerasset_msdyn_customerasset_FormattedResult {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Result extends ts_msdyn_customerasset_msdyn_customerasset_Base, ts_msdyn_customerasset_msdyn_customerasset_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_customerasset_msdyn_customerasset_RelatedOne {
}
interface ts_msdyn_customerasset_msdyn_customerasset_RelatedMany {
  ts_msdyn_customerasset_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_customerasset_msdyn_customerassetset: WebMappingRetrieve<ts_msdyn_customerasset_msdyn_customerasset_Select,ts_msdyn_customerasset_msdyn_customerasset_Expand,ts_msdyn_customerasset_msdyn_customerasset_Filter,ts_msdyn_customerasset_msdyn_customerasset_Fixed,ts_msdyn_customerasset_msdyn_customerasset_Result,ts_msdyn_customerasset_msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_customerasset_msdyn_customerassetset: WebMappingRelated<ts_msdyn_customerasset_msdyn_customerasset_RelatedOne,ts_msdyn_customerasset_msdyn_customerasset_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_customerasset_msdyn_customerassetset: WebMappingCUDA<ts_msdyn_customerasset_msdyn_customerasset_Create,ts_msdyn_customerasset_msdyn_customerasset_Update,ts_msdyn_customerasset_msdyn_customerasset_Select>;
}
