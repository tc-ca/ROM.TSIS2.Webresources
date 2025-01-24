interface ts_ovs_operationtypes_msdyn_incidenttypes_Base extends WebEntity {
  msdyn_incidenttypeid?: string | null;
  ovs_operationtypeid?: string | null;
  ts_ovs_operationtypes_msdyn_incidenttypesid?: string | null;
  versionnumber?: number | null;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Relationships {
  ts_ovs_operationtypes_msdyn_incidenttypes?: ovs_operationtype_Result[] | null;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes extends ts_ovs_operationtypes_msdyn_incidenttypes_Base, ts_ovs_operationtypes_msdyn_incidenttypes_Relationships {
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Create extends ts_ovs_operationtypes_msdyn_incidenttypes {
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Update extends ts_ovs_operationtypes_msdyn_incidenttypes {
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Select {
  msdyn_incidenttypeid: WebAttribute<ts_ovs_operationtypes_msdyn_incidenttypes_Select, { msdyn_incidenttypeid: string | null }, {  }>;
  ovs_operationtypeid: WebAttribute<ts_ovs_operationtypes_msdyn_incidenttypes_Select, { ovs_operationtypeid: string | null }, {  }>;
  ts_ovs_operationtypes_msdyn_incidenttypesid: WebAttribute<ts_ovs_operationtypes_msdyn_incidenttypes_Select, { ts_ovs_operationtypes_msdyn_incidenttypesid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ovs_operationtypes_msdyn_incidenttypes_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Filter {
  msdyn_incidenttypeid: XQW.Guid;
  ovs_operationtypeid: XQW.Guid;
  ts_ovs_operationtypes_msdyn_incidenttypesid: XQW.Guid;
  versionnumber: number;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Expand {
  ts_ovs_operationtypes_msdyn_incidenttypes: WebExpand<ts_ovs_operationtypes_msdyn_incidenttypes_Expand, ovs_operationtype_Select, ovs_operationtype_Filter, { ts_ovs_operationtypes_msdyn_incidenttypes: ovs_operationtype_Result[] }>;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_FormattedResult {
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_Result extends ts_ovs_operationtypes_msdyn_incidenttypes_Base, ts_ovs_operationtypes_msdyn_incidenttypes_Relationships {
  "@odata.etag": string;
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_RelatedOne {
}
interface ts_ovs_operationtypes_msdyn_incidenttypes_RelatedMany {
  ts_ovs_operationtypes_msdyn_incidenttypes: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ovs_operationtypes_msdyn_incidenttypesset: WebMappingRetrieve<ts_ovs_operationtypes_msdyn_incidenttypes_Select,ts_ovs_operationtypes_msdyn_incidenttypes_Expand,ts_ovs_operationtypes_msdyn_incidenttypes_Filter,ts_ovs_operationtypes_msdyn_incidenttypes_Fixed,ts_ovs_operationtypes_msdyn_incidenttypes_Result,ts_ovs_operationtypes_msdyn_incidenttypes_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ovs_operationtypes_msdyn_incidenttypesset: WebMappingRelated<ts_ovs_operationtypes_msdyn_incidenttypes_RelatedOne,ts_ovs_operationtypes_msdyn_incidenttypes_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ovs_operationtypes_msdyn_incidenttypesset: WebMappingCUDA<ts_ovs_operationtypes_msdyn_incidenttypes_Create,ts_ovs_operationtypes_msdyn_incidenttypes_Update,ts_ovs_operationtypes_msdyn_incidenttypes_Select>;
}
