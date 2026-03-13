interface ts_ts_suggestedinspection_systemuser_Base extends WebEntity {
  systemuserid?: string | null;
  ts_suggestedinspectionid?: string | null;
  ts_ts_suggestedinspection_systemuserid?: string | null;
  versionnumber?: number | null;
}
interface ts_ts_suggestedinspection_systemuser_Relationships {
  ts_ts_suggestedinspection_systemuser?: SystemUser_Result[] | null;
}
interface ts_ts_suggestedinspection_systemuser extends ts_ts_suggestedinspection_systemuser_Base, ts_ts_suggestedinspection_systemuser_Relationships {
}
interface ts_ts_suggestedinspection_systemuser_Create extends ts_ts_suggestedinspection_systemuser {
}
interface ts_ts_suggestedinspection_systemuser_Update extends ts_ts_suggestedinspection_systemuser {
}
interface ts_ts_suggestedinspection_systemuser_Select {
  systemuserid: WebAttribute<ts_ts_suggestedinspection_systemuser_Select, { systemuserid: string | null }, {  }>;
  ts_suggestedinspectionid: WebAttribute<ts_ts_suggestedinspection_systemuser_Select, { ts_suggestedinspectionid: string | null }, {  }>;
  ts_ts_suggestedinspection_systemuserid: WebAttribute<ts_ts_suggestedinspection_systemuser_Select, { ts_ts_suggestedinspection_systemuserid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ts_suggestedinspection_systemuser_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ts_suggestedinspection_systemuser_Filter {
  systemuserid: XQW.Guid;
  ts_suggestedinspectionid: XQW.Guid;
  ts_ts_suggestedinspection_systemuserid: XQW.Guid;
  versionnumber: number;
}
interface ts_ts_suggestedinspection_systemuser_Expand {
  ts_ts_suggestedinspection_systemuser: WebExpand<ts_ts_suggestedinspection_systemuser_Expand, SystemUser_Select, SystemUser_Filter, { ts_ts_suggestedinspection_systemuser: SystemUser_Result[] }>;
}
interface ts_ts_suggestedinspection_systemuser_FormattedResult {
}
interface ts_ts_suggestedinspection_systemuser_Result extends ts_ts_suggestedinspection_systemuser_Base, ts_ts_suggestedinspection_systemuser_Relationships {
  "@odata.etag": string;
}
interface ts_ts_suggestedinspection_systemuser_RelatedOne {
}
interface ts_ts_suggestedinspection_systemuser_RelatedMany {
  ts_ts_suggestedinspection_systemuser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ts_suggestedinspection_systemuserset: WebMappingRetrieve<ts_ts_suggestedinspection_systemuser_Select,ts_ts_suggestedinspection_systemuser_Expand,ts_ts_suggestedinspection_systemuser_Filter,ts_ts_suggestedinspection_systemuser_Fixed,ts_ts_suggestedinspection_systemuser_Result,ts_ts_suggestedinspection_systemuser_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ts_suggestedinspection_systemuserset: WebMappingRelated<ts_ts_suggestedinspection_systemuser_RelatedOne,ts_ts_suggestedinspection_systemuser_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ts_suggestedinspection_systemuserset: WebMappingCUDA<ts_ts_suggestedinspection_systemuser_Create,ts_ts_suggestedinspection_systemuser_Update,ts_ts_suggestedinspection_systemuser_Select>;
}
