interface ts_WorkOrderServiceTaskWorkspace_System_Base extends WebEntity {
  systemuserid?: string | null;
  ts_workorderservicetaskworkspace_systemid?: string | null;
  ts_workorderservicetaskworkspaceid?: string | null;
  versionnumber?: number | null;
}
interface ts_WorkOrderServiceTaskWorkspace_System_Relationships {
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser?: ts_WorkOrderServiceTaskWorkspace_Result[] | null;
}
interface ts_WorkOrderServiceTaskWorkspace_System extends ts_WorkOrderServiceTaskWorkspace_System_Base, ts_WorkOrderServiceTaskWorkspace_System_Relationships {
}
interface ts_WorkOrderServiceTaskWorkspace_System_Create extends ts_WorkOrderServiceTaskWorkspace_System {
}
interface ts_WorkOrderServiceTaskWorkspace_System_Update extends ts_WorkOrderServiceTaskWorkspace_System {
}
interface ts_WorkOrderServiceTaskWorkspace_System_Select {
  systemuserid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_System_Select, { systemuserid: string | null }, {  }>;
  ts_workorderservicetaskworkspace_systemid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_System_Select, { ts_workorderservicetaskworkspace_systemid: string | null }, {  }>;
  ts_workorderservicetaskworkspaceid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_System_Select, { ts_workorderservicetaskworkspaceid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_System_Select, { versionnumber: number | null }, {  }>;
}
interface ts_WorkOrderServiceTaskWorkspace_System_Filter {
  systemuserid: XQW.Guid;
  ts_workorderservicetaskworkspace_systemid: XQW.Guid;
  ts_workorderservicetaskworkspaceid: XQW.Guid;
  versionnumber: number;
}
interface ts_WorkOrderServiceTaskWorkspace_System_Expand {
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: WebExpand<ts_WorkOrderServiceTaskWorkspace_System_Expand, ts_WorkOrderServiceTaskWorkspace_Select, ts_WorkOrderServiceTaskWorkspace_Filter, { ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: ts_WorkOrderServiceTaskWorkspace_Result[] }>;
}
interface ts_WorkOrderServiceTaskWorkspace_System_FormattedResult {
}
interface ts_WorkOrderServiceTaskWorkspace_System_Result extends ts_WorkOrderServiceTaskWorkspace_System_Base, ts_WorkOrderServiceTaskWorkspace_System_Relationships {
  "@odata.etag": string;
}
interface ts_WorkOrderServiceTaskWorkspace_System_RelatedOne {
}
interface ts_WorkOrderServiceTaskWorkspace_System_RelatedMany {
  ts_WorkOrderServiceTaskWorkspace_SystemUser_SystemUser: WebMappingRetrieve<ts_WorkOrderServiceTaskWorkspace_Select,ts_WorkOrderServiceTaskWorkspace_Expand,ts_WorkOrderServiceTaskWorkspace_Filter,ts_WorkOrderServiceTaskWorkspace_Fixed,ts_WorkOrderServiceTaskWorkspace_Result,ts_WorkOrderServiceTaskWorkspace_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_workorderservicetaskworkspace_systemset: WebMappingRetrieve<ts_WorkOrderServiceTaskWorkspace_System_Select,ts_WorkOrderServiceTaskWorkspace_System_Expand,ts_WorkOrderServiceTaskWorkspace_System_Filter,ts_WorkOrderServiceTaskWorkspace_System_Fixed,ts_WorkOrderServiceTaskWorkspace_System_Result,ts_WorkOrderServiceTaskWorkspace_System_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_workorderservicetaskworkspace_systemset: WebMappingRelated<ts_WorkOrderServiceTaskWorkspace_System_RelatedOne,ts_WorkOrderServiceTaskWorkspace_System_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_workorderservicetaskworkspace_systemset: WebMappingCUDA<ts_WorkOrderServiceTaskWorkspace_System_Create,ts_WorkOrderServiceTaskWorkspace_System_Update,ts_WorkOrderServiceTaskWorkspace_System_Select>;
}
