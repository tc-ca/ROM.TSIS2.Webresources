interface ts_msdyn_workorderservicetask_systemuser_Base extends WebEntity {
  msdyn_workorderservicetaskid?: string | null;
  systemuserid?: string | null;
  ts_msdyn_workorderservicetask_systemuserid?: string | null;
  versionnumber?: number | null;
}
interface ts_msdyn_workorderservicetask_systemuser_Relationships {
  ts_msdyn_workorderservicetask_systemuser?: SystemUser_Result[] | null;
}
interface ts_msdyn_workorderservicetask_systemuser extends ts_msdyn_workorderservicetask_systemuser_Base, ts_msdyn_workorderservicetask_systemuser_Relationships {
}
interface ts_msdyn_workorderservicetask_systemuser_Create extends ts_msdyn_workorderservicetask_systemuser {
}
interface ts_msdyn_workorderservicetask_systemuser_Update extends ts_msdyn_workorderservicetask_systemuser {
}
interface ts_msdyn_workorderservicetask_systemuser_Select {
  msdyn_workorderservicetaskid: WebAttribute<ts_msdyn_workorderservicetask_systemuser_Select, { msdyn_workorderservicetaskid: string | null }, {  }>;
  systemuserid: WebAttribute<ts_msdyn_workorderservicetask_systemuser_Select, { systemuserid: string | null }, {  }>;
  ts_msdyn_workorderservicetask_systemuserid: WebAttribute<ts_msdyn_workorderservicetask_systemuser_Select, { ts_msdyn_workorderservicetask_systemuserid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_msdyn_workorderservicetask_systemuser_Select, { versionnumber: number | null }, {  }>;
}
interface ts_msdyn_workorderservicetask_systemuser_Filter {
  msdyn_workorderservicetaskid: XQW.Guid;
  systemuserid: XQW.Guid;
  ts_msdyn_workorderservicetask_systemuserid: XQW.Guid;
  versionnumber: number;
}
interface ts_msdyn_workorderservicetask_systemuser_Expand {
  ts_msdyn_workorderservicetask_systemuser: WebExpand<ts_msdyn_workorderservicetask_systemuser_Expand, SystemUser_Select, SystemUser_Filter, { ts_msdyn_workorderservicetask_systemuser: SystemUser_Result[] }>;
}
interface ts_msdyn_workorderservicetask_systemuser_FormattedResult {
}
interface ts_msdyn_workorderservicetask_systemuser_Result extends ts_msdyn_workorderservicetask_systemuser_Base, ts_msdyn_workorderservicetask_systemuser_Relationships {
  "@odata.etag": string;
}
interface ts_msdyn_workorderservicetask_systemuser_RelatedOne {
}
interface ts_msdyn_workorderservicetask_systemuser_RelatedMany {
  ts_msdyn_workorderservicetask_systemuser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_msdyn_workorderservicetask_systemuserset: WebMappingRetrieve<ts_msdyn_workorderservicetask_systemuser_Select,ts_msdyn_workorderservicetask_systemuser_Expand,ts_msdyn_workorderservicetask_systemuser_Filter,ts_msdyn_workorderservicetask_systemuser_Fixed,ts_msdyn_workorderservicetask_systemuser_Result,ts_msdyn_workorderservicetask_systemuser_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_msdyn_workorderservicetask_systemuserset: WebMappingRelated<ts_msdyn_workorderservicetask_systemuser_RelatedOne,ts_msdyn_workorderservicetask_systemuser_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_msdyn_workorderservicetask_systemuserset: WebMappingCUDA<ts_msdyn_workorderservicetask_systemuser_Create,ts_msdyn_workorderservicetask_systemuser_Update,ts_msdyn_workorderservicetask_systemuser_Select>;
}
