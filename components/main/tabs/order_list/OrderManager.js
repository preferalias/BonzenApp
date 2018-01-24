export default class OrderManager {
    getStatusEnum(status) {
        var result;
        switch(status){
            case 1 :
                result = 'Pending'
                break;
            case 2 :
                result = 'In Progress'
                break;
            case 3 : 
                result = 'Closed'
                break;
            case 4 :
                result = 'Cancel'
                break;
            default :
                result = 'Unknown Status'
        }
        return result;
    }
    getPreTypeEnum(type) {
        var result;
        switch(type){
            case 1 : 
                result = 'Request'
                break;
            case 2 :
                result = 'Complaint'
                break;
            case 3 :
                result = 'Need Approved'
                break;
            default : 
                result = 'Unknown Type'
        }
        return result;
    }
} 
