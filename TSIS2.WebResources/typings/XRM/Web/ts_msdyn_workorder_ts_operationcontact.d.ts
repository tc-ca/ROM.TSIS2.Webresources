interface ts_msdyn_workorder_ts_operationcontact_Base extends WebEntity {
  msdyn_workorderid?: string | null;
  ts_msdyn_workorder_ts_operationcontactid?: string | null;
  ts_operationcontactid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_workorder_ts_operationcontact_Relationships {
  ts_msdyn_workorder_ts_operationcontact?: msdyn_workorder_Result[] | null;
}
interface ts_msdyn_workorder_ts_operationcontact extends ts_msdyn_workorder_ts_operationcontact_Base, ts_msdyn_workorder_ts_operationcontact_Relationships {
}
interface ts_msdyn_workorder_ts_operationcontact_Create extends ts_msdyn_workorder_ts_operationcontact {
}
interface ts_msdyn_workorder_ts_operationcontact_Update extends ts_msdyn_workorder_ts_operationcontact {
}
interface ts_msdyn_workorder_ts_operationcontact_Select {
  msdyn_workorderid: WebAttribute<ts_msdyn_workorder_ts_operationcontact_Select, { msdyn_workorderid: string | null }, {  }>;
  ts_msdyn_workorder_ts_operationcontactid: WebAttribute<ts_msdyn_workorder_ts_operationcontact_Select, { ts_msdyn_workorder_ts_operationcontactid: string | null }, {  }>;
  ts_operationcontactid: WebAttribute<ts_msdyn_workorder_ts_operationcontact_Select, { ts_operationcontactid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_workorder_ts_operationcontact_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_workorder_ts_operationcontact_Filter {
  msdyn_workorderid: XQW.Guid;
  ts_msdyn_workorder_ts_operationcontactid: XQW.Guid;
  ts_operationcontactid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_workorder_ts_operationcontact_Expand {
  ts_msdyn_workorder_ts_operationcontact: WebExpand<ts_msdyn_workorder_ts_operationcontact_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_ts_operationcontact: msdyn_workorder_Result[] }>;
}
interface ts_msdyn_workorder_ts_operationcontact_FormattedResult {
}
interface ts_msdyn_workorder_ts_operationcontact_Result extends ts_msdyn_workorder_ts_operationcontact_Base, ts_msdyn_workorder_ts_operationcontact_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_workorder_ts_operationcontact_RelatedOne {
}
interface ts_msdyn_workorder_ts_operationcontact_RelatedMany {
  ts_msdyn_workorder_ts_operationcontact: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_workorder_ts_operationcontactset: WebMappingRetrieve<ts_msdyn_workorder_ts_operationcontact_Select,ts_msdyn_workorder_ts_operationcontact_Expand,ts_msdyn_workorder_ts_operationcontact_Filter,ts_msdyn_workorder_ts_operationcontact_Fixed,ts_msdyn_workorder_ts_operationcontact_Result,ts_msdyn_workorder_ts_operationcontact_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_workorder_ts_operationcontactset: WebMappingRelated<ts_msdyn_workorder_ts_operationcontact_RelatedOne,ts_msdyn_workorder_ts_operationcontact_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_workorder_ts_operationcontactset: WebMappingCUDA<ts_msdyn_workorder_ts_operationcontact_Create,ts_msdyn_workorder_ts_operationcontact_Update,ts_msdyn_workorder_ts_operationcontact_Select>;
}
