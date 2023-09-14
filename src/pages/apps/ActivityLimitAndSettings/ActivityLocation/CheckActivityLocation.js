import React,{ useState,useEffect, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { activityLocationData } from '../../../../redux/actions';
import { FetchApiGet } from '../../../../utils/http.helper';
import { CustomRadios } from '../../../forms/Basic'

const CheckActivityLocation = () => {

  const dispatch=useDispatch();

  const [activityLocation, setActivityLocation] = useState([
        {value:1,defaultCheck:true,isCheck:true,id:1,label:'office',name:'location'},
        {value:2,defaultCheck:false,isCheck:false,id:2,label:'online',name:'location'},
        {value:3,defaultCheck:false,isCheck:false,id:3,label:'clinic',name:'location'},
        {value:4,defaultCheck:false,isCheck:false,id:4,label:'pharmacy',name:'location'},
        {value:5,defaultCheck:false,isCheck:false,id:5,label:'other',name:'location'},
  ])

  const [checkName, setCheckName] = useState('');
  

    const handleChangeCheck =  (name) => {
      console.log(name);
      let arr=activityLocation;
      setCheckName(name);
      arr.map(data=>(
            data.value === name 
            ? data.isCheck = true
            : data.isCheck = false
        ))
      setActivityLocation([...arr]);
      dispatch(activityLocationData(Number(name)));
    }

    // useEffect(() => {
    //   FetchApiGet('services/Settings/ActivityLocation/GetActivityLocationTypes','GET')
    //   .then(response=>response.json())
    //   .then(response=>console.log(response))
    //   .catch(error=>console.log(error))
    // }, [])
    
    // useEffect(() => {
    //   console.log('buradaadaa');
    //   dispatch(activityLocationData(checkName));
    // }, [checkName, dispatch])
    

  return (
    <div className='check'>
       <CustomRadios data={activityLocation} change={handleChangeCheck} />
    </div>
  )
}

export default CheckActivityLocation