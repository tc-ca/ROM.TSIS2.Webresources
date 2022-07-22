function planningTrip(data) {
    Xrm.Navigation.navigateTo({
        pageType: "bulkedit",
        entityName: "ts_trip",
        entityIds: data,
        formId:"2D4F5852-3B4C-47BF-AD64-DF22048C5C9A"
    }, {
        target: 2,
        width: {
            value: 50,
            unit: "%"
        },
        height: {
            value: 60,
            unit: "%"
        }
    });
}
