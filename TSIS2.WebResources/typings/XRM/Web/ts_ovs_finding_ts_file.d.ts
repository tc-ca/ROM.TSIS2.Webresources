interface ts_ovs_Finding_ts_File_Base extends WebEntity {
  ovs_findingid?: string | null;
  ts_fileid?: string | null;
  ts_ovs_finding_ts_fileid?: string | null;
  versionnumber?: number | null;
}
interface ts_ovs_Finding_ts_File_Relationships {
  ts_ovs_Finding_ts_File_ts_File?: ovs_Finding_Result[] | null;
}
interface ts_ovs_Finding_ts_File extends ts_ovs_Finding_ts_File_Base, ts_ovs_Finding_ts_File_Relationships {
}
interface ts_ovs_Finding_ts_File_Create extends ts_ovs_Finding_ts_File {
}
interface ts_ovs_Finding_ts_File_Update extends ts_ovs_Finding_ts_File {
}
interface ts_ovs_Finding_ts_File_Select {
  ovs_findingid: WebAttribute<ts_ovs_Finding_ts_File_Select, { ovs_findingid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_ovs_Finding_ts_File_Select, { ts_fileid: string | null }, {  }>;
  ts_ovs_finding_ts_fileid: WebAttribute<ts_ovs_Finding_ts_File_Select, { ts_ovs_finding_ts_fileid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_ovs_Finding_ts_File_Select, { versionnumber: number | null }, {  }>;
}
interface ts_ovs_Finding_ts_File_Filter {
  ovs_findingid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_ovs_finding_ts_fileid: XQW.Guid;
  versionnumber: number;
}
interface ts_ovs_Finding_ts_File_Expand {
  ts_ovs_Finding_ts_File_ts_File: WebExpand<ts_ovs_Finding_ts_File_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_ts_File_ts_File: ovs_Finding_Result[] }>;
}
interface ts_ovs_Finding_ts_File_FormattedResult {
}
interface ts_ovs_Finding_ts_File_Result extends ts_ovs_Finding_ts_File_Base, ts_ovs_Finding_ts_File_Relationships {
  "@odata.etag": string;
}
interface ts_ovs_Finding_ts_File_RelatedOne {
}
interface ts_ovs_Finding_ts_File_RelatedMany {
  ts_ovs_Finding_ts_File_ts_File: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_ovs_finding_ts_fileset: WebMappingRetrieve<ts_ovs_Finding_ts_File_Select,ts_ovs_Finding_ts_File_Expand,ts_ovs_Finding_ts_File_Filter,ts_ovs_Finding_ts_File_Fixed,ts_ovs_Finding_ts_File_Result,ts_ovs_Finding_ts_File_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_ovs_finding_ts_fileset: WebMappingRelated<ts_ovs_Finding_ts_File_RelatedOne,ts_ovs_Finding_ts_File_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_ovs_finding_ts_fileset: WebMappingCUDA<ts_ovs_Finding_ts_File_Create,ts_ovs_Finding_ts_File_Update,ts_ovs_Finding_ts_File_Select>;
}
