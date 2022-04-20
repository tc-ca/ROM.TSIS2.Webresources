interface ts_Incident_ts_operationcontact_Base extends WebEntity {
  incidentid?: string | null;
  ts_incident_ts_operationcontactid?: string | null;
  ts_operationcontactid?: string | null;
  versionnumber?: number | null;
}
interface ts_Incident_ts_operationcontact_Relationships {
  ts_Incident_ts_operationcontact_ts_operation?: Incident_Result[] | null;
}
interface ts_Incident_ts_operationcontact extends ts_Incident_ts_operationcontact_Base, ts_Incident_ts_operationcontact_Relationships {
}
interface ts_Incident_ts_operationcontact_Create extends ts_Incident_ts_operationcontact {
}
interface ts_Incident_ts_operationcontact_Update extends ts_Incident_ts_operationcontact {
}
interface ts_Incident_ts_operationcontact_Select {
  incidentid: WebAttribute<ts_Incident_ts_operationcontact_Select, { incidentid: string | null }, {  }>;
  ts_incident_ts_operationcontactid: WebAttribute<ts_Incident_ts_operationcontact_Select, { ts_incident_ts_operationcontactid: string | null }, {  }>;
  ts_operationcontactid: WebAttribute<ts_Incident_ts_operationcontact_Select, { ts_operationcontactid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Incident_ts_operationcontact_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Incident_ts_operationcontact_Filter {
  incidentid: XQW.Guid;
  ts_incident_ts_operationcontactid: XQW.Guid;
  ts_operationcontactid: XQW.Guid;
  versionnumber: number;
}
interface ts_Incident_ts_operationcontact_Expand {
  ts_Incident_ts_operationcontact_ts_operation: WebExpand<ts_Incident_ts_operationcontact_Expand, Incident_Select, Incident_Filter, { ts_Incident_ts_operationcontact_ts_operation: Incident_Result[] }>;
}
interface ts_Incident_ts_operationcontact_FormattedResult {
}
interface ts_Incident_ts_operationcontact_Result extends ts_Incident_ts_operationcontact_Base, ts_Incident_ts_operationcontact_Relationships {
  "@odata.etag": string;
}
interface ts_Incident_ts_operationcontact_RelatedOne {
}
interface ts_Incident_ts_operationcontact_RelatedMany {
  ts_Incident_ts_operationcontact_ts_operation: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_incident_ts_operationcontactset: WebMappingRetrieve<ts_Incident_ts_operationcontact_Select,ts_Incident_ts_operationcontact_Expand,ts_Incident_ts_operationcontact_Filter,ts_Incident_ts_operationcontact_Fixed,ts_Incident_ts_operationcontact_Result,ts_Incident_ts_operationcontact_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_incident_ts_operationcontactset: WebMappingRelated<ts_Incident_ts_operationcontact_RelatedOne,ts_Incident_ts_operationcontact_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_incident_ts_operationcontactset: WebMappingCUDA<ts_Incident_ts_operationcontact_Create,ts_Incident_ts_operationcontact_Update,ts_Incident_ts_operationcontact_Select>;
}
