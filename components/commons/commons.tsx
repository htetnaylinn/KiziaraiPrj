
// supabaseのmasterに対応する

export const Role = {
    Supplier: 1,
    Buyer: 2,
    Agent: 3,
  } as const;

export const RolePlan = {
    SupplierAgency:1,
    SupplierSurplus:2,
    SupplierSustainable:3,
    SupplierEconomy:4,
    SupplierStandard:5,
    BuyerFree: 6,
    BuyerSubscription: 7,
    AgentFree: 8,
} as const;

export const ShowRoomPlan = {
    Simple:1,
    Standard:2,
}

export const getRoleName = (role: number) => {
    switch (role) {
        case Role.Supplier:
            return "Supplier";
        case Role.Buyer:
            return "Buyer";
        case Role.Agent:
            return "Agent";
        default:
            return "Unknown";
    }
}

export const getRolePlanName = (rolePlan: number) => {
    switch (rolePlan) {
        case RolePlan.SupplierAgency:
            return "Agency";
        case RolePlan.SupplierSurplus:
            return "Surplus";
        case RolePlan.SupplierSustainable:
            return "Sustainable";
        case RolePlan.SupplierEconomy:
            return "Economy";
        case RolePlan.SupplierStandard:
            return "Standard";
        case RolePlan.BuyerFree:
            return "FREE";
        case RolePlan.BuyerSubscription:
            return "Subscription";
        case RolePlan.AgentFree:
            return "FREE";
        default:
            return "Unknown";
    }
}

export const getLanguageNumber = (lang_name : string)=>{
    switch (lang_name) {
        case "ja":
            return 1;
        case "en":
            return 2;
        case "zh":
            return 3;
        default:
            return 0;
        }
}

export const getLanguageText = (lang_id : number)=>{
    switch (lang_id) {
        case 1:
            return "ja";
        case 2:
            return "en";
        case 3:
            return "zh";
        default:
            return "";
        }
}

// TODO: 国コードのものに変更する
export const getCountryNumber = (country_name : string)=>{
    switch (country_name) {
        case "Japan":
            return 1;
        case "China":
            return 2;
        case "United States of America":
            return 3;
        case "United Kingdom":
            return 4;
        case "Canada":
            return 5;
        case "Australia":
            return 6;
        case "New Zealand":
            return 7;
        default:
            return 0;
        }
}

// トランザクションのステータス
export const getTransactionStatus = (status_id : number)=>{
    switch (status_id) {
        case 1:
            return "支払いリンク発行依頼中";
        case 2:
            return "支払いリンク発行済み";
        case 3:
            return "支払い済み";
        case 4:
            return "キャンセル";
        default:
            return "";
    }
}