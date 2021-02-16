declare namespace Form.qm_tylegislationcharacteristic.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "createdby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "modifiedon"): Xrm.DateAttribute;
      get(name: "qm_categoryid"): Xrm.LookupAttribute<"qm_tylegislationcharacteristic">;
      get(name: "qm_legislationcharacteristicelbl"): Xrm.Attribute<string>;
      get(name: "qm_legislationcharacteristicflbl"): Xrm.Attribute<string>;
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: "statecode"): Xrm.OptionSetAttribute<qm_tylegislationcharacteristic_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "createdby"): Xrm.LookupControl<"systemuser">;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "modifiedon"): Xrm.DateControl;
      get(name: "qm_categoryid"): Xrm.LookupControl<"qm_tylegislationcharacteristic">;
      get(name: "qm_legislationcharacteristicelbl"): Xrm.StringControl;
      get(name: "qm_legislationcharacteristicflbl"): Xrm.StringControl;
      get(name: "qm_name"): Xrm.StringControl;
      get(name: "statecode"): Xrm.OptionSetControl<qm_tylegislationcharacteristic_statecode>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "createdby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "modifiedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "qm_categoryid"): Xrm.LookupAttribute<"qm_tylegislationcharacteristic">;
    getAttribute(attributeName: "qm_legislationcharacteristicelbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationcharacteristicflbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<qm_tylegislationcharacteristic_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "createdby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "modifiedon"): Xrm.DateControl;
    getControl(controlName: "qm_categoryid"): Xrm.LookupControl<"qm_tylegislationcharacteristic">;
    getControl(controlName: "qm_legislationcharacteristicelbl"): Xrm.StringControl;
    getControl(controlName: "qm_legislationcharacteristicflbl"): Xrm.StringControl;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<qm_tylegislationcharacteristic_statecode>;
    getControl(controlName: string): undefined;
  }
}
