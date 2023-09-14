import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TotalNumber from './TotalNumber'
import { useTranslation } from 'react-i18next';

const ProductProfile = ({product, setProduct,totalNumber,setTotalNumber,setButtonDisable, setTotalProfileNumber, settotalProfile, totalProfile, newNumberBrandName, newNumberIndicationName, setNewNumberBrandName,setComplatedButton}) => {
  const appStatus = useSelector(state => state.Calendar.appStatus);
  const { t } = useTranslation();
  
  useEffect(() => {
    setTotalProfileNumber(totalProfile)
    profileInputNumberOnBlur()
  },[totalProfile])
  
  const profileInputNumber = (e) => {
    // console.log("e.target.value",e.target.value)
    // product.find(item=>(
    //   String(item.profileId)+String(item.indicationId) === e.target.id
    //   ?item.profileNumber=e.target.value
    //   :null
    // ))
    newNumberIndicationName.map(indications=>(
      indications.indications.find(indication => (
        String(indication.profileId)+String(indication.indicationId) === e.target.id
        ?indication.profileNumber=e.target.value
        :null
  
      ))
    ))

    let cccc = product.map(item=>{
      if(String(item.profileId)+String(item.indicationId) === e.target.id){
        return {
          ...item,
          profileNumber:e.target.value
        }
      }else{
        return item
      }
       
    })
    setProduct(cccc)

if(appStatus !== 4){
  let newBrands = newNumberBrandName.map(brand => {
    let tNumber2 = 0;
    let eNumber2 = 0;
    product.map(pr => {
      if(brand.brandAbb === pr.brandList[0].brandAbb){
        tNumber2 = tNumber2+1
      }
      if((brand.brandAbb === pr.brandList[0].brandAbb) && ((pr.profileNumber !== null) && (pr.profileNumber.length !== 0))){
        eNumber2 = eNumber2+1
      }
    })
    return {
      ...brand,
      totalProfile: tNumber2,
      enteredProfile: eNumber2
    }
})
setNewNumberBrandName(newBrands)
}else{
  let newBrands = newNumberBrandName.map(brand => {
    let tNumber2 = 0;
    let eNumber2 = 0;
    product.map(pr => {
      if(brand.brandAbb === pr.brandList[0].brandAbb){
        tNumber2 = tNumber2+1
      }
      if((brand.brandAbb === pr.brandList[0].brandAbb) && ((pr.profileNumber !== null))){
        eNumber2 = eNumber2+1
      }
    })
    return {
      ...brand,
      totalProfile: tNumber2,
      enteredProfile: eNumber2
    }
})
setNewNumberBrandName(newBrands)
}
  }

  useEffect(() => {
      if(appStatus !== 4){
        let newBrands = newNumberBrandName.map(brand => {
          let tNumber2 = 0;
          let eNumber2 = 0;
          product.map(pr => {
            if(brand.brandAbb === pr.brandList[0].brandAbb){
              tNumber2 = tNumber2+1
            }
            if((brand.brandAbb === pr.brandList[0].brandAbb) && ((pr.profileNumber !== null) && (pr.profileNumber.length !== 0))){
              eNumber2 = eNumber2+1
            }
          })
          return {
            ...brand,
            totalProfile: tNumber2,
            enteredProfile: eNumber2
          }
      })
      setNewNumberBrandName(newBrands)
      }else {
        let newBrands = newNumberBrandName.map(brand => {
          let tNumber2 = 0;
          let eNumber2 = 0;
          product.map(pr => {
            if(brand.brandAbb === pr.brandList[0].brandAbb){
              tNumber2 = tNumber2+1
            }
            if((brand.brandAbb === pr.brandList[0].brandAbb) && ((pr.profileNumber !== null))){
              eNumber2 = eNumber2+1
            }
          })
          return {
            ...brand,
            totalProfile: tNumber2,
            enteredProfile: eNumber2
          }
      })
      setNewNumberBrandName(newBrands)
      }
  }, [product])

  useEffect(() => {
    if(appStatus !== 4){
      let addInputNumber=0;
      product?.map((data)=>(
        addInputNumber+=Number(data.profileNumber)
      ))
        settotalProfile(addInputNumber)
      }
  }, [product])
  
  
  const profileInputNumberOnBlur =()=> {
    if(appStatus !== 4){
      let addInputNumber=0;
      product?.map((data)=>(  
        addInputNumber+=Number(data.profileNumber)
      ))
      settotalProfile(addInputNumber)
    }
      
  }

  const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

  const handleClickBrandTab = (index) => {
    let a = newNumberBrandName.map((item, itemIndex) => {
      if(index === itemIndex) {
        return {
          allData: item.allData,
          brandName: item.brandName,
          brandId: item.brandId,
          brandAbb: item.brandAbb,
          selected: true,
          totalProfile: item.totalProfile,
          enteredProfile: item.enteredProfile,
        }
      }else{
        return {
          allData: item.allData,
          brandName: item.brandName,
          brandId: item.brandId,
          brandAbb: item.brandAbb,
          selected: false,
          totalProfile: item.totalProfile,
          enteredProfile: item.enteredProfile,
        }
      }
      
    })
    setNewNumberBrandName(a)
  }

  const [selectedBrandName, setSelectedBrandName] = useState(""); 
  
  useEffect(() => {
    let a = newNumberBrandName.filter(item => item.selected === true)
    setSelectedBrandName(a[0]?.brandName)
  }, [newNumberBrandName])


  const [complatedTotalProfileNumber, setComplatedTotalProfileNumber] = useState(0);
  const [complatedRatedProfileNumber, setCompatedRatedProfileNumber] = useState(0);

  useEffect(() => {
    let cTP = 0;
    let cRT = 0;
    product?.map(item => {
      if(item?.brandList[0].isPromo === true){
        cTP = cTP+1
      }
      if((item?.brandList[0].isPromo === true) && (item.profileNumber !== null) && (item.profileNumber.length > 0) ){
        cRT = cRT+1
      }
    })
    setComplatedTotalProfileNumber(cTP)
    setCompatedRatedProfileNumber(cRT)
  }, [product, complatedTotalProfileNumber, complatedRatedProfileNumber])

  useEffect(() => {
    if(totalProfile===0){
      // setButtonDisable({ disable:true, message: t('Data is Required !') })
      setComplatedButton(true)
    }
    else if((totalProfile > Number(totalNumber)) || (totalProfile === 0 && totalNumber === null)){
      // setButtonDisable({ disable:true, message: t('Total profile cannot be greater than total number !') })
      setComplatedButton(true)
    }
    else{
      // setButtonDisable({ disable:false, message: null })

      // if(complatedTotalProfileNumber === complatedRatedProfileNumber){
      //   setComplatedButton(false)
      //   setButtonDisable({ disable:false, message: null })
      // }else{
      //   setComplatedButton(true)
      //   setButtonDisable({ disable:true, message: t('All promo and non promo should be considered.') })
      // }

      if(complatedTotalProfileNumber === 0){
        setComplatedButton(false)
        setButtonDisable({ disable:false, message: null })
      }else{
        if(complatedRatedProfileNumber > 0){
          setComplatedButton(false)
          setButtonDisable({ disable:false, message: null })
        }else{
          setComplatedButton(true)
          setButtonDisable({ disable:true, message: t('All promo and non promo should be considered.') })
        }
      }
      
    }
    

  }, [totalNumber, totalProfile, product, complatedTotalProfileNumber, complatedRatedProfileNumber])


  return (
    <>
    <TotalNumber totalProfile={totalProfile} totalNumber={totalNumber} setTotalNumber={setTotalNumber} />
    {
       (
        <div className='product_profile'>
          <div className='profile-static-denem'>
          <div className='product_profile-tabs'>
            {
              newNumberBrandName?.map((data, index) => (
                <button key={index} className={data.selected ? 'product_profile-tabs-item-selected' : 'product_profile-tabs-item'} onClick={() => handleClickBrandTab(index)}>
                  <div className={data.selected ? 'product_profile-tabs-item-brand-selected' : 'product_profile-tabs-item-brand'}>
                    {data.selected === true ? <><span>{data.brandName}</span> <span>{data.enteredProfile}/{data.totalProfile}</span></>
                    : data.brandAbb}
                  </div>
                </button>
              ))
            }
          </div>
          </div>
          <div className='product-profile-indications' style={{borderRight: "1px solid #DEE2E6"}}>
          {
              newNumberIndicationName?.map(indicationItem => (
                indicationItem?.allData.brandList[0]?.brandName === selectedBrandName && (
                  <>
                    <div style={{width: "100%", backgroundColor: '#98A6AD', height: '40px', color: '#fff', textAlign: 'left', display: "flex", alignItems: "center", paddingLeft: "12px" }}>
                      <span title={indicationItem?.indicationName} style={{color: '#fff', fontSize: "14.4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{indicationItem?.indicationName}</span>
                    </div>
                    {
                      indicationItem.indications.map(profileItems => (
                        <div className='patient-simdilik' style={{borderBottom: '1px solid #DEE2E6', borderLeft: '1px solid #DEE2E6', height: '40px', display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                          <div className='patient-number-profiles-name' style={{borderRight: "1px solid #DEE2E6" ,width: '80%', backgroundColor: '#F1F3FA66', paddingLeft: "12px", height: '100%', textAlign: 'left', display: 'flex', alignItems: "center"}}>
                            <span title={profileItems?.profileName} style={{marginTop: "8px", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                              {profileItems?.profileName}
                            </span>
                          </div>
                          <input type='number' className='profile-number-input' disabled={appStatus === 4} style={{width: '20%', height: '40px', textAlign: 'left', color: "#6C757D"}}
                            onWheel={ event => event.currentTarget.blur() }
                            onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
                            onBlur={profileInputNumberOnBlur}
                            onChange={(e)=> profileInputNumber(e)}
                            id={`${profileItems.profileId}${profileItems.indicationId}`}
                            defaultValue={profileItems.patientNumber}
                          />
                        </div>
                      ))
                    }
                    
                  </>
                )
              ))
            }
          </div>
      </div>
      )
    }

     </>
  )
}

export default ProductProfile