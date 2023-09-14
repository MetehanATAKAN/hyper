import { SurveyTypes } from "./constant";

export const questionId = (id) => {
    return {
        type: SurveyTypes.QUESTION_ID,
        payload: id,
    };
};

export const surveyId = (id) => {
    return {
        type: SurveyTypes.SURVEY_ID,
        payload: id,
    };
};

export const saveOrUpdate = (name) => {
    return {
        type: SurveyTypes.SAVE_OR_UPDATE,
        payload: name,
    };
};