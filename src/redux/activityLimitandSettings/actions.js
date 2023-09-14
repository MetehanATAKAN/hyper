import { ActivityLimitandSettingsType } from "./constant";

export const ownersCompany =(companyName)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_COMPANY,
        payload:companyName
    }
}

export const ownersBusinessUnite =(businessUniteName)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_BUSINESS_UNITE,
        payload:businessUniteName
    }
}

export const ownersPosition =(position)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_POSITION,
        payload:position
    }
}

export const ownersProductZoneorArea =(productZoneOrArea)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_PRODUCT_ZONE_OR_AREA,
        payload:productZoneOrArea
    }
}

export const ownersTableData =(tableData)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_TABLE_DATA,
        payload:tableData
    }
}

export const allCompany =(company)=> {
    return {
        type:ActivityLimitandSettingsType.ALL_COMPANY,
        payload:company
    }
}

export const allBusinessUnite =(businessUnite)=> {
    return {
        type:ActivityLimitandSettingsType.ALL_BUSINESS_UNITE,
        payload:businessUnite
    }
}

export const activityLimitYear =(year)=> {
    return {
        type:ActivityLimitandSettingsType.ACTIVITY_LIMIT_YEAR,
        payload:year
    }
}

export const allPosition =(position)=> {
    return {
        type:ActivityLimitandSettingsType.ALL_POSITION,
        payload:position
    }
}

export const activityIsDisabled =(disabled)=> {
    return {
        type:ActivityLimitandSettingsType.ACTIVITY_IS_DISABLED,
        payload:disabled
    }
}

export const ownersIsDisabled =(disabled)=> {
    return {
        type:ActivityLimitandSettingsType.OWNERS_IS_DISABLED,
        payload:disabled
    }
}

export const participantsIsDisabled =(disabled)=> {
    return {
        type:ActivityLimitandSettingsType.PARTICIPANTS_IS_DISABLED,
        payload:disabled
    }
}

export const activityLocationData =(data)=> {

    return {
        type:ActivityLimitandSettingsType.ACTIVITY_LOCATION_DATA,
        payload:data
    }
}

export const activityId =(id)=> {

    return {
        type:ActivityLimitandSettingsType.ACTIVITY_ID,
        payload:id
    }
}

export const ownersTableDataMain =(table)=> {

    return {
        type:ActivityLimitandSettingsType.OWNERS_TABLE_DATA_MAIN,
        payload:table
    }
}

export const isTotalMainTable =(boolean)=> {
    return {
        type:ActivityLimitandSettingsType.IS_TOTAL_MAIN_TABLE,
        payload:boolean
    }
}

export const participantTableDatas =(table)=> {
    return {
        type:ActivityLimitandSettingsType.PARTICIPANT_TABLE_DATAS,
        payload:table
    }
}

export const alsModal =(boolean)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_MODAL,
        payload:boolean
    }
}

export const alsGetAvtivityFilter =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_GET_ACTIVITY_FILTER,
        payload:data
    }
}

export const alsFilterYear =(year)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_FILTER_YEAR,
        payload:year
    }
}

export const alsFilterActivityType =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_FILTER_ACTIVITY_TYPE,
        payload:data
    }
}

export const alsFilterMainProcess =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_FILTER_MAIN_PROCESS,
        payload:data
    }
}

export const alsFilterBusinessProcess =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_FILTER_BUSINESS_PROCESS,
        payload:data
    }
}

export const alsFilterProcess =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_FILTER_PROCESS,
        payload:data
    }
}

export const alsFilterBody =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_GET_FILTER_BODY,
        payload:data
    }
}

export const alsUpdateData =(data)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_UPDATE_DATA,
        payload:data
    }
}

export const alsUpdateDisabled =(bool)=> {
    return {
        type:ActivityLimitandSettingsType.ALS_UPDATE_DISABLED,
        payload:bool
    }
}

export const pageDesignTemplate =(id)=> {
    return {
        type:ActivityLimitandSettingsType.PAGE_DESIGN_TEMPLATE,
        payload:id
    }
}




