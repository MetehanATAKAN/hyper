import { NeedsType } from "./constant"

export const needTab =(tabName)=> {
    return {
        type:NeedsType.NEEDSTAB,
        payload:tabName
    }
}

export const benefitTab =(tabName)=> {
    return {
        type:NeedsType.BENEFITTAB,
        payload:tabName
    }
}

export const pageListPlus =(tabName)=> {
    console.log('pagelistplus',tabName);
    return {
        type:NeedsType.PAGE_LIST_PLUS,
        payload:tabName
    }
}

export const needPageButtonDatas = (data) => {
    return {
        type: NeedsType.NEEDPAGE_BUTTON_DATAS,
        payload: data
    }
} 

export const benefitPageButtonDatas = (data) => {
    return {
        type: NeedsType.BENEFIT_BUTTON_DATAS,
        payload: data
    }
} 

export const disadvantagePageButtonDatas = (data) => {
    return {
        type: NeedsType.DISADVANTAGE_BUTTON_DATAS,
        payload: data
    }
}

export const disadvantageTab = (tabName) => {
    return {
        type: NeedsType.DISADVANTAGE_TAB,
        payload: tabName
    }
}

export const filterFunct = (func) => {
    return {
        type: NeedsType.FILTER,
        payload: func
    }
}