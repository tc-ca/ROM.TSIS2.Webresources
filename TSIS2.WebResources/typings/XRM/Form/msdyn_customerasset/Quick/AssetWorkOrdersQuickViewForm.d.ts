declare namespace Form.msdyn_customerasset.Quick {
  namespace AssetWorkOrdersQuickViewForm {
    namespace Tabs {
      interface AssetWorkOrdersSubGridTab extends Xrm.SectionCollectionBase {
        get(name: "AssetWorkOrdersSubGridSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "AssetWorkOrdersControl"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "AssetWorkOrdersSubGridTab"): Xrm.PageTab<Tabs.AssetWorkOrdersSubGridTab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface AssetWorkOrdersQuickViewForm extends Xrm.PageBase<AssetWorkOrdersQuickViewForm.Attributes,AssetWorkOrdersQuickViewForm.Tabs,AssetWorkOrdersQuickViewForm.Controls> {
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "AssetWorkOrdersControl"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: string): undefined;
  }
}
