import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../../utils/http.helper';

const PhysicianTable = ({ physicianData, setPhysicianData,savePhysiciansSplit }) => {

    const { t } = useTranslation();
    const pharmacyDatasBody=useSelector((state) => state.Calendar.pharmacyDatasBody);
    
    const exceptThisSymbols = ["e", "E", "+", "-", "." , "*", "/", " "];

    const physiciansInputChange = (e) => {
        console.log(e.target.value);
        physicianData.map(data=>(
            data.customerId === Number(e.target.id)
            ?e.target.value === 0
                ?data.allocation=null
                :data.allocation=e.target.value         
            :null 
        ))
        setPhysicianData([...physicianData]);
    };

    const allocationInputChange = async (physician)=> {
        const allocationInputChangeBody = {
            skuId: physician.skuId,
            pharmacyId: physician.pharmacyId,
            customerId: physician.customerId,
            allocation: physician.allocation === '' ? 0 : physician.allocation,
        }
       await FetchApiPost('services/Daywork/Split/ChangePhysicianAllocation','POST',allocationInputChangeBody)
        .then((response) => response.json())
        .then((response) => console.log('allocationInputChangeBody =>', response))
        .catch((error) => console.log(error));
        
        await FetchApiPost('services/Daywork/Split/GetPhysicianSplitDatas','POST',pharmacyDatasBody )
        .then((response) => response.json())
        .then((response) => console.log('response=>',response))

        .catch((error) => console.log(error));
    }

    
    return (
        <div className="physician-split-table">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{t('PHYSICIANS')}</th>
                        <th>C</th>
                        <th>S.A.</th>
                        <th>ALC.</th>
                        <th>LYT</th>
                    </tr>
                </thead>
                <tbody>
                    {physicianData?.map((physician, index) => (
                        <tr key={index}>
                            <td title={physician.customerName.split('/')[0]} style={{ width: '150px' }}>
                                {physician.customerName.split('/')[0]}
                            </td>
                            <td style={{ width: '40px' }}>{physician.customerCategory}</td>
                            <td style={{ width: '60px' }}>
                                {physician.salesActual}
                            </td>
                            <td style={{ width: '60px' }}>
                                <input
                                    className="form-control-add-pharmacy"
                                    type="number"
                                    onChange={(e) => physiciansInputChange(e)}
                                    id={physician.customerId}
                                    name="quantity"
                                    value={physician.allocation} 
                                    onBlur={()=>allocationInputChange(physician)} 
                                    onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
                                />
                            </td>
                            <td style={{ width: '40px' }}>{physician.loyality}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PhysicianTable;
