interface qm_syresponse_rclegislation_Base extends WebEntity {
  qm_rclegislationid?: string | null;
  qm_syresponse_rclegislationid?: string | null;
  qm_syresponseid?: string | null;
  versionnumber?: number | null;
}
interface qm_syresponse_rclegislation_Relationships {
  qm_syresponse_rclegislation?: qm_rclegislation_Result[] | null;
}
interface qm_syresponse_rclegislation extends qm_syresponse_rclegislation_Base, qm_syresponse_rclegislation_Relationships {
}
interface qm_syresponse_rclegislation_Create extends qm_syresponse_rclegislation {
}
interface qm_syresponse_rclegislation_Update extends qm_syresponse_rclegislation {
}
interface qm_syresponse_rclegislation_Select {
  qm_rclegislationid: WebAttribute<qm_syresponse_rclegislation_Select, { qm_rclegislationid: string | null }, {  }>;
  qm_syresponse_rclegislationid: WebAttribute<qm_syresponse_rclegislation_Select, { qm_syresponse_rclegislationid: string | null }, {  }>;
  qm_syresponseid: WebAttribute<qm_syresponse_rclegislation_Select, { qm_syresponseid: string | null }, {  }>;
  versionnumber: WebAttribute<qm_syresponse_rclegislation_Select, { versionnumber: number | null }, {  }>;
}
interface qm_syresponse_rclegislation_Filter {
  qm_rclegislationid: XQW.Guid;
  qm_syresponse_rclegislationid: XQW.Guid;
  qm_syresponseid: XQW.Guid;
  versionnumber: number;
}
interface qm_syresponse_rclegislation_Expand {
  qm_syresponse_rclegislation: WebExpand<qm_syresponse_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_syresponse_rclegislation: qm_rclegislation_Result[] }>;
}
interface qm_syresponse_rclegislation_FormattedResult {
}
interface qm_syresponse_rclegislation_Result extends qm_syresponse_rclegislation_Base, qm_syresponse_rclegislation_Relationships {
  "@odata.etag": string;
}
interface qm_syresponse_rclegislation_RelatedOne {
}
interface qm_syresponse_rclegislation_RelatedMany {
  qm_syresponse_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_syresponse_rclegislationset: WebMappingRetrieve<qm_syresponse_rclegislation_Select,qm_syresponse_rclegislation_Expand,qm_syresponse_rclegislation_Filter,qm_syresponse_rclegislation_Fixed,qm_syresponse_rclegislation_Result,qm_syresponse_rclegislation_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_syresponse_rclegislationset: WebMappingRelated<qm_syresponse_rclegislation_RelatedOne,qm_syresponse_rclegislation_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_syresponse_rclegislationset: WebMappingCUDA<qm_syresponse_rclegislation_Create,qm_syresponse_rclegislation_Update,qm_syresponse_rclegislation_Select>;
}
