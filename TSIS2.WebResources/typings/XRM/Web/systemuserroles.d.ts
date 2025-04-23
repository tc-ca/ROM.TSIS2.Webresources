interface SystemUserRoles_Base extends WebEntity {
  roleid?: string | null;
  systemuserid?: string | null;
  systemuserroleid?: string | null;
  versionnumber?: number | null;
}
interface SystemUserRoles_Relationships {
}
interface SystemUserRoles extends SystemUserRoles_Base, SystemUserRoles_Relationships {
}
interface SystemUserRoles_Create extends SystemUserRoles {
}
interface SystemUserRoles_Update extends SystemUserRoles {
}
interface SystemUserRoles_Select {
  roleid: WebAttribute<SystemUserRoles_Select, { roleid: string | null }, {  }>;
  systemuserid: WebAttribute<SystemUserRoles_Select, { systemuserid: string | null }, {  }>;
  systemuserroleid: WebAttribute<SystemUserRoles_Select, { systemuserroleid: string | null }, {  }>;
  versionnumber: WebAttribute<SystemUserRoles_Select, { versionnumber: number | null }, {  }>;
}
interface SystemUserRoles_Filter {
  roleid: XQW.Guid;
  systemuserid: XQW.Guid;
  systemuserroleid: XQW.Guid;
  versionnumber: number;
}
interface SystemUserRoles_Expand {
}
interface SystemUserRoles_FormattedResult {
}
interface SystemUserRoles_Result extends SystemUserRoles_Base, SystemUserRoles_Relationships {
  "@odata.etag": string;
}
interface SystemUserRoles_RelatedOne {
}
interface SystemUserRoles_RelatedMany {
}
interface WebEntitiesRetrieve {
  systemuserrolescollection: WebMappingRetrieve<SystemUserRoles_Select,SystemUserRoles_Expand,SystemUserRoles_Filter,SystemUserRoles_Fixed,SystemUserRoles_Result,SystemUserRoles_FormattedResult>;
}
interface WebEntitiesRelated {
  systemuserrolescollection: WebMappingRelated<SystemUserRoles_RelatedOne,SystemUserRoles_RelatedMany>;
}
interface WebEntitiesCUDA {
  systemuserrolescollection: WebMappingCUDA<SystemUserRoles_Create,SystemUserRoles_Update,SystemUserRoles_Select>;
}
