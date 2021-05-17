interface msdyn_incident_msdyn_customerasset_Base extends WebEntity {
  incidentid?: string | null;
  msdyn_customerassetid?: string | null;
  msdyn_incident_msdyn_customerassetid?: string | null;
  versionnumber?: number | null;
}
interface msdyn_incident_msdyn_customerasset_Relationships {
  msdyn_incident_msdyn_customerasset?: msdyn_customerasset_Result[] | null;
}
interface msdyn_incident_msdyn_customerasset extends msdyn_incident_msdyn_customerasset_Base, msdyn_incident_msdyn_customerasset_Relationships {
}
interface msdyn_incident_msdyn_customerasset_Create extends msdyn_incident_msdyn_customerasset {
}
interface msdyn_incident_msdyn_customerasset_Update extends msdyn_incident_msdyn_customerasset {
}
interface msdyn_incident_msdyn_customerasset_Select {
  incidentid: WebAttribute<msdyn_incident_msdyn_customerasset_Select, { incidentid: string | null }, {  }>;
  msdyn_customerassetid: WebAttribute<msdyn_incident_msdyn_customerasset_Select, { msdyn_customerassetid: string | null }, {  }>;
  msdyn_incident_msdyn_customerassetid: WebAttribute<msdyn_incident_msdyn_customerasset_Select, { msdyn_incident_msdyn_customerassetid: string | null }, {  }>;
  versionnumber: WebAttribute<msdyn_incident_msdyn_customerasset_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_incident_msdyn_customerasset_Filter {
  incidentid: XQW.Guid;
  msdyn_customerassetid: XQW.Guid;
  msdyn_incident_msdyn_customerassetid: XQW.Guid;
  versionnumber: number;
}
interface msdyn_incident_msdyn_customerasset_Expand {
  msdyn_incident_msdyn_customerasset: WebExpand<msdyn_incident_msdyn_customerasset_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_incident_msdyn_customerasset: msdyn_customerasset_Result[] }>;
}
interface msdyn_incident_msdyn_customerasset_FormattedResult {
}
interface msdyn_incident_msdyn_customerasset_Result extends msdyn_incident_msdyn_customerasset_Base, msdyn_incident_msdyn_customerasset_Relationships {
  "@odata.etag": string;
}
interface msdyn_incident_msdyn_customerasset_RelatedOne {
}
interface msdyn_incident_msdyn_customerasset_RelatedMany {
  msdyn_incident_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_incident_msdyn_customerassetset: WebMappingRetrieve<msdyn_incident_msdyn_customerasset_Select,msdyn_incident_msdyn_customerasset_Expand,msdyn_incident_msdyn_customerasset_Filter,msdyn_incident_msdyn_customerasset_Fixed,msdyn_incident_msdyn_customerasset_Result,msdyn_incident_msdyn_customerasset_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_incident_msdyn_customerassetset: WebMappingRelated<msdyn_incident_msdyn_customerasset_RelatedOne,msdyn_incident_msdyn_customerasset_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_incident_msdyn_customerassetset: WebMappingCUDA<msdyn_incident_msdyn_customerasset_Create,msdyn_incident_msdyn_customerasset_Update,msdyn_incident_msdyn_customerasset_Select>;
}
