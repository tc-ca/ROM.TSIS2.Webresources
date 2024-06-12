declare namespace Form.bookableresource.Main {
  namespace MainForm {
    namespace Tabs {
      interface FieldService extends Xrm.SectionCollectionBase {
        get(name: "FieldService_section_4"): Xrm.PageSection;
        get(name: "FieldService_section_5"): Xrm.PageSection;
        get(name: "fstab_service_settings_section_5"): Xrm.PageSection;
        get(name: "fstab_service_settings_section_7"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Omnichannel extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface e37f45244a6642dc974c078756aef3fb extends Xrm.SectionCollectionBase {
        get(name: "msdyn_userinformation"): Xrm.PageSection;
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: "{6bfe3886-a003-47b5-a2c2-7e54ad6213a9}"): Xrm.PageSection;
        get(name: "{9e7dec57-2c62-4d5d-8b21-75d076c5d1a1}"): Xrm.PageSection;
        get(name: "{e37f4524-4a66-42dc-974c-078756aef3fb}_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface workhours extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "accountid"): Xrm.LookupAttribute<"account">;
      get(name: "calendarid"): Xrm.Attribute<any>;
      get(name: "contactid"): Xrm.LookupAttribute<"contact">;
      get(name: "msdyn_bookingstodrip"): Xrm.NumberAttribute;
      get(name: "msdyn_crewstrategy"): Xrm.OptionSetAttribute<msdyn_crewstrategy>;
      get(name: "msdyn_derivecapacity"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_displayonscheduleassistant"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_displayonscheduleboard"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_enableappointments"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_enabledforfieldservicemobile"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_enabledripscheduling"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_enableoutlookschedules"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_endlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
      get(name: "msdyn_facilityequipmentid"): Xrm.LookupAttribute<"equipment">;
      get(name: "msdyn_generictype"): Xrm.OptionSetAttribute<msdyn_generictype>;
      get(name: "msdyn_hourlyrate"): Xrm.NumberAttribute;
      get(name: "msdyn_optimalcrewsize"): Xrm.NumberAttribute;
      get(name: "msdyn_organizationalunit"): Xrm.LookupAttribute<"msdyn_organizationalunit">;
      get(name: "msdyn_pooltype"): Xrm.MultiSelectOptionSetAttribute<msdyn_pooltype>;
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
      get(name: "BookableResourceCharacteristics1"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
      get(name: "CATEGORYASSOCIATIONS"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
      get(name: "ResourceCategory"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
      get(name: "ResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
      get(name: "accountid"): Xrm.LookupControl<"account">;
      get(name: "calendarid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "contactid"): Xrm.LookupControl<"contact">;
      get(name: "msdyn_bookingstodrip"): Xrm.NumberControl;
      get(name: "msdyn_crewstrategy"): Xrm.OptionSetControl<msdyn_crewstrategy>;
      get(name: "msdyn_derivecapacity"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_displayonscheduleassistant"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_displayonscheduleboard"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_enableappointments"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_enabledforfieldservicemobile"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_enabledripscheduling"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_enableoutlookschedules"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_endlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
      get(name: "msdyn_facilityequipmentid"): Xrm.LookupControl<"equipment">;
      get(name: "msdyn_generictype"): Xrm.OptionSetControl<msdyn_generictype>;
      get(name: "msdyn_hourlyrate"): Xrm.NumberControl;
      get(name: "msdyn_optimalcrewsize"): Xrm.NumberControl;
      get(name: "msdyn_organizationalunit"): Xrm.LookupControl<"msdyn_organizationalunit">;
      get(name: "msdyn_pooltype"): Xrm.MultiSelectOptionSetControl<msdyn_pooltype>;
      get(name: "msdyn_startlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
      get(name: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_warehouse"): Xrm.LookupControl<"msdyn_warehouse">;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "resourcetype"): Xrm.OptionSetControl<bookableresource_resourcetype>;
      get(name: "timezone"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "userid"): Xrm.LookupControl<"systemuser">;
      get(name: "userid1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "FieldService"): Xrm.PageTab<Tabs.FieldService>;
      get(name: "Omnichannel"): Xrm.PageTab<Tabs.Omnichannel>;
      get(name: "{e37f4524-4a66-42dc-974c-078756aef3fb}"): Xrm.PageTab<Tabs.e37f45244a6642dc974c078756aef3fb>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "workhours"): Xrm.PageTab<Tabs.workhours>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface MainForm extends Xrm.PageBase<MainForm.Attributes,MainForm.Tabs,MainForm.Controls> {
    getAttribute(attributeName: "accountid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "calendarid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "contactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "msdyn_bookingstodrip"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_crewstrategy"): Xrm.OptionSetAttribute<msdyn_crewstrategy>;
    getAttribute(attributeName: "msdyn_derivecapacity"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_displayonscheduleassistant"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_displayonscheduleboard"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_enableappointments"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_enabledforfieldservicemobile"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_enabledripscheduling"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_enableoutlookschedules"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_endlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
    getAttribute(attributeName: "msdyn_facilityequipmentid"): Xrm.LookupAttribute<"equipment">;
    getAttribute(attributeName: "msdyn_generictype"): Xrm.OptionSetAttribute<msdyn_generictype>;
    getAttribute(attributeName: "msdyn_hourlyrate"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_optimalcrewsize"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_organizationalunit"): Xrm.LookupAttribute<"msdyn_organizationalunit">;
    getAttribute(attributeName: "msdyn_pooltype"): Xrm.MultiSelectOptionSetAttribute<msdyn_pooltype>;
    getAttribute(attributeName: "msdyn_startlocation"): Xrm.OptionSetAttribute<msdyn_workstartlocationtype>;
    getAttribute(attributeName: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_warehouse"): Xrm.LookupAttribute<"msdyn_warehouse">;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resourcetype"): Xrm.OptionSetAttribute<bookableresource_resourcetype>;
    getAttribute(attributeName: "timezone"): Xrm.Attribute<any>;
    getAttribute(attributeName: "userid"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "BookableResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
    getControl(controlName: "BookableResourceCharacteristics1"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
    getControl(controlName: "CATEGORYASSOCIATIONS"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
    getControl(controlName: "ResourceCategory"): Xrm.SubGridControl<"bookableresourcecategoryassn">;
    getControl(controlName: "ResourceCharacteristics"): Xrm.SubGridControl<"bookableresourcecharacteristic">;
    getControl(controlName: "accountid"): Xrm.LookupControl<"account">;
    getControl(controlName: "calendarid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "contactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "msdyn_bookingstodrip"): Xrm.NumberControl;
    getControl(controlName: "msdyn_crewstrategy"): Xrm.OptionSetControl<msdyn_crewstrategy>;
    getControl(controlName: "msdyn_derivecapacity"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_displayonscheduleassistant"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_displayonscheduleboard"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_enableappointments"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_enabledforfieldservicemobile"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_enabledripscheduling"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_enableoutlookschedules"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_endlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
    getControl(controlName: "msdyn_facilityequipmentid"): Xrm.LookupControl<"equipment">;
    getControl(controlName: "msdyn_generictype"): Xrm.OptionSetControl<msdyn_generictype>;
    getControl(controlName: "msdyn_hourlyrate"): Xrm.NumberControl;
    getControl(controlName: "msdyn_optimalcrewsize"): Xrm.NumberControl;
    getControl(controlName: "msdyn_organizationalunit"): Xrm.LookupControl<"msdyn_organizationalunit">;
    getControl(controlName: "msdyn_pooltype"): Xrm.MultiSelectOptionSetControl<msdyn_pooltype>;
    getControl(controlName: "msdyn_startlocation"): Xrm.OptionSetControl<msdyn_workstartlocationtype>;
    getControl(controlName: "msdyn_timeoffapprovalrequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_warehouse"): Xrm.LookupControl<"msdyn_warehouse">;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "resourcetype"): Xrm.OptionSetControl<bookableresource_resourcetype>;
    getControl(controlName: "timezone"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "userid"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "userid1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: string): undefined;
  }
}
