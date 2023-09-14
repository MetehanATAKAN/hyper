import { MicroTargetTypes } from './constant';


export const radioValueMicroTarget = (value) => {

    return{
        type:MicroTargetTypes.RADIO_VALUE,
        payload:value
    }
}

