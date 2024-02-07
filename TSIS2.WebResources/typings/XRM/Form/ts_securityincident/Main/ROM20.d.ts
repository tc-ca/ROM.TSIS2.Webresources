declare namespace Form.ts_securityincident.Main {
  namespace ROM20 {
    namespace Tabs {
      interface _99b378964f52417982963cc0e6722411 extends Xrm.SectionCollectionBase {
        get(name: "IncidentDetails"): Xrm.PageSection;
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_column_2_section_1"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_section_4"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_section_5"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_section_7"): Xrm.PageSection;
        get(name: "{When_section"): Xrm.PageSection;
        get(name: "{b367a628-326f-4595-a30d-c42898223e7b}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: "tab_2_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_4 extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: "tab_4_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_recordlog extends Xrm.SectionCollectionBase {
        get(name: "tab_recordlog_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_site extends Xrm.SectionCollectionBase {
        get(name: "tab_9_section_1"): Xrm.PageSection;
        get(name: "tab_9_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_stakeholders extends Xrm.SectionCollectionBase {
        get(name: "tab_10_section_1"): Xrm.PageSection;
        get(name: "tab_10_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_time_tracking extends Xrm.SectionCollectionBase {
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_users extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: "tab_8_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_workspace extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_4"): Xrm.PageSection;
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: "tab_7_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "createdby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "modifiedon"): Xrm.DateAttribute;
      get(name: "new_location"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_securityincident_statecode>;
      get(name: "ts_additionaldetails"): Xrm.Attribute<string>;
      get(name: "ts_aircarrier"): Xrm.LookupAttribute<"account">;
      get(name: "ts_arrests"): Xrm.OptionSetAttribute<ts_arrestsknownorunknown>;
      get(name: "ts_arrestsdetails"): Xrm.Attribute<string>;
      get(name: "ts_bridgeclosure"): Xrm.OptionSetAttribute<ts_bridgeclosure>;
      get(name: "ts_canvasapp"): Xrm.Attribute<any>;
      get(name: "ts_closedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_closedon"): Xrm.DateAttribute;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_contact"): Xrm.Attribute<string>;
      get(name: "ts_damagestoibtproperty"): Xrm.OptionSetAttribute<ts_damagestoibtproperty>;
      get(name: "ts_delayduration"): Xrm.Attribute<any>;
      get(name: "ts_delaystooperation"): Xrm.OptionSetAttribute<ts_delaystooperation>;
      get(name: "ts_destination"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_diversionaerodrome"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_email"): Xrm.Attribute<string>;
      get(name: "ts_estimatedarrivaltime"): Xrm.DateAttribute;
      get(name: "ts_flightnumber"): Xrm.Attribute<string>;
      get(name: "ts_furtheractionrequired"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_incidentdatetime"): Xrm.DateAttribute;
      get(name: "ts_incidentdatetimeadjust"): Xrm.DateAttribute;
      get(name: "ts_incidentdetailsattachment"): Xrm.Attribute<any>;
      get(name: "ts_inflight"): Xrm.Attribute<any>;
      get(name: "ts_injuries"): Xrm.OptionSetAttribute<ts_injuries>;
      get(name: "ts_latitude"): Xrm.NumberAttribute;
      get(name: "ts_locationcontext"): Xrm.Attribute<string>;
      get(name: "ts_locationtype"): Xrm.OptionSetAttribute<ts_locationtype>;
      get(name: "ts_longitude"): Xrm.NumberAttribute;
      get(name: "ts_markerpost"): Xrm.Attribute<string>;
      get(name: "ts_milemarker"): Xrm.Attribute<string>;
      get(name: "ts_mode"): Xrm.OptionSetAttribute<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_notes"): Xrm.Attribute<string>;
      get(name: "ts_organization"): Xrm.Attribute<string>;
      get(name: "ts_origin"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_othercompany"): Xrm.Attribute<string>;
      get(name: "ts_overtime"): Xrm.NumberAttribute;
      get(name: "ts_owneroftherailwaylinetrack"): Xrm.Attribute<string>;
      get(name: "ts_phone"): Xrm.Attribute<string>;
      get(name: "ts_policeresponse"): Xrm.Attribute<any>;
      get(name: "ts_province"): Xrm.OptionSetAttribute<ts_province>;
      get(name: "ts_publicorprivatecrossing"): Xrm.OptionSetAttribute<ts_publicorprivatecrossing>;
      get(name: "ts_quarterofsitime"): Xrm.OptionSetAttribute<ts_quarter>;
      get(name: "ts_quarterofsitraveltime"): Xrm.OptionSetAttribute<ts_quarter>;
      get(name: "ts_recordstatus"): Xrm.OptionSetAttribute<ts_securityincidentstatus>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_reporteddatetime"): Xrm.DateAttribute;
      get(name: "ts_reporteddatetimeadjust"): Xrm.DateAttribute;
      get(name: "ts_reportingcompany"): Xrm.LookupAttribute<"account">;
      get(name: "ts_reportingcompany_name"): Xrm.Attribute<string>;
      get(name: "ts_ruralorurban"): Xrm.OptionSetAttribute<ts_ruralorurban>;
      get(name: "ts_securityincidenttime"): Xrm.NumberAttribute;
      get(name: "ts_securityincidenttype"): Xrm.LookupAttribute<"ts_securityincidenttype">;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_stakeholder_name"): Xrm.Attribute<string>;
      get(name: "ts_statusofrailwayowner"): Xrm.OptionSetAttribute<ts_statusofrailwayowner>;
      get(name: "ts_statusrationale"): Xrm.Attribute<string>;
      get(name: "ts_subdivision"): Xrm.Attribute<string>;
      get(name: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_subsitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_tamperingsubcategory"): Xrm.OptionSetAttribute<ts_tamperingsubcategory>;
      get(name: "ts_targetelement"): Xrm.LookupAttribute<"ts_targetelement">;
      get(name: "ts_tcomscategoryenglish"): Xrm.Attribute<string>;
      get(name: "ts_tcomscategoryfrench"): Xrm.Attribute<string>;
      get(name: "ts_tcomseventfollowupenglish"): Xrm.Attribute<string>;
      get(name: "ts_tcomseventfollowupfrench"): Xrm.Attribute<string>;
      get(name: "ts_tcomseventname"): Xrm.Attribute<string>;
      get(name: "ts_tcomsid"): Xrm.Attribute<string>;
      get(name: "ts_tcomsinteractionenglish"): Xrm.Attribute<string>;
      get(name: "ts_tcomsinteractionfrench"): Xrm.Attribute<string>;
      get(name: "ts_tcomsofficer"): Xrm.Attribute<string>;
      get(name: "ts_tcomsseverityenglish"): Xrm.Attribute<string>;
      get(name: "ts_tcomsseverityfrench"): Xrm.Attribute<string>;
      get(name: "ts_tcomssubcategoryenglish"): Xrm.Attribute<string>;
      get(name: "ts_tcomssubcategoryfrench"): Xrm.Attribute<string>;
      get(name: "ts_timetakenforstakeholdertoreport"): Xrm.NumberAttribute;
      get(name: "ts_timezone"): Xrm.OptionSetAttribute<ts_timezone>;
      get(name: "ts_traveltime"): Xrm.NumberAttribute;
      get(name: "ts_yardorstationname"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"contact">;
      get(name: "WebResource_SecurityIncidentDetailsDisplay"): Xrm.WebResourceControl;
      get(name: "createdby"): Xrm.LookupControl<"systemuser">;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "grid_doc"): Xrm.SubGridControl<"ts_file">;
      get(name: "grid_workorder"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_recordstatus"): Xrm.OptionSetControl<ts_securityincidentstatus>;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "modifiedon"): Xrm.DateControl;
      get(name: "new_location"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "statecode"): Xrm.OptionSetControl<ts_securityincident_statecode>;
      get(name: "ts_additionaldetails"): Xrm.StringControl;
      get(name: "ts_aircarrier"): Xrm.LookupControl<"account">;
      get(name: "ts_arrests"): Xrm.OptionSetControl<ts_arrestsknownorunknown>;
      get(name: "ts_arrestsdetails"): Xrm.StringControl;
      get(name: "ts_bridgeclosure"): Xrm.OptionSetControl<ts_bridgeclosure>;
      get(name: "ts_canvasapp"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_closedby"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_closedon"): Xrm.DateControl;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_contact"): Xrm.StringControl;
      get(name: "ts_damagestoibtproperty"): Xrm.OptionSetControl<ts_damagestoibtproperty>;
      get(name: "ts_delayduration"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_delaystooperation"): Xrm.OptionSetControl<ts_delaystooperation>;
      get(name: "ts_destination"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_diversionaerodrome"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_email"): Xrm.StringControl;
      get(name: "ts_estimatedarrivaltime"): Xrm.DateControl;
      get(name: "ts_flightnumber"): Xrm.StringControl;
      get(name: "ts_furtheractionrequired"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_incidentdatetime"): Xrm.DateControl;
      get(name: "ts_incidentdatetimeadjust"): Xrm.DateControl;
      get(name: "ts_incidentdetailsattachment"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_inflight"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_injuries"): Xrm.OptionSetControl<ts_injuries>;
      get(name: "ts_latitude"): Xrm.NumberControl;
      get(name: "ts_locationcontext"): Xrm.StringControl;
      get(name: "ts_locationtype"): Xrm.OptionSetControl<ts_locationtype>;
      get(name: "ts_longitude"): Xrm.NumberControl;
      get(name: "ts_markerpost"): Xrm.StringControl;
      get(name: "ts_milemarker"): Xrm.StringControl;
      get(name: "ts_mode"): Xrm.OptionSetControl<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_notes"): Xrm.StringControl;
      get(name: "ts_organization"): Xrm.StringControl;
      get(name: "ts_origin"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_othercompany"): Xrm.StringControl;
      get(name: "ts_overtime"): Xrm.NumberControl;
      get(name: "ts_owneroftherailwaylinetrack"): Xrm.StringControl;
      get(name: "ts_phone"): Xrm.StringControl;
      get(name: "ts_policeresponse"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_province"): Xrm.OptionSetControl<ts_province>;
      get(name: "ts_publicorprivatecrossing"): Xrm.OptionSetControl<ts_publicorprivatecrossing>;
      get(name: "ts_quarterofsitime"): Xrm.OptionSetControl<ts_quarter>;
      get(name: "ts_quarterofsitraveltime"): Xrm.OptionSetControl<ts_quarter>;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_reporteddatetime"): Xrm.DateControl;
      get(name: "ts_reporteddatetimeadjust"): Xrm.DateControl;
      get(name: "ts_reportingcompany"): Xrm.LookupControl<"account">;
      get(name: "ts_reportingcompany_name"): Xrm.StringControl;
      get(name: "ts_ruralorurban"): Xrm.OptionSetControl<ts_ruralorurban>;
      get(name: "ts_securityincidenttime"): Xrm.NumberControl;
      get(name: "ts_securityincidenttype"): Xrm.LookupControl<"ts_securityincidenttype">;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_stakeholder_name"): Xrm.StringControl;
      get(name: "ts_statusofrailwayowner"): Xrm.OptionSetControl<ts_statusofrailwayowner>;
      get(name: "ts_statusrationale"): Xrm.StringControl;
      get(name: "ts_subdivision"): Xrm.StringControl;
      get(name: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_subsitetype"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_tamperingsubcategory"): Xrm.OptionSetControl<ts_tamperingsubcategory>;
      get(name: "ts_targetelement"): Xrm.LookupControl<"ts_targetelement">;
      get(name: "ts_tcomscategoryenglish"): Xrm.StringControl;
      get(name: "ts_tcomscategoryfrench"): Xrm.StringControl;
      get(name: "ts_tcomseventfollowupenglish"): Xrm.StringControl;
      get(name: "ts_tcomseventfollowupfrench"): Xrm.StringControl;
      get(name: "ts_tcomseventname"): Xrm.StringControl;
      get(name: "ts_tcomsid"): Xrm.StringControl;
      get(name: "ts_tcomsinteractionenglish"): Xrm.StringControl;
      get(name: "ts_tcomsinteractionfrench"): Xrm.StringControl;
      get(name: "ts_tcomsofficer"): Xrm.StringControl;
      get(name: "ts_tcomsseverityenglish"): Xrm.StringControl;
      get(name: "ts_tcomsseverityfrench"): Xrm.StringControl;
      get(name: "ts_tcomssubcategoryenglish"): Xrm.StringControl;
      get(name: "ts_tcomssubcategoryfrench"): Xrm.StringControl;
      get(name: "ts_timetakenforstakeholdertoreport"): Xrm.NumberControl;
      get(name: "ts_timezone"): Xrm.OptionSetControl<ts_timezone>;
      get(name: "ts_traveltime"): Xrm.NumberControl;
      get(name: "ts_yardorstationname"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}"): Xrm.PageTab<Tabs._99b378964f52417982963cc0e6722411>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_4"): Xrm.PageTab<Tabs.tab_4>;
      get(name: "tab_recordlog"): Xrm.PageTab<Tabs.tab_recordlog>;
      get(name: "tab_site"): Xrm.PageTab<Tabs.tab_site>;
      get(name: "tab_stakeholders"): Xrm.PageTab<Tabs.tab_stakeholders>;
      get(name: "tab_time_tracking"): Xrm.PageTab<Tabs.tab_time_tracking>;
      get(name: "tab_users"): Xrm.PageTab<Tabs.tab_users>;
      get(name: "tab_workspace"): Xrm.PageTab<Tabs.tab_workspace>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROM20 extends Xrm.PageBase<ROM20.Attributes,ROM20.Tabs,ROM20.Controls> {
    getAttribute(attributeName: "createdby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "modifiedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "new_location"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_securityincident_statecode>;
    getAttribute(attributeName: "ts_additionaldetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_aircarrier"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_arrests"): Xrm.OptionSetAttribute<ts_arrestsknownorunknown>;
    getAttribute(attributeName: "ts_arrestsdetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_bridgeclosure"): Xrm.OptionSetAttribute<ts_bridgeclosure>;
    getAttribute(attributeName: "ts_canvasapp"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_closedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_closedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_contact"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_damagestoibtproperty"): Xrm.OptionSetAttribute<ts_damagestoibtproperty>;
    getAttribute(attributeName: "ts_delayduration"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_delaystooperation"): Xrm.OptionSetAttribute<ts_delaystooperation>;
    getAttribute(attributeName: "ts_destination"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_diversionaerodrome"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_email"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_estimatedarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_flightnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_furtheractionrequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_incidentdatetime"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_incidentdatetimeadjust"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_incidentdetailsattachment"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_inflight"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_injuries"): Xrm.OptionSetAttribute<ts_injuries>;
    getAttribute(attributeName: "ts_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_locationcontext"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_locationtype"): Xrm.OptionSetAttribute<ts_locationtype>;
    getAttribute(attributeName: "ts_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_markerpost"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_milemarker"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_mode"): Xrm.OptionSetAttribute<ts_securityincidentmode>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_notes"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_organization"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_origin"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_othercompany"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_overtime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_owneroftherailwaylinetrack"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_phone"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_policeresponse"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_province"): Xrm.OptionSetAttribute<ts_province>;
    getAttribute(attributeName: "ts_publicorprivatecrossing"): Xrm.OptionSetAttribute<ts_publicorprivatecrossing>;
    getAttribute(attributeName: "ts_quarterofsitime"): Xrm.OptionSetAttribute<ts_quarter>;
    getAttribute(attributeName: "ts_quarterofsitraveltime"): Xrm.OptionSetAttribute<ts_quarter>;
    getAttribute(attributeName: "ts_recordstatus"): Xrm.OptionSetAttribute<ts_securityincidentstatus>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_reporteddatetime"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_reporteddatetimeadjust"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_reportingcompany"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_reportingcompany_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_ruralorurban"): Xrm.OptionSetAttribute<ts_ruralorurban>;
    getAttribute(attributeName: "ts_securityincidenttime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_securityincidenttype"): Xrm.LookupAttribute<"ts_securityincidenttype">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_stakeholder_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_statusofrailwayowner"): Xrm.OptionSetAttribute<ts_statusofrailwayowner>;
    getAttribute(attributeName: "ts_statusrationale"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_subdivision"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_subsitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_tamperingsubcategory"): Xrm.OptionSetAttribute<ts_tamperingsubcategory>;
    getAttribute(attributeName: "ts_targetelement"): Xrm.LookupAttribute<"ts_targetelement">;
    getAttribute(attributeName: "ts_tcomscategoryenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomscategoryfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomseventfollowupenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomseventfollowupfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomseventname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsinteractionenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsinteractionfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsofficer"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsseverityenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsseverityfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomssubcategoryenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomssubcategoryfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_timetakenforstakeholdertoreport"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_timezone"): Xrm.OptionSetAttribute<ts_timezone>;
    getAttribute(attributeName: "ts_traveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_yardorstationname"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"contact">;
    getControl(controlName: "WebResource_SecurityIncidentDetailsDisplay"): Xrm.WebResourceControl;
    getControl(controlName: "createdby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "grid_doc"): Xrm.SubGridControl<"ts_file">;
    getControl(controlName: "grid_workorder"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_recordstatus"): Xrm.OptionSetControl<ts_securityincidentstatus>;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "modifiedon"): Xrm.DateControl;
    getControl(controlName: "new_location"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ts_securityincident_statecode>;
    getControl(controlName: "ts_additionaldetails"): Xrm.StringControl;
    getControl(controlName: "ts_aircarrier"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_arrests"): Xrm.OptionSetControl<ts_arrestsknownorunknown>;
    getControl(controlName: "ts_arrestsdetails"): Xrm.StringControl;
    getControl(controlName: "ts_bridgeclosure"): Xrm.OptionSetControl<ts_bridgeclosure>;
    getControl(controlName: "ts_canvasapp"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_closedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_closedon"): Xrm.DateControl;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_contact"): Xrm.StringControl;
    getControl(controlName: "ts_damagestoibtproperty"): Xrm.OptionSetControl<ts_damagestoibtproperty>;
    getControl(controlName: "ts_delayduration"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_delaystooperation"): Xrm.OptionSetControl<ts_delaystooperation>;
    getControl(controlName: "ts_destination"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_diversionaerodrome"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_email"): Xrm.StringControl;
    getControl(controlName: "ts_estimatedarrivaltime"): Xrm.DateControl;
    getControl(controlName: "ts_flightnumber"): Xrm.StringControl;
    getControl(controlName: "ts_furtheractionrequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_incidentdatetime"): Xrm.DateControl;
    getControl(controlName: "ts_incidentdatetimeadjust"): Xrm.DateControl;
    getControl(controlName: "ts_incidentdetailsattachment"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_inflight"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_injuries"): Xrm.OptionSetControl<ts_injuries>;
    getControl(controlName: "ts_latitude"): Xrm.NumberControl;
    getControl(controlName: "ts_locationcontext"): Xrm.StringControl;
    getControl(controlName: "ts_locationtype"): Xrm.OptionSetControl<ts_locationtype>;
    getControl(controlName: "ts_longitude"): Xrm.NumberControl;
    getControl(controlName: "ts_markerpost"): Xrm.StringControl;
    getControl(controlName: "ts_milemarker"): Xrm.StringControl;
    getControl(controlName: "ts_mode"): Xrm.OptionSetControl<ts_securityincidentmode>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_notes"): Xrm.StringControl;
    getControl(controlName: "ts_organization"): Xrm.StringControl;
    getControl(controlName: "ts_origin"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_othercompany"): Xrm.StringControl;
    getControl(controlName: "ts_overtime"): Xrm.NumberControl;
    getControl(controlName: "ts_owneroftherailwaylinetrack"): Xrm.StringControl;
    getControl(controlName: "ts_phone"): Xrm.StringControl;
    getControl(controlName: "ts_policeresponse"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_province"): Xrm.OptionSetControl<ts_province>;
    getControl(controlName: "ts_publicorprivatecrossing"): Xrm.OptionSetControl<ts_publicorprivatecrossing>;
    getControl(controlName: "ts_quarterofsitime"): Xrm.OptionSetControl<ts_quarter>;
    getControl(controlName: "ts_quarterofsitraveltime"): Xrm.OptionSetControl<ts_quarter>;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_reporteddatetime"): Xrm.DateControl;
    getControl(controlName: "ts_reporteddatetimeadjust"): Xrm.DateControl;
    getControl(controlName: "ts_reportingcompany"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_reportingcompany_name"): Xrm.StringControl;
    getControl(controlName: "ts_ruralorurban"): Xrm.OptionSetControl<ts_ruralorurban>;
    getControl(controlName: "ts_securityincidenttime"): Xrm.NumberControl;
    getControl(controlName: "ts_securityincidenttype"): Xrm.LookupControl<"ts_securityincidenttype">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_stakeholder_name"): Xrm.StringControl;
    getControl(controlName: "ts_statusofrailwayowner"): Xrm.OptionSetControl<ts_statusofrailwayowner>;
    getControl(controlName: "ts_statusrationale"): Xrm.StringControl;
    getControl(controlName: "ts_subdivision"): Xrm.StringControl;
    getControl(controlName: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_subsitetype"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_tamperingsubcategory"): Xrm.OptionSetControl<ts_tamperingsubcategory>;
    getControl(controlName: "ts_targetelement"): Xrm.LookupControl<"ts_targetelement">;
    getControl(controlName: "ts_tcomscategoryenglish"): Xrm.StringControl;
    getControl(controlName: "ts_tcomscategoryfrench"): Xrm.StringControl;
    getControl(controlName: "ts_tcomseventfollowupenglish"): Xrm.StringControl;
    getControl(controlName: "ts_tcomseventfollowupfrench"): Xrm.StringControl;
    getControl(controlName: "ts_tcomseventname"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsid"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsinteractionenglish"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsinteractionfrench"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsofficer"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsseverityenglish"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsseverityfrench"): Xrm.StringControl;
    getControl(controlName: "ts_tcomssubcategoryenglish"): Xrm.StringControl;
    getControl(controlName: "ts_tcomssubcategoryfrench"): Xrm.StringControl;
    getControl(controlName: "ts_timetakenforstakeholdertoreport"): Xrm.NumberControl;
    getControl(controlName: "ts_timezone"): Xrm.OptionSetControl<ts_timezone>;
    getControl(controlName: "ts_traveltime"): Xrm.NumberControl;
    getControl(controlName: "ts_yardorstationname"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}