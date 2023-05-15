declare namespace Form.ts_action.Main {
  namespace ROMAction {
    namespace Tabs {
      interface bfc785515c7f414da2bf259d45828fc9 extends Xrm.SectionCollectionBase {
        get(name: "{f4242373-e883-4dd1-bdfd-aa3a4f78c523}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
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
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_actioncategory"): Xrm.OptionSetAttribute<ts_actioncategory>;
      get(name: "ts_actionstatus"): Xrm.OptionSetAttribute<ts_actionstatus>;
      get(name: "ts_actiontype"): Xrm.OptionSetAttribute<ts_actiontype>;
      get(name: "ts_amtamount"): Xrm.NumberAttribute;
      get(name: "ts_contact"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_deliverymethod"): Xrm.OptionSetAttribute<ts_deliverymethod>;
      get(name: "ts_details"): Xrm.Attribute<string>;
      get(name: "ts_duedate"): Xrm.DateAttribute;
      get(name: "ts_location"): Xrm.Attribute<string>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_timedate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "subgrid_related_findings"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "ts_actioncategory"): Xrm.OptionSetControl<ts_actioncategory>;
      get(name: "ts_actionstatus"): Xrm.OptionSetControl<ts_actionstatus>;
      get(name: "ts_actiontype"): Xrm.OptionSetControl<ts_actiontype>;
      get(name: "ts_amtamount"): Xrm.NumberControl;
      get(name: "ts_contact"): Xrm.LookupControl<"contact">;
      get(name: "ts_deliverymethod"): Xrm.OptionSetControl<ts_deliverymethod>;
      get(name: "ts_details"): Xrm.StringControl;
      get(name: "ts_duedate"): Xrm.DateControl;
      get(name: "ts_location"): Xrm.StringControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_timedate"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{bfc78551-5c7f-414d-a2bf-259d45828fc9}"): Xrm.PageTab<Tabs.bfc785515c7f414da2bf259d45828fc9>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROMAction extends Xrm.PageBase<ROMAction.Attributes,ROMAction.Tabs,ROMAction.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_actioncategory"): Xrm.OptionSetAttribute<ts_actioncategory>;
    getAttribute(attributeName: "ts_actionstatus"): Xrm.OptionSetAttribute<ts_actionstatus>;
    getAttribute(attributeName: "ts_actiontype"): Xrm.OptionSetAttribute<ts_actiontype>;
    getAttribute(attributeName: "ts_amtamount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_contact"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_deliverymethod"): Xrm.OptionSetAttribute<ts_deliverymethod>;
    getAttribute(attributeName: "ts_details"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_duedate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_location"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_timedate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "subgrid_related_findings"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "ts_actioncategory"): Xrm.OptionSetControl<ts_actioncategory>;
    getControl(controlName: "ts_actionstatus"): Xrm.OptionSetControl<ts_actionstatus>;
    getControl(controlName: "ts_actiontype"): Xrm.OptionSetControl<ts_actiontype>;
    getControl(controlName: "ts_amtamount"): Xrm.NumberControl;
    getControl(controlName: "ts_contact"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_deliverymethod"): Xrm.OptionSetControl<ts_deliverymethod>;
    getControl(controlName: "ts_details"): Xrm.StringControl;
    getControl(controlName: "ts_duedate"): Xrm.DateControl;
    getControl(controlName: "ts_location"): Xrm.StringControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_timedate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
