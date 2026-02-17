declare namespace Form.ts_file.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "createdby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_attachment"): Xrm.Attribute<any>;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_file"): Xrm.Attribute<string>;
      get(name: "ts_filecategory"): Xrm.LookupAttribute<"ts_filecategory">;
      get(name: "ts_filesubcategory"): Xrm.LookupAttribute<"ts_filesubcategory">;
      get(name: "ts_filetype"): Xrm.Attribute<string>;
      get(name: "ts_sharepointfilecategory"): Xrm.Attribute<string>;
      get(name: "ts_sharepointlink"): Xrm.Attribute<string>;
      get(name: "ts_visibletootherprograms"): Xrm.OptionSetAttribute<boolean>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "createdby"): Xrm.LookupControl<"systemuser">;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_attachment"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_file"): Xrm.StringControl;
      get(name: "ts_filecategory"): Xrm.LookupControl<"ts_filecategory">;
      get(name: "ts_filesubcategory"): Xrm.LookupControl<"ts_filesubcategory">;
      get(name: "ts_filetype"): Xrm.StringControl;
      get(name: "ts_sharepointfilecategory"): Xrm.StringControl;
      get(name: "ts_sharepointlink"): Xrm.StringControl;
      get(name: "ts_visibletootherprograms"): Xrm.OptionSetControl<boolean>;
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
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_attachment"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_file"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_filecategory"): Xrm.LookupAttribute<"ts_filecategory">;
    getAttribute(attributeName: "ts_filesubcategory"): Xrm.LookupAttribute<"ts_filesubcategory">;
    getAttribute(attributeName: "ts_filetype"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_sharepointfilecategory"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_sharepointlink"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_visibletootherprograms"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "createdby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_attachment"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_file"): Xrm.StringControl;
    getControl(controlName: "ts_filecategory"): Xrm.LookupControl<"ts_filecategory">;
    getControl(controlName: "ts_filesubcategory"): Xrm.LookupControl<"ts_filesubcategory">;
    getControl(controlName: "ts_filetype"): Xrm.StringControl;
    getControl(controlName: "ts_sharepointfilecategory"): Xrm.StringControl;
    getControl(controlName: "ts_sharepointlink"): Xrm.StringControl;
    getControl(controlName: "ts_visibletootherprograms"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: string): undefined;
  }
}
