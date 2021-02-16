interface qm_sytemplate_sygroup_Base extends WebEntity {
  qm_sygroupid?: string | null;
  qm_sytemplate_sygroupid?: string | null;
  qm_sytemplateid?: string | null;
  versionnumber?: number | null;
}
interface qm_sytemplate_sygroup_Relationships {
  qm_sytemplate_sygroup?: qm_sygroup_Result[] | null;
}
interface qm_sytemplate_sygroup extends qm_sytemplate_sygroup_Base, qm_sytemplate_sygroup_Relationships {
}
interface qm_sytemplate_sygroup_Create extends qm_sytemplate_sygroup {
}
interface qm_sytemplate_sygroup_Update extends qm_sytemplate_sygroup {
}
interface qm_sytemplate_sygroup_Select {
  qm_sygroupid: WebAttribute<qm_sytemplate_sygroup_Select, { qm_sygroupid: string | null }, {  }>;
  qm_sytemplate_sygroupid: WebAttribute<qm_sytemplate_sygroup_Select, { qm_sytemplate_sygroupid: string | null }, {  }>;
  qm_sytemplateid: WebAttribute<qm_sytemplate_sygroup_Select, { qm_sytemplateid: string | null }, {  }>;
  versionnumber: WebAttribute<qm_sytemplate_sygroup_Select, { versionnumber: number | null }, {  }>;
}
interface qm_sytemplate_sygroup_Filter {
  qm_sygroupid: XQW.Guid;
  qm_sytemplate_sygroupid: XQW.Guid;
  qm_sytemplateid: XQW.Guid;
  versionnumber: number;
}
interface qm_sytemplate_sygroup_Expand {
  qm_sytemplate_sygroup: WebExpand<qm_sytemplate_sygroup_Expand, qm_sygroup_Select, qm_sygroup_Filter, { qm_sytemplate_sygroup: qm_sygroup_Result[] }>;
}
interface qm_sytemplate_sygroup_FormattedResult {
}
interface qm_sytemplate_sygroup_Result extends qm_sytemplate_sygroup_Base, qm_sytemplate_sygroup_Relationships {
  "@odata.etag": string;
}
interface qm_sytemplate_sygroup_RelatedOne {
}
interface qm_sytemplate_sygroup_RelatedMany {
  qm_sytemplate_sygroup: WebMappingRetrieve<qm_sygroup_Select,qm_sygroup_Expand,qm_sygroup_Filter,qm_sygroup_Fixed,qm_sygroup_Result,qm_sygroup_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_sytemplate_sygroupset: WebMappingRetrieve<qm_sytemplate_sygroup_Select,qm_sytemplate_sygroup_Expand,qm_sytemplate_sygroup_Filter,qm_sytemplate_sygroup_Fixed,qm_sytemplate_sygroup_Result,qm_sytemplate_sygroup_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_sytemplate_sygroupset: WebMappingRelated<qm_sytemplate_sygroup_RelatedOne,qm_sytemplate_sygroup_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_sytemplate_sygroupset: WebMappingCUDA<qm_sytemplate_sygroup_Create,qm_sytemplate_sygroup_Update,qm_sytemplate_sygroup_Select>;
}
