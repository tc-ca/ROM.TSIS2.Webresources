interface TeamMembership_Base extends WebEntity {
  systemuserid?: string | null;
  teamid?: string | null;
  teammembershipid?: string | null;
  versionnumber?: number | null;
}
interface TeamMembership_Relationships {
  teammembership_association?: SystemUser_Result[] | null;
}
interface TeamMembership extends TeamMembership_Base, TeamMembership_Relationships {
}
interface TeamMembership_Create extends TeamMembership {
}
interface TeamMembership_Update extends TeamMembership {
}
interface TeamMembership_Select {
  systemuserid: WebAttribute<TeamMembership_Select, { systemuserid: string | null }, {  }>;
  teamid: WebAttribute<TeamMembership_Select, { teamid: string | null }, {  }>;
  teammembershipid: WebAttribute<TeamMembership_Select, { teammembershipid: string | null }, {  }>;
  versionnumber: WebAttribute<TeamMembership_Select, { versionnumber: number | null }, {  }>;
}
interface TeamMembership_Filter {
  systemuserid: XQW.Guid;
  teamid: XQW.Guid;
  teammembershipid: XQW.Guid;
  versionnumber: number;
}
interface TeamMembership_Expand {
  teammembership_association: WebExpand<TeamMembership_Expand, SystemUser_Select, SystemUser_Filter, { teammembership_association: SystemUser_Result[] }>;
}
interface TeamMembership_FormattedResult {
}
interface TeamMembership_Result extends TeamMembership_Base, TeamMembership_Relationships {
  "@odata.etag": string;
}
interface TeamMembership_RelatedOne {
}
interface TeamMembership_RelatedMany {
  teammembership_association: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface WebEntitiesRetrieve {
  teammemberships: WebMappingRetrieve<TeamMembership_Select,TeamMembership_Expand,TeamMembership_Filter,TeamMembership_Fixed,TeamMembership_Result,TeamMembership_FormattedResult>;
}
interface WebEntitiesRelated {
  teammemberships: WebMappingRelated<TeamMembership_RelatedOne,TeamMembership_RelatedMany>;
}
interface WebEntitiesCUDA {
  teammemberships: WebMappingCUDA<TeamMembership_Create,TeamMembership_Update,TeamMembership_Select>;
}
