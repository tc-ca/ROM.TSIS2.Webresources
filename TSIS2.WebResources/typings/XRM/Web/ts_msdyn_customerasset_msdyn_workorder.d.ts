interface ts_msdyn_customerasset_msdyn_workorder_Base extends WebEntity {
  msdyn_customerassetid?: string | null;
  msdyn_workorderid?: string | null;
  ts_msdyn_customerasset_msdyn_workorderid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_customerasset_msdyn_workorder_Relationships {
  ts_msdyn_customerasset_msdyn_workorder_msdyn?: msdyn_customerasset_Result[] | null;
}
interface ts_msdyn_customerasset_msdyn_workorder extends ts_msdyn_customerasset_msdyn_workorder_Base, ts_msdyn_customerasset_msdyn_workorder_Relationships {
}
interface ts_msdyn_customerasset_msdyn_workorder_Create extends ts_msdyn_customerasset_msdyn_workorder {
}
interface ts_msdyn_customerasset_msdyn_workorder_Update extends ts_msdyn_customerasset_msdyn_workorder {
}
interface ts_msdyn_customerasset_msdyn_workorder_Select {
  msdyn_customerassetid: WebAttribute<ts_msdyn_customerasset_msdyn_workorder_Select, { msdyn_customerassetid: string | null }, {  }>;
  msdyn_workorderid: WebAttribute<ts_msdyn_customerasset_msdyn_workorder_Select, { msdyn_workorderid: string | null }, {  }>;
  ts_msdyn_customerasset_msdyn_workorderid: WebAttribute<ts_msdyn_customerasset_msdyn_workorder_Select, { ts_msdyn_customerasset_msdyn_workorderid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_customerasset_msdyn_workorder_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_customerasset_msdyn_workorder_Filter {
  msdyn_customerassetid: XQW.Guid;
  msdyn_workorderid: XQW.Guid;
  ts_msdyn_customerasset_msdyn_workorderid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_customerasset_msdyn_workorder_Expand {
  ts_msdyn_customerasset_msdyn_workorder_msdyn: WebExpand<ts_msdyn_customerasset_msdyn_workorder_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { ts_msdyn_customerasset_msdyn_workorder_msdyn: msdyn_customerasset_Result[] }>;
}
interface ts_msdyn_customerasset_msdyn_workorder_FormattedResult {
}
interface ts_msdyn_customerasset_msdyn_workorder_Result extends ts_msdyn_customerasset_msdyn_workorder_Base, ts_msdyn_customerasset_msdyn_workorder_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_customerasset_msdyn_workorder_RelatedOne {
}
interface ts_msdyn_customerasset_msdyn_workorder_RelatedMany {
  ts_msdyn_customerasset_msdyn_workorder_msdyn: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_customerasset_msdyn_workorderset: WebMappingRetrieve<ts_msdyn_customerasset_msdyn_workorder_Select,ts_msdyn_customerasset_msdyn_workorder_Expand,ts_msdyn_customerasset_msdyn_workorder_Filter,ts_msdyn_customerasset_msdyn_workorder_Fixed,ts_msdyn_customerasset_msdyn_workorder_Result,ts_msdyn_customerasset_msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_customerasset_msdyn_workorderset: WebMappingRelated<ts_msdyn_customerasset_msdyn_workorder_RelatedOne,ts_msdyn_customerasset_msdyn_workorder_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_customerasset_msdyn_workorderset: WebMappingCUDA<ts_msdyn_customerasset_msdyn_workorder_Create,ts_msdyn_customerasset_msdyn_workorder_Update,ts_msdyn_customerasset_msdyn_workorder_Select>;
}
