import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarDragDropTable1 from './Calendar/CalendarDragDropTable1';
import CalendarDragDropTable2 from './Calendar/CalendarDragDropTable2';
import CalendarDragDropTable3 from './Calendar/CalendarDragDropTable3';

const Boxes = ({
    month,
    clickRow1, 
    clickRow2, 
    clickRow3, 
    clickRow4, 
    clickRow5, 
    clickRow6,
    activeDraggable1,
    activeDraggable2,
    activeDraggable3,
    activeDraggable4,
    activeDraggable5,
    activeDraggable6,
    calendarDatasx
}) => {
   
    const {t}=useTranslation();
    // const [calendarDatas, setCalendarDatas] = useState([]);
    // const [frequency, setFrequency] = useState([]);
    // const calendarDatas = useSelector((state) => state.VisitMix.visitMixCalendarData);
    const calendarDatas = JSON.parse(localStorage.getItem('calendarDatas'));
    const frequency = JSON.parse(localStorage.getItem('monthFrequency'));
  
    const [isProduct, setIsProduct] = useState(true);
    //jan rows
    const [jan1, setJan1] = useState([]);
    const [jan2, setJan2] = useState([]);
    const [jan3, setJan3] = useState([]);
    const [jan4, setJan4] = useState([]);
    const [jan5, setJan5] = useState([]);
    const [jan6, setJan6] = useState([]);
    //feb rows
    const [feb1, setFeb1] = useState([]);
    const [feb2, setFeb2] = useState([]);
    const [feb3, setFeb3] = useState([]);
    const [feb4, setFeb4] = useState([]);
    const [feb5, setFeb5] = useState([]);
    const [feb6, setFeb6] = useState([]);
    //mar rows
    const [mar1, setMar1] = useState([]);
    const [mar2, setMar2] = useState([]);
    const [mar3, setMar3] = useState([]);
    const [mar4, setMar4] = useState([]);
    const [mar5, setMar5] = useState([]);
    const [mar6, setMar6] = useState([]);
    //apr rows
    const [apr1, setApr1] = useState([]);
    const [apr2, setApr2] = useState([]);
    const [apr3, setApr3] = useState([]);
    const [apr4, setApr4] = useState([]);
    const [apr5, setApr5] = useState([]);
    const [apr6, setApr6] = useState([]);
    //may rows
    const [may1, setMay1] = useState([]);
    const [may2, setMay2] = useState([]);
    const [may3, setMay3] = useState([]);
    const [may4, setMay4] = useState([]);
    const [may5, setMay5] = useState([]);
    const [may6, setMay6] = useState([]);
    //jun rows
    const [jun1, setJun1] = useState([]);
    const [jun2, setJun2] = useState([]);
    const [jun3, setJun3] = useState([]);
    const [jun4, setJun4] = useState([]);
    const [jun5, setJun5] = useState([]);
    const [jun6, setJun6] = useState([]);
    //jul rows
    const [jul1, setJul1] = useState([]);
    const [jul2, setJul2] = useState([]);
    const [jul3, setJul3] = useState([]);
    const [jul4, setJul4] = useState([]);
    const [jul5, setJul5] = useState([]);
    const [jul6, setJul6] = useState([]);
    //aug rows
    const [aug1, setAug1] = useState([]);
    const [aug2, setAug2] = useState([]);
    const [aug3, setAug3] = useState([]);
    const [aug4, setAug4] = useState([]);
    const [aug5, setAug5] = useState([]);
    const [aug6, setAug6] = useState([]);
    //sep rows
    const [sep1, setSep1] = useState([]);
    const [sep2, setSep2] = useState([]);
    const [sep3, setSep3] = useState([]);
    const [sep4, setSep4] = useState([]);
    const [sep5, setSep5] = useState([]);
    const [sep6, setSep6] = useState([]);
    //oct rows
    const [oct1, setOct1] = useState([]);
    const [oct2, setOct2] = useState([]);
    const [oct3, setOct3] = useState([]);
    const [oct4, setOct4] = useState([]);
    const [oct5, setOct5] = useState([]);
    const [oct6, setOct6] = useState([]);
    //nov rows
    const [nov1, setNov1] = useState([]);
    const [nov2, setNov2] = useState([]);
    const [nov3, setNov3] = useState([]);
    const [nov4, setNov4] = useState([]);
    const [nov5, setNov5] = useState([]);
    const [nov6, setNov6] = useState([]);
    //dec rows
    const [dec1, setDec1] = useState([]);
    const [dec2, setDec2] = useState([]);
    const [dec3, setDec3] = useState([]);
    const [dec4, setDec4] = useState([]);
    const [dec5, setDec5] = useState([]);
    const [dec6, setDec6] = useState([]);

const [count, setcount] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calendarMonthInDatas= async()=>{
        const janData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const febData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const marData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const aprData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const mayData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const junData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const julData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const augData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const sepData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const octData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const novData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        const decData=[
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ],
            [
                [],[],[],[]
            ]
        ]
        if(calendarDatas!==null){
            calendarDatas.map((data)=>(
                //january data
                data.month===1
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?janData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?janData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?janData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?janData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?janData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?janData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?janData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?janData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?janData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?janData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?janData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?janData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?janData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?janData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?janData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?janData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?janData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?janData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?janData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?janData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?janData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?janData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?janData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?janData[5][3].push(data)
                        :null
                :null
                //february data
                :data.month===2
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?febData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?febData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?febData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?febData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?febData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?febData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?febData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?febData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?febData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?febData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?febData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?febData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?febData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?febData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?febData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?febData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?febData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?febData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?febData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?febData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?febData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?febData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?febData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?febData[5][3].push(data)
                        :null
                :null
                //march data
                :data.month===3
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?marData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?marData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?marData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?marData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?marData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?marData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?marData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?marData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?marData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?marData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?marData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?marData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?marData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?marData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?marData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?marData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?marData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?marData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?marData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?marData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?marData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?marData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?marData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?marData[5][3].push(data)
                        :null
                :null
                 //april data
                 :data.month===4
                 ?data.positionNumber===1
                     ?data.visitNumber===1 && data.isPromo===true
                         ?aprData[0][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?aprData[0][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?aprData[0][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?aprData[0][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?aprData[3][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?aprData[3][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?aprData[3][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?aprData[3][3].push(data)
                         :null
                 :data.positionNumber===2
                     ?data.visitNumber===1 && data.isPromo===true
                         ?aprData[1][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?aprData[1][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?aprData[1][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?aprData[1][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?aprData[4][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?aprData[4][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?aprData[4][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?aprData[4][3].push(data)
                         :null
                 :data.positionNumber===3
                     ?data.visitNumber===1 && data.isPromo===true
                         ?aprData[2][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?aprData[2][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?aprData[2][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?aprData[2][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?aprData[5][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?aprData[5][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?aprData[5][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?aprData[5][3].push(data)
                         :null
                 :null
                  //may data
                :data.month===5
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?mayData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?mayData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?mayData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?mayData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?mayData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?mayData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?mayData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?mayData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?mayData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?mayData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?mayData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?mayData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?mayData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?mayData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?mayData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?mayData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?mayData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?mayData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?mayData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?mayData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?mayData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?mayData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?mayData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?mayData[5][3].push(data)
                        :null
                :null
                 //june data
                 :data.month===6
                 ?data.positionNumber===1
                     ?data.visitNumber===1 && data.isPromo===true
                         ?junData[0][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?junData[0][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?junData[0][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?junData[0][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?junData[3][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?junData[3][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?junData[3][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?junData[3][3].push(data)
                         :null
                 :data.positionNumber===2
                     ?data.visitNumber===1 && data.isPromo===true
                         ?junData[1][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?junData[1][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?junData[1][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?junData[1][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?junData[4][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?junData[4][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?junData[4][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?junData[4][3].push(data)
                         :null
                 :data.positionNumber===3
                     ?data.visitNumber===1 && data.isPromo===true
                         ?junData[2][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?junData[2][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?junData[2][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?junData[2][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?junData[5][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?junData[5][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?junData[5][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?junData[5][3].push(data)
                         :null
                 :null
                  //july data
                :data.month===7
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?julData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?julData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?julData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?julData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?julData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?julData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?julData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?julData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?julData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?julData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?julData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?julData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?julData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?julData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?julData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?julData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?julData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?julData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?julData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?julData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?julData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?julData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?julData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?julData[5][3].push(data)
                        :null
                :null
                 //august data
                 :data.month===8
                 ?data.positionNumber===1
                     ?data.visitNumber===1 && data.isPromo===true
                         ?augData[0][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?augData[0][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?augData[0][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?augData[0][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?augData[3][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?augData[3][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?augData[3][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?augData[3][3].push(data)
                         :null
                 :data.positionNumber===2
                     ?data.visitNumber===1 && data.isPromo===true
                         ?augData[1][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?augData[1][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?augData[1][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?augData[1][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?augData[4][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?augData[4][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?augData[4][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?augData[4][3].push(data)
                         :null
                 :data.positionNumber===3
                     ?data.visitNumber===1 && data.isPromo===true
                         ?augData[2][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?augData[2][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?augData[2][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?augData[2][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?augData[5][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?augData[5][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?augData[5][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?augData[5][3].push(data)
                         :null
                 :null
                  //september data
                :data.month===9
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?sepData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?sepData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?sepData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?sepData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?sepData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?sepData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?sepData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?sepData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?sepData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?sepData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?sepData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?sepData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?sepData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?sepData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?sepData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?sepData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?sepData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?sepData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?sepData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?sepData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?sepData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?sepData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?sepData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?sepData[5][3].push(data)
                        :null
                :null
                 //octember data
                 :data.month===10
                 ?data.positionNumber===1
                     ?data.visitNumber===1 && data.isPromo===true
                         ?octData[0][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?octData[0][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?octData[0][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?octData[0][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?octData[3][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?octData[3][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?octData[3][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?octData[3][3].push(data)
                         :null
                 :data.positionNumber===2
                     ?data.visitNumber===1 && data.isPromo===true
                         ?octData[1][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?octData[1][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?octData[1][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?octData[1][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?octData[4][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?octData[4][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?octData[4][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?octData[4][3].push(data)
                         :null
                 :data.positionNumber===3
                     ?data.visitNumber===1 && data.isPromo===true
                         ?octData[2][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?octData[2][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?octData[2][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?octData[2][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?octData[5][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?octData[5][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?octData[5][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?octData[5][3].push(data)
                         :null
                 :null
                  //november data
                :data.month===11
                ?data.positionNumber===1
                    ?data.visitNumber===1 && data.isPromo===true
                        ?novData[0][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?novData[0][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?novData[0][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?novData[0][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?novData[3][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?novData[3][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?novData[3][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?novData[3][3].push(data)
                        :null
                :data.positionNumber===2
                    ?data.visitNumber===1 && data.isPromo===true
                        ?novData[1][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?novData[1][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?novData[1][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?novData[1][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?novData[4][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?novData[4][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?novData[4][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?novData[4][3].push(data)
                        :null
                :data.positionNumber===3
                    ?data.visitNumber===1 && data.isPromo===true
                        ?novData[2][0].push(data)
                        :data.visitNumber===2 && data.isPromo===true
                        ?novData[2][1].push(data)
                        :data.visitNumber===3 && data.isPromo===true
                        ?novData[2][2].push(data)
                        :data.visitNumber===4 && data.isPromo===true
                        ?novData[2][3].push(data)
                        :data.visitNumber===1 && data.isPromo===false
                        ?novData[5][0].push(data)
                        :data.visitNumber===2 && data.isPromo===false
                        ?novData[5][1].push(data)
                        :data.visitNumber===3 && data.isPromo===false
                        ?novData[5][2].push(data)
                        :data.visitNumber===4 && data.isPromo===false
                        ?novData[5][3].push(data)
                        :null
                :null
                 //december data
                 :data.month===12
                 ?data.positionNumber===1
                     ?data.visitNumber===1 && data.isPromo===true
                         ?decData[0][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?decData[0][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?decData[0][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?decData[0][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?decData[3][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?decData[3][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?decData[3][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?decData[3][3].push(data)
                         :null
                 :data.positionNumber===2
                     ?data.visitNumber===1 && data.isPromo===true
                         ?decData[1][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?decData[1][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?decData[1][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?decData[1][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?decData[4][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?decData[4][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?decData[4][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?decData[4][3].push(data)
                         :null
                 :data.positionNumber===3
                     ?data.visitNumber===1 && data.isPromo===true
                         ?decData[2][0].push(data)
                         :data.visitNumber===2 && data.isPromo===true
                         ?decData[2][1].push(data)
                         :data.visitNumber===3 && data.isPromo===true
                         ?decData[2][2].push(data)
                         :data.visitNumber===4 && data.isPromo===true
                         ?decData[2][3].push(data)
                         :data.visitNumber===1 && data.isPromo===false
                         ?decData[5][0].push(data)
                         :data.visitNumber===2 && data.isPromo===false
                         ?decData[5][1].push(data)
                         :data.visitNumber===3 && data.isPromo===false
                         ?decData[5][2].push(data)
                         :data.visitNumber===4 && data.isPromo===false
                         ?decData[5][3].push(data)
                         :null
                 :null
                :null
            )) 
            if(count<1){
                //jandata
                let janData1=[];
                let janData2=[];
                let janData3=[];
                let janData4=[];
                let janData5=[];
                let janData6=[];
        
                janData[0].map((data)=>(
                    janData1.push(data[0])
                ))
                janData[1].map((data)=>(
                    janData2.push(data[0])
                ))
                janData[2].map((data)=>(
                    janData3.push(data[0])
                ))
                janData[3].map((data)=>(
                    janData4.push(data[0])
                ))
                janData[4].map((data)=>(
                    janData5.push(data[0])
                ))
                janData[5].map((data)=>(
                    janData6.push(data[0])
                ))
                setJan1(janData1); 
                setJan2(janData2);
                setJan3(janData3);
                setJan4(janData4);
                setJan5(janData5);
                setJan6(janData6);
                //fabdata
                let febData1=[];
                let febData2=[];
                let febData3=[];
                let febData4=[];
                let febData5=[];
                let febData6=[];
                febData[0].map((data)=>(
                    febData1.push(data[0])
                ))
                febData[1].map((data)=>(
                    febData2.push(data[0])
                ))
                febData[2].map((data)=>(
                    febData3.push(data[0])
                ))
                febData[3].map((data)=>(
                    febData4.push(data[0])
                ))
                febData[4].map((data)=>(
                    febData5.push(data[0])
                ))
                febData[5].map((data)=>(
                    febData6.push(data[0])
                ))
                setFeb1(febData1);
                setFeb2(febData2);
                setFeb3(febData3);
                setFeb4(febData4);
                setFeb5(febData5);
                setFeb6(febData6);
                //mardata
                let marData1=[];
                let marData2=[];
                let marData3=[];
                let marData4=[];
                let marData5=[];
                let marData6=[];
                marData[0].map((data)=>(
                    marData1.push(data[0])
                ))
                marData[1].map((data)=>(
                    marData2.push(data[0])
                ))
                marData[2].map((data)=>(
                    marData3.push(data[0])
                ))
                marData[3].map((data)=>(
                    marData4.push(data[0])
                ))
                marData[4].map((data)=>(
                    marData5.push(data[0])
                ))
                marData[5].map((data)=>(
                    marData6.push(data[0])
                ))
                setMar1(marData1);
                setMar2(marData2);
                setMar3(marData3);
                setMar4(marData4);
                setMar5(marData5);
                setMar6(marData6);
                //aprdata
                let aprData1=[];
                let aprData2=[];
                let aprData3=[];
                let aprData4=[];
                let aprData5=[];
                let aprData6=[];
                aprData[0].map((data)=>(
                    aprData1.push(data[0])
                ))
                aprData[1].map((data)=>(
                    aprData2.push(data[0])
                ))
                aprData[2].map((data)=>(
                    aprData3.push(data[0])
                ))
                aprData[3].map((data)=>(
                    aprData4.push(data[0])
                ))
                aprData[4].map((data)=>(
                    aprData5.push(data[0])
                ))
                aprData[5].map((data)=>(
                    aprData6.push(data[0])
                ))
                setApr1(aprData1);
                setApr2(aprData2);
                setApr3(aprData3);
                setApr4(aprData4);
                setApr5(aprData5);
                setApr6(aprData6);
                 //maydata
                 let mayData1=[];
                 let mayData2=[];
                 let mayData3=[];
                 let mayData4=[];
                 let mayData5=[];
                 let mayData6=[];
                 mayData[0].map((data)=>(
                    mayData1.push(data[0])
                 ))
                 mayData[1].map((data)=>(
                    mayData2.push(data[0])
                 ))
                 mayData[2].map((data)=>(
                    mayData3.push(data[0])
                 ))
                 mayData[3].map((data)=>(
                    mayData4.push(data[0])
                 ))
                 mayData[4].map((data)=>(
                    mayData5.push(data[0])
                 ))
                 mayData[5].map((data)=>(
                    mayData6.push(data[0])
                 ))
                 setMay1(mayData1);
                 setMay2(mayData2);
                 setMay3(mayData3);
                 setMay4(mayData4);
                 setMay5(mayData5);
                 setMay6(mayData6);
                 //jundata
                 let junData1=[];
                 let junData2=[];
                 let junData3=[];
                 let junData4=[];
                 let junData5=[];
                 let junData6=[];
                 junData[0].map((data)=>(
                    junData1.push(data[0])
                 ))
                 junData[1].map((data)=>(
                    junData2.push(data[0])
                 ))
                 junData[2].map((data)=>(
                    junData3.push(data[0])
                 ))
                 junData[3].map((data)=>(
                    junData4.push(data[0])
                 ))
                 junData[4].map((data)=>(
                    junData5.push(data[0])
                 ))
                 junData[5].map((data)=>(
                    junData6.push(data[0])
                 ))
                 setJun1(junData1);
                 setJun2(junData2);
                 setJun3(junData3);
                 setJun4(junData4);
                 setJun5(junData5);
                 setJun6(junData6);
                 //juldata
                 let julData1=[];
                 let julData2=[];
                 let julData3=[];
                 let julData4=[];
                 let julData5=[];
                 let julData6=[];
                 julData[0].map((data)=>(
                    julData1.push(data[0])
                 ))
                 julData[1].map((data)=>(
                    julData2.push(data[0])
                 ))
                 julData[2].map((data)=>(
                    julData3.push(data[0])
                 ))
                 julData[3].map((data)=>(
                    julData4.push(data[0])
                 ))
                 julData[4].map((data)=>(
                    julData5.push(data[0])
                 ))
                 julData[5].map((data)=>(
                    julData6.push(data[0])
                 ))
                 setJul1(julData1);
                 setJul2(julData2);
                 setJul3(julData3);
                 setJul4(julData4);
                 setJul5(julData5);
                 setJul6(julData6);
                 //augdata
                 let augData1=[];
                 let augData2=[];
                 let augData3=[];
                 let augData4=[];
                 let augData5=[];
                 let augData6=[];
                 augData[0].map((data)=>(
                    augData1.push(data[0])
                 ))
                 augData[1].map((data)=>(
                    augData2.push(data[0])
                 ))
                 augData[2].map((data)=>(
                    augData3.push(data[0])
                 ))
                 augData[3].map((data)=>(
                    augData4.push(data[0])
                 ))
                 augData[4].map((data)=>(
                    augData5.push(data[0])
                 ))
                 augData[5].map((data)=>(
                    augData6.push(data[0])
                 ))
                 setAug1(augData1);
                 setAug2(augData2);
                 setAug3(augData3);
                 setAug4(augData4);
                 setAug5(augData5);
                 setAug6(augData6);
                //sepdata
                let sepData1=[];
                let sepData2=[];
                let sepData3=[];
                let sepData4=[];
                let sepData5=[];
                let sepData6=[];
                sepData[0].map((data)=>(
                    sepData1.push(data[0])
                ))
                sepData[1].map((data)=>(
                    sepData2.push(data[0])
                ))
                sepData[2].map((data)=>(
                    sepData3.push(data[0])
                ))
                sepData[3].map((data)=>(
                    sepData4.push(data[0])
                ))
                sepData[4].map((data)=>(
                    sepData5.push(data[0])
                ))
                sepData[5].map((data)=>(
                    sepData6.push(data[0])
                ))
                setSep1(sepData1);
                setSep2(sepData2);
                setSep3(sepData3);
                setSep4(sepData4);
                setSep5(sepData5);
                setSep6(sepData6);
                //octdata
                let octData1=[];
                let octData2=[];
                let octData3=[];
                let octData4=[];
                let octData5=[];
                let octData6=[];
                octData[0].map((data)=>(
                    octData1.push(data[0])
                ))
                octData[1].map((data)=>(
                    octData2.push(data[0])
                ))
                octData[2].map((data)=>(
                    octData3.push(data[0])
                ))
                octData[3].map((data)=>(
                    octData4.push(data[0])
                ))
                octData[4].map((data)=>(
                    octData5.push(data[0])
                ))
                octData[5].map((data)=>(
                    octData6.push(data[0])
                ))
                setOct1(octData1);
                setOct2(octData2);
                setOct3(octData3);
                setOct4(octData4);
                setOct5(octData5);
                setOct6(octData6);
                //novdata
                let novData1=[];
                let novData2=[];
                let novData3=[];
                let novData4=[];
                let novData5=[];
                let novData6=[];
                novData[0].map((data)=>(
                    novData1.push(data[0])
                ))
                novData[1].map((data)=>(
                    novData2.push(data[0])
                ))
                novData[2].map((data)=>(
                    novData3.push(data[0])
                ))
                novData[3].map((data)=>(
                    novData4.push(data[0])
                ))
                novData[4].map((data)=>(
                    novData5.push(data[0])
                ))
                novData[5].map((data)=>(
                    novData6.push(data[0])
                ))
                setNov1(novData1);
                setNov2(novData2);
                setNov3(novData3);
                setNov4(novData4);
                setNov5(novData5);
                setNov6(novData6);
                //decdata
                let decData1=[];
                let decData2=[];
                let decData3=[];
                let decData4=[];
                let decData5=[];
                let decData6=[];
                decData[0].map((data)=>(
                    decData1.push(data[0])
                ))
                decData[1].map((data)=>(
                    decData2.push(data[0])
                ))
                decData[2].map((data)=>(
                    decData3.push(data[0])
                ))
                decData[3].map((data)=>(
                    decData4.push(data[0])
                ))
                decData[4].map((data)=>(
                    decData5.push(data[0])
                ))
                decData[5].map((data)=>(
                    decData6.push(data[0])
                ))
                setDec1(decData1);
                setDec2(decData2);
                setDec3(decData3);
                setDec4(decData4);
                setDec5(decData5);
                setDec6(decData6);
                
                setcount((count)=>count+1);           
            } 
        }
        else {
            setIsProduct(false);
        }     
    }
    //const [loop, setLoop] = useState(0);
    useEffect(() => {
        if(calendarDatas!==null ){
            calendarMonthInDatas()
            //setLoop(1);
        }
    },[calendarDatas, calendarMonthInDatas])
   
  

    const handleDragEnd1 = (e) => {
        
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan1'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb1') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar1') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr1') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may1') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun1') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul1') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug1') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep1') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct1') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov1') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec1') {
            monthFrq=frequency[11].Frequency;
        }

        let tempData = Array.from(
            e.source.droppableId==='jan1'
            ?jan1
            :e.source.droppableId==='feb1'
            ?feb1
            :e.source.droppableId==='mar1'
            ?mar1
            :e.source.droppableId==="apr1"
            ?apr1
            :e.source.droppableId==='may1'
            ?may1
            :e.source.droppableId==='jun1'
            ?jun1
            :e.source.droppableId==='jul1'
            ?jul1
            :e.source.droppableId==='aug1'
            ?aug1
            :e.source.droppableId==='sep1'
            ?sep1
            :e.source.droppableId==='oct1'
            ?oct1
            :e.source.droppableId==='nov1'
            ?nov1
            :e.source.droppableId==='dec1'
            ?dec1
            :null // diğer aylar için  buradan devam edeceksin
        );

        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }

        if(e.source.droppableId==='jan1'){
            setJan1(tempData)
        }
        else if(e.source.droppableId==='feb1'){
            setFeb1(tempData)
        }
        else if(e.source.droppableId==='mar1'){
            setMar1(tempData)
        }
        else if(e.source.droppableId==='apr1'){
            setApr1(tempData)
        }
        else if(e.source.droppableId==='may1'){
            setMay1(tempData)
        }
        else if(e.source.droppableId==='jun1'){
            setJun1(tempData)
        }
        else if(e.source.droppableId==='jul1'){
            setJul1(tempData)
        }
        else if(e.source.droppableId==='aug1'){
            setAug1(tempData)
        }
        else if(e.source.droppableId==='sep1'){
            setSep1(tempData)
        }
        else if(e.source.droppableId==='oct1'){
            setOct1(tempData)
        }
        else if(e.source.droppableId==='nov1'){
            setNov1(tempData)
        }
        else if(e.source.droppableId==='dec1'){
            setDec1(tempData)
        }
    };
   
    const handleDragEnd2 = (e) => { 
        
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan2'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb2') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar2') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr2') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may2') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun2') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul2') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug2') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep2') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct2') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov2') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec2') {
            monthFrq=frequency[11].Frequency;
        }

        let tempData = Array.from(
            e.source.droppableId==='jan2'
            ?jan2
            :e.source.droppableId==='feb2'
            ?feb2
            :e.source.droppableId==='mar2'
            ?mar2
            :e.source.droppableId==='apr2'
            ?apr2
            :e.source.droppableId==='may2'
            ?may2
            :e.source.droppableId==='jun2'
            ?jun2
            :e.source.droppableId==='jul2'
            ?jul2
            :e.source.droppableId==='aug2'
            ?aug2
            :e.source.droppableId==='sep2'
            ?sep2
            :e.source.droppableId==='oct2'
            ?oct2
            :e.source.droppableId==='nov2'
            ?nov2
            :e.source.droppableId==='dec2'
            ?dec2
            :null////buradan diğer aylar için devam edeceksin
        );
        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }

        if(e.source.droppableId==='jan2'){
            setJan2(tempData)
        }
        else if(e.source.droppableId==='feb2'){
            setFeb2(tempData)
        }
        else if(e.source.droppableId==='mar2'){
            setMar2(tempData)
        }
        else if(e.source.droppableId==='apr2'){
            setApr2(tempData)
        }
        else if(e.source.droppableId==='jun2'){
            setJun2(tempData)
        }
        else if(e.source.droppableId==='jun2'){
            setJun2(tempData)
        }
        else if(e.source.droppableId==='jul2'){
            setJul2(tempData)
        }
        else if(e.source.droppableId==='aug2'){
            setAug2(tempData)
        }
        else if(e.source.droppableId==='sep2'){
            setSep2(tempData)
        }
        else if(e.source.droppableId==='oct2'){
            setOct2(tempData)
        }
        else if(e.source.droppableId==='nov2'){
            setNov2(tempData)
        }
        else if(e.source.droppableId==='dec2'){
            setDec2(tempData)
        }
    };

    const handleDragEnd3 = (e) => {
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan3'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb3') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar3') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr3') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may3') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun3') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul3') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug3') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep3') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct3') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov3') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec3') {
            monthFrq=frequency[11].Frequency;
        }

        
        let tempData = Array.from(
            e.source.droppableId==='jan3'
            ?jan3
            :e.source.droppableId==='feb3'
            ?feb3
            :e.source.droppableId==='mar3'
            ?mar3
            :e.source.droppableId==='apr3'
            ?apr3
            :e.source.droppableId==='may3'
            ?may3
            :e.source.droppableId==='jun3'
            ?jun3
            :e.source.droppableId==='jul3'
            ?jul3
            :e.source.droppableId==='aug3'
            ?aug3
            :e.source.droppableId==='sep3'
            ?sep3
            :e.source.droppableId==='oct3'
            ?oct3
            :e.source.droppableId==='nov3'
            ?nov3
            :e.source.droppableId==='dec3'
            ?dec3
            :null//diğer aylara buradan devam edeceksin
        );
        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }

        if(e.source.droppableId==='jan3'){
            setJan3(tempData)
        }
        else if(e.source.droppableId==='feb3'){
            setFeb3(tempData)
        }
        else if(e.source.droppableId==='mar3'){
            setMar3(tempData)
        }
        else if(e.source.droppableId==='apr3'){
            setApr3(tempData)
        }
        else if(e.source.droppableId==='may3'){
            setMay3(tempData)
        }
        else if(e.source.droppableId==='jun3'){
            setJun3(tempData)
        }
        else if(e.source.droppableId==='jul3'){
            setJul3(tempData)
        }
        else if(e.source.droppableId==='aug3'){
            setAug3(tempData)
        }
        else if(e.source.droppableId==='sep3'){
            setSep3(tempData)
        }
        else if(e.source.droppableId==='oct3'){
            setOct3(tempData)
        }
        else if(e.source.droppableId==='nov3'){
            setNov3(tempData)
        }
        else if(e.source.droppableId==='dec3'){
            setDec3(tempData)
        }
    };

    const handleDragEnd4 = (e) => {
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan4'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb4') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar4') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr4') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may4') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun4') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul4') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug4') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep4') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct4') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov4') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec4') {
            monthFrq=frequency[11].Frequency;
        }
      
        let tempData = Array.from(
            e.source.droppableId==='jan4'
            ?jan4
            :e.source.droppableId==='feb4'
            ?feb4
            :e.source.droppableId==='mar4'
            ?mar4
            :e.source.droppableId==='apr4'
            ?apr4
            :e.source.droppableId==='may4'
            ?may4
            :e.source.droppableId==='jun4'
            ?jun4
            :e.source.droppableId==='jul4'
            ?jul4
            :e.source.droppableId==='aug4'
            ?aug4
            :e.source.droppableId==='sep4'
            ?sep4
            :e.source.droppableId==='oct4'
            ?oct4
            :e.source.droppableId==='nov4'
            ?nov4
            :e.source.droppableId==='dec4'
            ?dec4
            :null//buradan diğer aylar için devam edeceksin
        );
        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }

        if(e.source.droppableId==='jan4'){
            setJan4(tempData)
        }
        else if(e.source.droppableId==='feb4'){
            setFeb4(tempData)
        }
        else if(e.source.droppableId==='mar4'){
            setMar4(tempData)
        }
        else if(e.source.droppableId==='apr4'){
            setApr4(tempData)
        }
        else if(e.source.droppableId==='may4'){
            setMay4(tempData)
        }
        else if(e.source.droppableId==='jun4'){
            setJun4(tempData)
        }
        else if(e.source.droppableId==='jul4'){
            setJul4(tempData)
        }
        else if(e.source.droppableId==='aug4'){
            setAug4(tempData)
        }
        else if(e.source.droppableId==='sep4'){
            setSep4(tempData)
        }
        else if(e.source.droppableId==='oct4'){
            setOct4(tempData)
        }
        else if(e.source.droppableId==='nov4'){
            setNov4(tempData)
        }
        else if(e.source.droppableId==='dec4'){
            setDec4(tempData)
        }
    };

    const handleDragEnd5 = (e) => {
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan5'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb5') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar5') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr5') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may5') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun5') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul5') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug5') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep5') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct5') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov5') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec5') {
            monthFrq=frequency[11].Frequency;
        }
        
        let tempData = Array.from(
            e.source.droppableId==='jan5'
            ?jan5
            :e.source.droppableId==='feb5'
            ?feb5
            :e.source.droppableId==='mar5'
            ?mar5
            :e.source.droppableId==='apr5'
            ?apr5
            :e.source.droppableId==='may5'
            ?may5
            :e.source.droppableId==='jun5'
            ?jun5
            :e.source.droppableId==='jul5'
            ?jul5
            :e.source.droppableId==='aug5'
            ?aug5
            :e.source.droppableId==='sep5'
            ?sep5
            :e.source.droppableId==='oct5'
            ?oct5
            :e.source.droppableId==='nov5'
            ?nov5
            :e.source.droppableId==='dec5'
            ?dec5
            :null//buradan diğer aylar için devam edeceksin
        );
        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }

        if(e.source.droppableId==='jan5'){
            setJan5(tempData)
        }
        else if(e.source.droppableId==='feb5'){
            setFeb5(tempData)
        }
        else if(e.source.droppableId==='mar5'){
            setMar5(tempData)
        }
        else if(e.source.droppableId==='apr5'){
            setApr5(tempData)
        }
        else if(e.source.droppableId==='may5'){
            setMay5(tempData)
        }
        else if(e.source.droppableId==='jun5'){
            setJun5(tempData)
        }
        else if(e.source.droppableId==='jul5'){
            setJul5(tempData)
        }
        else if(e.source.droppableId==='aug5'){
            setAug5(tempData)
        }
        else if(e.source.droppableId==='sep5'){
            setSep5(tempData)
        }
        else if(e.source.droppableId==='oct5'){
            setOct5(tempData)
        }
        else if(e.source.droppableId==='nov5'){
            setNov5(tempData)
        }
        else if(e.source.droppableId==='dec5'){
            setDec5(tempData)
        }
    };

    const handleDragEnd6 = (e) => {
        let monthFrq=null;
        if (!e.destination) return;
        if(e.destination.droppableId ==='jan6'){
            monthFrq=frequency[0].Frequency;
        }
        else if(e.destination.droppableId === 'feb6') {
            monthFrq=frequency[1].Frequency;
        }
        else if(e.destination.droppableId === 'mar6') {
            monthFrq=frequency[2].Frequency;
        }
        else if(e.destination.droppableId === 'apr6') {
            monthFrq=frequency[3].Frequency;
        }
        else if(e.destination.droppableId === 'may6') {
            monthFrq=frequency[4].Frequency;
        }
        else if(e.destination.droppableId === 'jun6') {
            monthFrq=frequency[5].Frequency;
        }
        else if(e.destination.droppableId === 'jul6') {
            monthFrq=frequency[6].Frequency;
        }
        else if(e.destination.droppableId === 'aug6') {
            monthFrq=frequency[7].Frequency;
        }
        else if(e.destination.droppableId === 'sep6') {
            monthFrq=frequency[8].Frequency;
        }
        else if(e.destination.droppableId === 'oct6') {
            monthFrq=frequency[9].Frequency;
        }
        else if(e.destination.droppableId === 'nov6') {
            monthFrq=frequency[10].Frequency;
        }
        else if(e.destination.droppableId === 'dec6') {
            monthFrq=frequency[11].Frequency;
        }

        
        let tempData = Array.from(
            e.source.droppableId==='jan6'
            ?jan6
            :e.source.droppableId==='feb6'
            ?feb6
            :e.source.droppableId==='mar6'
            ?mar6
            :e.source.droppableId==='apr6'
            ?apr6
            :e.source.droppableId==='may6'
            ?may6
            :e.source.droppableId==='jun6'
            ?jun6
            :e.source.droppableId==='jul6'
            ?jul6
            :e.source.droppableId==='aug6'
            ?aug6
            :e.source.droppableId==='sep6'
            ?sep6
            :e.source.droppableId==='oct6'
            ?oct6
            :e.source.droppableId==='nov6'
            ?nov6
            :e.source.droppableId==='dec6'
            ?dec6
            :null//buradan diğer aylar için devam edeceksin
        );
        if(monthFrq === 2) {
            if(e.destination.index === 2 || e.destination.index === 3) {
            }
            else {
                let [source_data] = tempData.splice(e.source.index, 1);
                tempData.splice(e.destination.index, 0, source_data);
            }
        }
        else if (monthFrq === 4) {
            let [source_data] = tempData.splice(e.source.index, 1);
            tempData.splice(e.destination.index, 0, source_data);
        }
        if(e.source.droppableId==='jan6'){
            setJan6(tempData)
        }
        else if(e.source.droppableId==='feb6'){
            setFeb6(tempData)
        }
        else if(e.source.droppableId==='mar6'){
            setMar6(tempData)
        }
        else if(e.source.droppableId==='apr6'){
            setApr6(tempData)
        }
        else if(e.source.droppableId==='may6'){
            setMay6(tempData)
        }
        else if(e.source.droppableId==='jun6'){
            setJun6(tempData)
        }
        else if(e.source.droppableId==='jul6'){
            setJul6(tempData)
        }
        else if(e.source.droppableId==='aug6'){
            setAug6(tempData)
        }
        else if(e.source.droppableId==='sep6'){
            setSep6(tempData)
        }
        else if(e.source.droppableId==='oct6'){
            setOct6(tempData)
        }
        else if(e.source.droppableId==='nov6'){
            setNov6(tempData)
        }
        else if(e.source.droppableId==='dec6'){
            setDec6(tempData)
        }
    };

    const isEnableDraggable = () => {
        if(activeDraggable1 === true){
            return activeDraggable1;
        }else{
            return !activeDraggable1;
        }
    }
    const janxx=[{name:"metehan"},{name:"metehan"},{name:"metehan"},{name:"metehan"},{name:"metehan"},{name:"metehan"}];

        
    return (
        <div className='box-container'>
            {
                month===t('JAN')
                ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'jan1'} 
                    line={'line1'} 
                    month1={jan1} 
                    month2={jan2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[0].Frequency}
                />
                    
            <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'jan2'} 
                    line={'line2'} 
                    month1={jan2} 
                    month2={jan3}
                    month3={jan1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[0].Frequency}
                />
            
             <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'jan3'} 
                    line={'line3'} 
                    month1={jan3} 
                    month2={jan2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[0].Frequency}
                />
            
            <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'jan4'} 
                    line={'line4'} 
                    month1={jan4} 
                    month2={jan5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[0].Frequency}
                />
            
            {/*  */}
            <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'jan5'} 
                    line={'line5'} 
                    month1={jan5} 
                    month2={jan6}
                    month3={jan4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[0].Frequency}
                />
            
            {/*  */}
            <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'jan6'} 
                    line={'line6'} 
                    month1={jan6} 
                    month2={jan5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[0].Frequency}
                />
            
                </>
                :month===t('FEB')
                ?<>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'feb1'} 
                    line={'line1'} 
                    month1={feb1} 
                    month2={feb2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[1].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'feb2'} 
                    line={'line2'} 
                    month1={feb2} 
                    month2={feb3}
                    month3={feb1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[1].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'feb3'} 
                    line={'line3'} 
                    month1={feb3} 
                    month2={feb2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[1].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'feb4'} 
                    line={'line4'} 
                    month1={feb4} 
                    month2={feb5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[1].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'feb5'} 
                    line={'line5'} 
                    month1={feb5} 
                    month2={feb6}
                    month3={feb4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[1].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'feb6'} 
                    line={'line6'} 
                    month1={feb6} 
                    month2={feb5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[1].Frequency}
                />
            </>
                :month===t('MAR')
                ? <>
                 <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'mar1'} 
                    line={'line1'} 
                    month1={mar1} 
                    month2={mar2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[2].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'mar2'} 
                    line={'line2'} 
                    month1={mar2} 
                    month2={mar3}
                    month3={mar1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[2].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'mar3'} 
                    line={'line3'} 
                    month1={mar3} 
                    month2={mar2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[2].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'mar4'} 
                    line={'line4'} 
                    month1={mar4} 
                    month2={mar5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[2].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'mar5'} 
                    line={'line5'} 
                    month1={mar5} 
                    month2={mar6}
                    month3={mar4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[2].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'mar6'} 
                    line={'line6'} 
                    month1={mar6} 
                    month2={mar5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[2].Frequency}
                />   
                </>
            :month===t('APR')
                ? <>
                 <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'apr1'} 
                    line={'line1'} 
                    month1={apr1} 
                    month2={apr2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[3].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'apr2'} 
                    line={'line2'} 
                    month1={apr2} 
                    month2={apr3}
                    month3={apr1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[3].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'apr3'} 
                    line={'line3'} 
                    month1={apr3} 
                    month2={apr2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[3].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'apr4'} 
                    line={'line4'} 
                    month1={apr4} 
                    month2={apr5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[3].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'apr5'} 
                    line={'line5'} 
                    month1={apr5} 
                    month2={apr6}
                    month3={apr4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[3].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'apr6'} 
                    line={'line6'} 
                    month1={apr6} 
                    month2={apr5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[3].Frequency}
                />   
            </>
            :month===t('MAY')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'may1'} 
                    line={'line1'} 
                    month1={may1} 
                    month2={may2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[4].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'may2'} 
                    line={'line2'} 
                    month1={may2} 
                    month2={may3}
                    month3={may1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[4].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'may3'} 
                    line={'line3'} 
                    month1={may3} 
                    month2={may2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[4].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'may4'} 
                    line={'line4'} 
                    month1={may4} 
                    month2={may5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[4].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'may5'} 
                    line={'line5'} 
                    month1={may5} 
                    month2={may6}
                    month3={may4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[4].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'may6'} 
                    line={'line6'} 
                    month1={may6} 
                    month2={may5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[4].Frequency}
                />
            </>
            :month===t('JUN')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'jun1'} 
                    line={'line1'} 
                    month1={jun1} 
                    month2={jun2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[5].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'jun2'} 
                    line={'line2'} 
                    month1={jun2} 
                    month2={jun3}
                    month3={jun1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[5].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'jun3'} 
                    line={'line3'} 
                    month1={jun3} 
                    month2={jun2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[5].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'jun4'} 
                    line={'line4'} 
                    month1={jun4} 
                    month2={jun5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[5].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'jun5'} 
                    line={'line5'} 
                    month1={jun5} 
                    month2={jun6}
                    month3={jun4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[5].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'jun6'} 
                    line={'line6'} 
                    month1={jun6} 
                    month2={jun5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[5].Frequency}
                />
            </>
            :month===t('JUL')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'jul1'} 
                    line={'line1'} 
                    month1={jul1} 
                    month2={jul2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[6].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'jul2'} 
                    line={'line2'} 
                    month1={jul2} 
                    month2={jul3}
                    month3={jul1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[6].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'jul3'} 
                    line={'line3'} 
                    month1={jul3} 
                    month2={jul2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[6].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'jul4'} 
                    line={'line4'} 
                    month1={jul4} 
                    month2={jul5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[6].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'jul5'} 
                    line={'line5'} 
                    month1={jul5} 
                    month2={jul6}
                    month3={jul4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[6].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'jul6'} 
                    line={'line6'} 
                    month1={jul6} 
                    month2={jul5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[6].Frequency}
                />
            </>
            :month===t('AUG')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'aug1'} 
                    line={'line1'} 
                    month1={aug1} 
                    month2={aug2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[7].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'aug2'} 
                    line={'line2'} 
                    month1={aug2} 
                    month2={aug3}
                    month3={aug1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[7].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'aug3'} 
                    line={'line3'} 
                    month1={aug3} 
                    month2={aug2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[7].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'aug4'} 
                    line={'line4'} 
                    month1={aug4} 
                    month2={aug5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[7].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'aug5'} 
                    line={'line5'} 
                    month1={aug5} 
                    month2={aug6}
                    month3={aug4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[7].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'aug6'} 
                    line={'line6'} 
                    month1={aug6} 
                    month2={aug5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[7].Frequency}
                />
            </>
            :month===t('SEP')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'sep1'} 
                    line={'line1'} 
                    month1={sep1} 
                    month2={sep2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[8].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'sep2'} 
                    line={'line2'} 
                    month1={sep2} 
                    month2={sep3}
                    month3={sep1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[8].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'sep3'} 
                    line={'line3'} 
                    month1={sep3} 
                    month2={sep2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[8].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'sep4'} 
                    line={'line4'} 
                    month1={sep4} 
                    month2={sep5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[8].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'sep5'} 
                    line={'line5'} 
                    month1={sep5} 
                    month2={sep6}
                    month3={sep4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[8].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'sep6'} 
                    line={'line6'} 
                    month1={sep6} 
                    month2={sep5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[8].Frequency}
                />
            </>
            :month===t('OCT')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'oct1'} 
                    line={'line1'} 
                    month1={oct1} 
                    month2={oct2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[9].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'oct2'} 
                    line={'line2'} 
                    month1={oct2} 
                    month2={oct3}
                    month3={oct1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[9].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'oct3'} 
                    line={'line3'} 
                    month1={oct3} 
                    month2={oct2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[9].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'oct4'} 
                    line={'line4'} 
                    month1={oct4} 
                    month2={oct5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[9].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'oct5'} 
                    line={'line5'} 
                    month1={oct5} 
                    month2={oct6}
                    month3={oct4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[9].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'oct6'} 
                    line={'line6'} 
                    month1={oct6} 
                    month2={oct5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[9].Frequency}
                />
            </>
            :month===t('NOV')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'nov1'} 
                    line={'line1'} 
                    month1={nov1} 
                    month2={nov2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[10].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'nov2'} 
                    line={'line2'} 
                    month1={nov2} 
                    month2={nov3}
                    month3={nov1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[10].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'nov3'} 
                    line={'line3'} 
                    month1={nov3} 
                    month2={nov2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[10].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'nov4'} 
                    line={'line4'} 
                    month1={nov4} 
                    month2={nov5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[10].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'nov5'} 
                    line={'line5'} 
                    month1={nov5} 
                    month2={nov6}
                    month3={nov4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[10].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'nov6'} 
                    line={'line6'} 
                    month1={nov6} 
                    month2={nov5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[10].Frequency}
                />
            </>
            :month===t('DEC')
            ? <>
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd1} 
                    droppableId={'dec1'} 
                    line={'line1'} 
                    month1={dec1} 
                    month2={dec2}
                    activeDraggable={activeDraggable1}
                    clickRow={clickRow1}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={1}
                    frequency={frequency[11].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd2} 
                    droppableId={'dec2'} 
                    line={'line2'} 
                    month1={dec2} 
                    month2={dec3}
                    month3={dec1}
                    activeDraggable={activeDraggable2}
                    clickRow={clickRow2}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={2}
                    frequency={frequency[11].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd3} 
                    droppableId={'dec3'} 
                    line={'line3'} 
                    month1={dec3} 
                    month2={dec2}
                    activeDraggable={activeDraggable3}
                    clickRow={clickRow3}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={3}
                    frequency={frequency[11].Frequency}
                />
                <CalendarDragDropTable1 
                    handleDragEnd={handleDragEnd4} 
                    droppableId={'dec4'} 
                    line={'line4'} 
                    month1={dec4} 
                    month2={dec5}
                    activeDraggable={activeDraggable4}
                    clickRow={clickRow4}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={4}
                    frequency={frequency[11].Frequency}
                />
                <CalendarDragDropTable2 
                    handleDragEnd={handleDragEnd5} 
                    droppableId={'dec5'} 
                    line={'line5'} 
                    month1={dec5} 
                    month2={dec6}
                    month3={dec4}
                    activeDraggable={activeDraggable5}
                    clickRow={clickRow5}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={5}
                    frequency={frequency[11].Frequency}
                />
                <CalendarDragDropTable3 
                    handleDragEnd={handleDragEnd6} 
                    droppableId={'dec6'} 
                    line={'line6'} 
                    month1={dec6} 
                    month2={dec5}
                    activeDraggable={activeDraggable6}
                    clickRow={clickRow6}
                    calendarDatas={calendarDatas}
                    janxx={janxx}
                    lineNumber={6}
                    frequency={frequency[11].Frequency}
                />
            </>
            :null
            }  
        </div>
    )
}

export default Boxes;

//noş bir hücre var ise bu kodu kullanabilrsin
// const handleDragEnd2 = async(e) => { 
//     let id=null;
//    await jan2.map((data,index)=>(
//         data===undefined
//         ?id=index
//         :null
//     ))
//     console.log(id);
//     console.log(e);
//     if (!e.destination) return;
//     let tempData = Array.from(jan2);
//     console.log(tempData);
//     let [source_data] = tempData.splice(e.source.index, e.destination.index!==id?1:0);
//     console.log(source_data);
//     if(e.destination.index!==id){
//         tempData.splice(e.destination.index, 0, source_data);
//     }
    
//     console.log(e.destination.index);
//     console.log(e.destination);
//     setJan2(tempData);
// };
