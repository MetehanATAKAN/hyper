import { SurveyTypes } from "./constant"


const initialState = {
    surveyQuestionId : null,
    surveyId:null,
    saveOrUpdate:''
}

const Survey = (state = initialState, action) => {
    switch (action.type) {
        case SurveyTypes.QUESTION_ID:
            return {
                ...state, surveyQuestionId: action.payload
            }
        case SurveyTypes.SURVEY_ID:
            return {
                ...state, surveyId: action.payload
            }
        case SurveyTypes.SAVE_OR_UPDATE:
            return {
                ...state, saveOrUpdate: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default Survey