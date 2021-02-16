declare namespace Form.bookableresource.Main {
  namespace BookableResourceMobile {
    namespace Tabs {
      interface fstab_field_service extends Xrm.SectionCollectionBase {
        get(name: "fstab_field_service_section_4"): Xrm.PageSection;
        get(name: "fstab_field_service_section_5"): Xrm.PageSection;
        get(name: "fstab_field_service_section_field_service"): Xrm.PageSection;
        get(name: "fstab_field_service_section_misc"): Xrm.PageSection;
        get(name: "fstab_field_service_section_scheduling"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_general extends Xrm.SectionCollectionBase {
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_sub_grids extends Xrm.SectionCollectionBase {
        get(name: "fstab_sub_grids_section"): Xrm.PageSection;
        get(name: "tab_3_section_2"): Xrm.PageSection;
        get(name: "tab_3_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "accountid"): Xrm.LookupAttribute<"account">;
      get(name: "contactid"): Xrm.LookupAttribute<"contact">;
      get(name: "msdyn_bookingstodrip"): Xrm.NumberAttribute;
      get(name: "msdyn_displayonscheduleassistant"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_displayonscheduleboard"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_enabledripscheduling"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_endlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
      get(name: "msdyn_generictype"): Xrm.OptionSetAttribute<msdyn_generictype>;
      get(name: "msdyn_hourlyrate"): Xrm.NumberAttribute;
      get(name: "msdyn_startlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
      get(name: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_warehouse"): Xrm.LookupAttribute<"msdyn_warehouse">;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "resourcetype"): Xrm.OptionSetAttribute<bookableresource_resourcetype>;
      get(name: "timezone"): Xrm.Attribute<any>;
      get(name: "userid"): Xrm.LookupAttribute<"systemuser">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "BookableResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
      get(name: "CATEGORYASSOCIATIONS"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
      get(name: "ResourceCategory"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
      get(name: "ResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
      get(name: "accountid"): Xrm.LookupControl<"account">;
      get(name: "contactid"): Xrm.LookupControl<"contact">;
      get(name: "msdyn_bookingstodrip"): Xrm.NumberControl;
      get(name: "msdyn_displayonscheduleassistant"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_displayonscheduleboard"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_enabledripscheduling"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_endlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
      get(name: "msdyn_generictype"): Xrm.OptionSetControl<msdyn_generictype>;
      get(name: "msdyn_hourlyrate"): Xrm.NumberControl;
      get(name: "msdyn_startlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
      get(name: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_warehouse"): Xrm.LookupControl<"msdyn_warehouse">;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "resourcetype"): Xrm.OptionSetControl<bookableresource_resourcetype>;
      get(name: "timezone"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "userid"): Xrm.LookupControl<"systemuser">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "fstab_field_service"): Xrm.PageTab<Tabs.fstab_field_service>;
      get(name: "fstab_general"): Xrm.PageTab<Tabs.fstab_general>;
      get(name: "fstab_sub_grids"): Xrm.PageTab<Tabs.fstab_sub_grids>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface BookableResourceMobile extends Xrm.PageBase<BookableResourceMobile.Attributes,BookableResourceMobile.Tabs,BookableResourceMobile.Controls> {
    getAttribute(attributeName: "accountid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "contactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "msdyn_bookingstodrip"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_displayonscheduleassistant"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_displayonscheduleboard"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_enabledripscheduling"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_endlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
    getAttribute(attributeName: "msdyn_generictype"): Xrm.OptionSetAttribute<msdyn_generictype>;
    getAttribute(attributeName: "msdyn_hourlyrate"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_startlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
    getAttribute(attributeName: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_warehouse"): Xrm.LookupAttribute<"msdyn_warehouse">;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resourcetype"): Xrm.OptionSetAttribute<bookableresource_resourcetype>;
    getAttribute(attributeName: "timezone"): Xrm.Attribute<any>;
    getAttribute(attributeName: "userid"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "BookableResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
    getControl(controlName: "CATEGORYASSOCIATIONS"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
    getControl(controlName: "ResourceCategory"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
    getControl(controlName: "ResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
    getControl(controlName: "accountid"): Xrm.LookupControl<"account">;
    getControl(controlName: "contactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "msdyn_bookingstodrip"): Xrm.NumberControl;
    getControl(controlName: "msdyn_displayonscheduleassistant"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_displayonscheduleboard"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_enabledripscheduling"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_endlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
    getControl(controlName: "msdyn_generictype"): Xrm.OptionSetControl<msdyn_generictype>;
    getControl(controlName: "msdyn_hourlyrate"): Xrm.NumberControl;
    getControl(controlName: "msdyn_startlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
    getControl(controlName: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_warehouse"): Xrm.LookupControl<"msdyn_warehouse">;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "resourcetype"): Xrm.OptionSetControl<bookableresource_resourcetype>;
    getControl(controlName: "timezone"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "userid"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: string): undefined;
  }
}
