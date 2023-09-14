import { useTranslation } from "react-i18next";


 export const CalendarMainPageSteps = [
    // const { t } = useTranslation();
    {
        element: ".step1",
        intro: 'Create User A new Activity where they can create and create Activity Visit the activity popup.'
    },
    {
        element: ".fc-prev-button",
        intro: "World step"
    },
    {
        element: ".fc-next-button",
        intro: "World step"
    },
    {
        element: ".fc-dayGridMonth-button",
        intro: "World step"
    },
    {
        element: ".fc-timeGridWeek-button",
        intro: "World step"
    },
    {
        element: ".fc-timeGridDay-button",
        intro: "World step"
    },
    {
        element: ".fc-listMonth-button ",
        intro: "World step"
    },
    {
        element: ".step8",
        intro: "World step"
    },
]


export const productPriorityAllocationsSteps = [
    {
        element: ".hello",
        intro: <div style={{color:'red'}}>Hello step</div>
    },
    {
        element: ".world",
        intro: "World step"
    },
]

export const editEventModalSteps =[
    {
        element: ".eventName",
        intro: <div style={{color:'red'}}>Event adını değiştirebilirsiniz</div>
    },
    {
        element: ".activityDate",
        intro: "Tarihh"
    },
    {
        element: ".reportButtonSteps",
        intro: "Report button"
    },
    {
        element: ".splitButtonSteps",
        intro: "Split button"
    },
]

export const steps2 = () => {
    return [
        {
            selector: '.step4',
            content: `metehan`
        },
        {
            selector: '.step5',
            content: `atakan`
        },
        {
            selector: '.step6',
            content: `mervee`
        },
    ]
}
