import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { alsModal } from '../../../../redux/actions';
import { async } from 'regenerator-runtime';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';


const ProductMixTable = ({ tableData, setTableData, changeShare, backUpTableData, setBackUpTableData }) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const exceptThisSymbols = ["e", "E", "+", "-" , "*", "/", " "];

  const activityId = useSelector(state => state.ActivityLimit.activityId);
  const ownerTableData = useSelector(state => state.ActivityLimit.ownersTableDatas);
  const { alsUpdateData, alsUpdateDisabled } = useSelector(state => state.ActivityLimit);
  
  // Warning Modal Show
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleModalClose =()=> {
    setShow(false);
    setShow2(false);
}

  const [tableHeaderName] = useState([
    { name: 'product', title: 'Product' },
    { name: 'share', title: 'Share' },
  ])


  const [tableDatas, setTableDatas] = useState([
    // {
    //   id: 0,
    //   headerName: 'PM / ALPHA / Uzbekistan RO',
    //   isCollapsed: true,
    //   ownerShareName:'Owner Share',
    //   ownerShareTotal: 60,
    //   product:[
    //   {productName:'TUTUKON',share:30},
    //   {productName:'KLOFIT',share:20},
    //   {productName:'DISORINORM',share:10},
    // ]
    // },
    // {
    //   id: 1,
    //   headerName: 'PM / ALPHA / Uzbekistan RO',
    //   isCollapsed: true,
    //   ownerShareName:'Owner Share',
    //   ownerShareTotal: 40,
    //   product:[
    //     {productName:'TUTUKON',share:10},
    //     {productName:'KLOFIT',share:10},
    //     {productName:'DISORINORM',share:20},
    //   ]
    //   },
  ])

  console.log(tableDatas);
  
  useEffect(() => {
    if (ownerTableData?.length !== 0 && ownerTableData !== null) {
      fetch(`http://178.18.200.171:5000/services/Settings/ActivityProductMix/GetProductMixByActivityId?id=${activityId}`, {
        method: 'GET',
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": 'Bearer ' + localStorage.getItem("userToken")
        }
      })
        .then(response => response.json())
        .then(response => {
          setTableDatas(response.data.map(data => (
            {
              id                : data.id,
              activityId        : data.activityId,
              businessUnitId    : data.businessUnitId,
              businessUnitName  : data.businessUnitName,
              companyId         : data.companyId,
              companyName       : data.companyName,
              positionId        : data.positionId,
              positionName      : data.positionName,
              vacancyName       : data.vacancyName,
              headerName        : data.header,
              isCollapsed       : true,
              ownerShareName    : 'Owner Share',
              ownerShareTotal   : data.totalPercent,
              product           : data.product.map(product => (
                {
                  productId: product.productId,
                  productName: product.productName,
                  share: product.sharePercent === 0 ? null : data.sharePercent
                }
              ))
            }
          )))
        })
        .catch(error => console.log(error))
    }
  }, [activityId, ownerTableData, setTableData])

  const [notPercentOwnerName, setNotPercentOwnerName] = useState([]);

  const updateProductMix = () => {

    setNotPercentOwnerName([]);
    tableDatas.map(data=>{
      console.log(typeof(data.ownerShareTotal));
      if(data.ownerShareTotal !== 100) {
        setNotPercentOwnerName(prev=>[...prev,data.headerName])
      }
      return data
    })

    const productLength = tableDatas.length;
    let totalShare=0;

    tableDatas.map(data=>{
      if(data.ownerShareTotal === 100) {
        return totalShare++;
      }
      return data
    })
    
    const productMixBody = {
      ActivityProductMixResponses: tableDatas?.map(data => (
        {
          ActivityId        : data.activityId,
          CompanyId         : data.companyId,
          CompanyName       : data.companyName,
          BusinessUnitId    : data.businessUnitId,
          BusinessUnitName  : data.businessUnitName,
          PositionId        : data.positionId,
          PositionName      : data.positionName,
          Product           : data.product?.map(item => (
          {
            ProductId         : item.productId,
            ProductName       : item.productName,
            SharePercent      : item.share !== null ? item.share : 0
          }
          ))
        }
      ))
    }

    if(productLength === totalShare) {
      FetchApiPost('services/Settings/ActivityProductMix/CreateActivityProductMix', 'POST', productMixBody)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
    else {
      setShow2(true);
    }
   
  }

  const isAccordion = (id) => {

    setTableDatas(prev=>{
      const newState = prev.map(data=>{
        if(data.id === id){
         return {
          ...data , isCollapsed : !data.isCollapsed
         }
        }
        return data;
      })

      return newState;
    })
  }

  const handleChangeItemValue =  (e,id,productId,activityId) => {

    let inputPercentValue=(e.target.value).split('')
    
    setTableDatas(prev=>{
     const newState= prev.map(item=>{
        if(item.id === id) {
          item.product?.map(data=>{
            if(data.productId === productId) {
              if(e.target.value>100) {
                return(
                  data.share = Number(inputPercentValue[0]+inputPercentValue[1])
                )
              }
              else if(Number(e.target.value) === 0) {
                return(
                  data.share = null
                )
              }
              else {
                return(
                  data.share = Number(e.target.value)
                )
              }
              
            }
            return data
          })
          
        }
        return item
      })
      return newState
    }
    )
  }

  
  // Total Owner Share
  const totalOwnerShare = async (id, productId) => {
    console.log(id);
    console.log(productId);
    let sum = 0;

    tableDatas.map( item => ( 
      item.id === id
      ? item.product.map(data => (
        sum+=data.share
      ))
      : null
    ))

    if(sum<=100){
      setTableDatas(prev=>{
        const newState = prev.map(data=>{
          if(data.id === id){
           return {
            ...data , ownerShareTotal : sum
           }
          }
          return data;
        })
  
        return newState;
      })
    }
    else {
      
      setTableDatas(prev=>{
        const newState= prev.map(item=>{
           if(item.id === id) {
             item.product?.map(data=>{
               if(data.productId === productId) {
                 return(
                   data.share = 0
                 )
               }
               return data
             }) 
           }
           return item
         })
         return newState
       }
       )

       setShow(true)
    }
    
  }

  
    const onKeyDown = (e) => {
      let value=String(e.target.value);
      if(value.length === 0 && e.key === '.') {
        return e.preventDefault()
      }
      else {
        return (
          exceptThisSymbols.includes(e.key) && e.preventDefault()
        )
      }
      
    }

    useEffect(() => {
      setTableDatas(alsUpdateData.activityProductMixes.map(data => (
        {
          id                : data.id,
          activityId        : data.activityId,
          businessUnitId    : data.businessUnitId,
          businessUnitName  : data.businessUnitName,
          companyId         : data.companyId,
          companyName       : data.companyName,
          positionId        : data.positionId,
          positionName      : data.positionName,
          vacancyName       : data.vacancyName,
          headerName        : data.header,
          isCollapsed       : true,
          ownerShareName    : 'Owner Share',
          ownerShareTotal   : data.totalPercent,
          product           : data.product.map(product => (
            {
              productId: product.productId,
              productName: product.productName,
              share: product.sharePercent === 0 ? null : data.sharePercent
            }
          ))
        }
      )))
    }, [])
    
  
  return (
    <div className='budget-table'>
      
      <div className='product-mix-table'>
      <table className='m-auto' style={{ width: '100%' }} >
        <tr style={{ backgroundColor: '#F1F3FA', color: '#6C757D' }}>
          {
            tableHeaderName.map(item => (
              <th>{t(item.title)}</th>
            ))
          }
        </tr>

        {
          tableDatas.map((item, index) => (
            <>
              {
                item.isCollapsed === true
                  ? <>
                    <tr key={index} onClick={() => isAccordion(item.id)}  >
                      <th colSpan={2}>
                        <span><i className="fa-solid fa-caret-down"></i></span>
                        <span> {item.headerName} </span>
                      </th>
                    </tr>


                    <tr style={{ backgroundColor: '#F1F3FA', color: '#6C757D' }} >
                      <td> {item.ownerShareName} </td>
                      <td 
                      className='text-center' 
                      style={{ 
                        width: '120px',
                        color:item.ownerShareTotal === 100 ? 'green' : 'red' 
                      }} 
                      > 
                      {item.ownerShareTotal} 
                      </td>
                    </tr>

                    {
                      item.product.map((data, index) => (
                        <tr key={index} >
                          <td> {data.productName} </td>
                          <td>
                            <input
                               className='m-0 text-center'
                               type="number"
                               name="quantity"
                               id={data.id}
                               defaultValue={data.share}
                              //  value={data.share}
                               placeholder={data.share}
                               onPaste={(e)=>{e.preventDefault(); return false}}
                               onChange={(e)=>handleChangeItemValue(e,item.id,data.productId,item.activityId)}
                               onKeyDown={(e)=>onKeyDown(e)}
                               onBlur={()=>totalOwnerShare(item.id,data.productId)}
                               style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}
                            />
                          </td>
                        </tr>
                      ))
                    }
                  </>
                  : <>
                    <tr key={index} onClick={() => isAccordion(item.id)}  >
                      <th colSpan={2}>
                        <span><i className="fa-solid fa-caret-down"></i></span>
                        <span> {item.headerName} </span>
                      </th>
                    </tr>
                  </>
              }

            </>
          ))
        }

      </table>
      </div>
      <hr />
      <div className='text-end'>
        <Button variant="light" onClick={()=>dispatch(alsModal(false))} >
        {t('Cancel')}
        </Button>{' '}
        <Button variant="primary" onClick={updateProductMix} >
          {t('Save')}
        </Button>
      </div>
      {
        show === true && 
        <PharmacySplitPercentProblem 
                    messages={'Owner Share must total 100.'} 
                    show={show} 
                    setShow={setShow} 
                    handleClose={handleModalClose} 
                    />
      }

      {
        show2 === true && 
        <PharmacySplitPercentProblem 
                    messages={`Owner share of all products must be 100 in total ${notPercentOwnerName.join(' - ')}`} 
                    show={show2} 
                    setShow={setShow2} 
                    handleClose={handleModalClose} 
                    />
      }
    </div>
  )
}

export default ProductMixTable