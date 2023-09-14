import React from 'react'
import { useSelector } from 'react-redux'
const AddPharmacyTableDatas = ({
    data,
    index,
    placeHolder,
    splitChangeInput,
    deletePharmacy,
    splitInputOnBlur,
    deleteButtonModal
}) => {
    const appStatus = useSelector(state => state.Calendar.appStatus);
    return (
        <>
            <tr className='pharmacy_table_row' key={index}>
                <td className='pharmacy_name'><div>{data.label}</div></td>
                <td>{data.category}</td>
                <td style={{ width: '50px' }}>
                    <input disabled={appStatus === 4} className='form-control-add-pharmacy' type="number"  id={data.value} name="quantity" value={data.inputPercent} placeholder={data.inputPercent} onPaste={(e)=>{e.preventDefault(); return false}} onKeyDown={event => {
                        if (event.key === "." || event.key === "-") {
                            event.preventDefault();
                        }
                    }} onChange={(e) => splitChangeInput(e)} onBlur={(e)=>splitInputOnBlur(e.target.id,e.target.value)}  />
                </td>
                <td  style={{backgroundColor:'#FA5C7D',width:'50px'}}><i className="fa-solid fa-trash"  id={data.value}  onClick={(e)=> appStatus !== 4 && deleteButtonModal(e,data)} style={{ color: '#FFFFFF',width:'100%',padding:'10px',cursor:'pointer' }}></i></td>
            </tr>
        </>
    )
}

export default React.memo(AddPharmacyTableDatas) 