export class SortService {

    tableSort(key,order,allItems) {

        console.log("TESTONG")
        if (order == true) {
            if (key === "programName" || key === "pledgeFundType" || key === "status" ||
                key === "startDate" || key === "endDate" || key === "donorName" || key === "country"
                || key === "approvedBy") {
                allItems.sort(function (a, b) {
                    return ('' + a[key]).localeCompare(b[key]);
                });
               // this.setPage(1);
               return allItems;
            }
            else {
                allItems.sort(function (a, b) {
                    return a[key] - b[key]
                }
                );
                return allItems;
                //this.setPage(1);
            }
        } else {
            if (key === "programName" || key === "pledgeFundType" || key === "status" ||
            key === "startDate" || key === "endDate" || key === "donorName" || key === "country"
            || key === "approvedBy") {
                allItems.sort(function (a, b) {
                    return ('' + b[key]).localeCompare(a[key]);
                });
                return allItems;
                //this.setPage(1);
            }
            else {
                allItems.sort(function (a, b) {
                    return b[key] - a[key]
                }
                );
                return allItems;
                //this.setPage(1);
            }
        }
    }
}