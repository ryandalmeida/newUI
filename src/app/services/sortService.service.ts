export class SortService {
    tableSort(key, order, allItems) {
        if (order == true) {
            if (key === "programName" || key === "pledgeFundType" || key === "status" ||
                key === "startDate" || key === "endDate" || key === "donorName" || key === "country"
                || key === "approvedBy") {
                allItems.sort(function (a, b) {
                    return ('' + a[key]).localeCompare(b[key]);
                });
                return allItems;
            }
            else {
                allItems.sort(function (a, b) {
                    return a[key] - b[key]
                }
                );
                return allItems;
            }
        } else {
            if (key === "programName" || key === "pledgeFundType" || key === "status" ||
                key === "startDate" || key === "endDate" || key === "donorName" || key === "country"
                || key === "approvedBy") {
                allItems.sort(function (a, b) {
                    return ('' + b[key]).localeCompare(a[key]);
                });
                return allItems;
            }
            else {
                allItems.sort(function (a, b) {
                    return b[key] - a[key]
                }
                );
                return allItems;
            }
        }
    }
}