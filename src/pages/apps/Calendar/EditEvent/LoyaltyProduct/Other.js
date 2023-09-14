import { useEffect } from 'react'
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
function Other({ setButtonDisable, setResetButton, resetButton, loyaltyOther, setLoyaltyOther, product }) {
  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);
  useEffect(() => {
    if(resetButton.buttonStatus === true && resetButton.loyaltyName === 'loyaltyOther'){
      setResetButton({buttonStatus: false, loyaltyName: null})
      setButtonDisable({ disable: false, message: null })
      let element = document.getElementsByClassName("loyalty-product-other-container__item");
      let brandElement = document.getElementsByClassName("loyalty-product-other-percent-hidden-bar")
      loyaltyOther?.forEach((item, itemIndex) => {
        item.Profile?.forEach((prof, profileIndex) => {
          if(prof.percentage !== null){
            element[itemIndex].children[profileIndex].children[2].style.width = `${(100 / 11) * (0 + 1)}%`;
            let span = element[itemIndex].children[profileIndex].children[1].children;
            prof.percentage = 0;
            prof.selectedData = 0;
            prof.quantity = 0;
            for (let i = 1; i <= 10; i++) {
                span[i].style.color = '#6C757D';
            }
            span[0].style.color = '#F8FEFC';
            element[itemIndex].children[profileIndex].children[2].style.backgroundImage = "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
            brandElement[itemIndex].style.width = "0px"
            item.percentage = 0;
            item.profileIncrement = 0;
          }
        })
      }
      )
    }
  }, [resetButton])

  useEffect(() => {

    (async () => {
      await loyaltyOther?.map(globalSku => (
        globalSku?.Profile?.map(skuProfile => (
          product?.map(item => (
            item?.brandList[0]?.brandId === globalSku?.BrandId && (
              ((item?.profileId === skuProfile?.ProfileId) && (item?.indicationId === skuProfile?.IndicationId)) &&
              (
                ((item.profileId === skuProfile.ProfileId) && (item.indicationId === skuProfile.IndicationId)) && (
                (skuProfile.data = (item.profileNumber === null || Number(item.profileNumber) === 0) ? null : handleProfileDataSet(Number(item.profileNumber))),
                  (skuProfile.percentage = skuProfile.percentage === null ? ((item.profileNumber === null || Number(item.profileNumber) === 0) ? null : 0) : skuProfile.percentage),
                  (skuProfile.profileIncrement = skuProfile.profileIncrement === null ? ((item.profileNumber === null || Number(item.profileNumber) === 0) ? null : 0) : skuProfile.profileIncrement),
                  (skuProfile.selectedData = skuProfile.selectedData === null ? ((item.profileNumber === null || Number(item.profileNumber) === 0) ? null : 0) : skuProfile.percentage)
                )
              )
            )
          ))
        ))
      ))

      let totalPercentIncreaseValues = [];
      await loyaltyOther?.map((item,index) => {
          let totalNumber = 0
          item?.Profile?.map(prof => (
            prof?.data !== null && (totalNumber = totalNumber + prof.data[1])
          ))
          totalPercentIncreaseValues.push(totalNumber);
          })
      await handleTotalPromoPercentSet(totalPercentIncreaseValues);
    })()
  }, [])

  const handleTotalPromoPercentSet = async (totalPercentIncreaseValues) => {
        let totalPercentDatas = [];
         for (let i = 0; i < totalPercentIncreaseValues.length; i++) {
           let totalPercentData = [0];
           for (let x = 0; x < 10; x++) {
            if((Number(totalPercentData[x]) === totalPercentData[x]) && (totalPercentData[x] % 1 !== 0)){
             totalPercentData.push(+((totalPercentData[x] + totalPercentIncreaseValues[i]).toFixed(2)))
            }else{
             totalPercentData.push(+(totalPercentData[x] + totalPercentIncreaseValues[i]).toFixed(2))
            }
          }
           totalPercentDatas.push(totalPercentData)
         }
         setLoyaltyOther(state => state.map((item, index) => ({BrandId: item.BrandId, GlobalSkuId: item.GlobalSkuId, GlobalSkuName: item.GlobalSkuName, profileIncrement: (totalPercentDatas[index][10] !== 0 && item.profileIncrement === null) ? 0 : item.profileIncrement, Profile: item.Profile, 
        data: totalPercentDatas[index], isPromoOrOther: item.isPromoOrOther, percentage: (totalPercentDatas[index][10] !== 0 && item.percentage === null) ? 0 : item.percentage})))
  }

  const handleProfileDataSet = (data) => {
    let array = [0];
    let increment = data / 10;
    for (let i = 0; i < 10; i++) {
      if(Number(array[i]) === array[i] && array[i] % 1 !== 0){
        array.push(Number((array[i] + increment).toFixed(2)))
      }else{
        array.push(array[i] + increment)
      }
    }
    return array
  }

  useEffect(() => {
    loyaltyOther?.forEach((item, itemIndex) => {
      if(item?.profileIncrement !== null){
        let percent = appStatus !== 4 ? (item.profileIncrement/item.data[10])*100 : item.percentage;
        if ((percent >= 0) && (percent <=20)) {
          changeAccordionColor(
            itemIndex,
            percent,
            "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
          );
        } else if ((percent >= 21) && (percent <=60)) {
          changeAccordionColor(
            itemIndex,
            percent,
            "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
          );
        } else if ((percent >= 61) && (percent <=100)) {
          changeAccordionColor(
            itemIndex,
            percent,
            "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
          );
        }
      }
      item?.Profile?.forEach((prof, profileIndex) => {
        if (prof?.percentage !== null) {
          if (prof.percentage === 0) {
            changeColor(
              itemIndex,
              profileIndex,
              0,
              "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
            );
          } else if (prof.percentage === 10) {
            changeColor(
              itemIndex,
              profileIndex,
              1,
              "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
            );
          } else if (prof.percentage === 20) {
            changeColor(
              itemIndex,
              profileIndex,
              2,
              "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
            );
          } else if (prof.percentage === 30) {
            changeColor(
              itemIndex,
              profileIndex,
              3,
              "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
            );
          } else if (prof.percentage === 40) {
            changeColor(
              itemIndex,
              profileIndex,
              4,
              "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
            );
          } else if (prof.percentage === 50) {
            changeColor(
              itemIndex,
              profileIndex,
              5,
              "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
            );
          } else if (prof.percentage === 60) {
            changeColor(
              itemIndex,
              profileIndex,
              6,
              "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
            );
          } else if (prof.percentage === 70) {
            changeColor(
              itemIndex,
              profileIndex,
              7,
              "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
            );
          } else if (prof.percentage === 80) {
            changeColor(
              itemIndex,
              profileIndex,
              8,
              "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
            );
          } else if (prof.percentage === 90) {
            changeColor(
              itemIndex,
              profileIndex,
              9,
              "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
            );
          } else if (prof.percentage === 100) {
            changeColor(
              itemIndex,
              profileIndex,
              10,
              "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
            );
          }
        }
      })
    })
    // Next Button Disabled Condition
    setButtonDisable({ disable: false, message: null })
  }, [loyaltyOther])

  const changeColor = (accordionIndex ,profileIndex, spanColumn, color) => {
    try {
      let element = document.getElementsByClassName("loyalty-product-other-container__item");
      element[accordionIndex].children[profileIndex].children[2].style.backgroundImage = color;
      if (spanColumn === 10) {
        element[accordionIndex].children[profileIndex].children[2].style.width = `99.8%`
        element[accordionIndex].children[profileIndex].children[2].style.borderTopRightRadius = "4px";
        element[accordionIndex].children[profileIndex].children[2].style.borderBottomRightRadius = "4px";
      } else {
        element[accordionIndex].children[profileIndex].children[2].style.width = `${(100 / 11) * (spanColumn + 1)}%`;
        element[accordionIndex].children[profileIndex].children[2].style.borderTopRightRadius = "0px";
        element[accordionIndex].children[profileIndex].children[2].style.borderBottomRightRadius = "0px";
      }
      let span = element[accordionIndex].children[profileIndex].children[1].children
      for (let i = 0; i <= 10; i++) {
        if(i <= spanColumn){
          span[i].style.color = '#F8FEFC';
        }else{
          span[i].style.color = '#6C757D';
        }
      }
    } catch (error) {
      
    }
  }

  const changeAccordionColor = (accordionIndex, percent, color) => {
    try {
      let accordionElement = document.getElementsByClassName("loyalty-product-other-percent-hidden-bar");
      accordionElement[accordionIndex].style.backgroundImage = color;
      if(percent === 100){
        accordionElement[accordionIndex].style.width = `99.8%`;
        accordionElement[accordionIndex].style.borderTopRightRadius = "4px"
        accordionElement[accordionIndex].style.borderBottomRightRadius = "4px"
      }else{
        accordionElement[accordionIndex].style.width = `${((100 / 11) * (percent / 10))+(100 / 11)}%`;
        accordionElement[accordionIndex].style.borderTopRightRadius = "0px";
        accordionElement[accordionIndex].style.borderBottomRightRadius = "0px";
      }
    } catch (error) {
      
    }
  }

  const handleClick = (event, percent, accordionIndex, profileIndex, data, profileId) => {
    if(appStatus !== 4){
      loyaltyOther?.map((item, index) => {
        if(index === accordionIndex){
          let accordionIncrementData = 0
          item?.Profile?.map((profile, pIndex) => {
            if((profile?.IndicationId === Number(event.target.id)) && (profile?.ProfileId === Number(profileId))){
              let arr = loyaltyOther;
              arr[index].Profile[pIndex].percentage = percent;
              arr[index].Profile[pIndex].selectedData = data;
              arr[index].Profile[pIndex].quantity = Math.round((percent / 10) * data);
              setLoyaltyOther([...arr])
            }
            accordionIncrementData = accordionIncrementData + profile.selectedData
          })
          let arr = loyaltyOther;
          arr[index].profileIncrement = accordionIncrementData;
          arr[index].percentage = Number(Math.round((accordionIncrementData/item.data[10])*100));
          setLoyaltyOther([...arr])
        }
      })
    }
  }

  return (
  <div className='loyalty-product'>
    <div className='loyalty-product__headers nav-tabs'>
      <div className='nav-item' aria-selected="true" role="tab" aria-controls="home">{t('Promo')}</div>
      <div className='nav-item'>{t('Non- Promo')}</div>
      <div className='nav-item nav-link active'>{t('Other')}</div>
    </div>
      <div className='loyalty-product-accordion-container'>
      <Accordion defaultActiveKey="0">
        {
          loyaltyOther?.map((accordion, accordionIndex) => (
            <>
              {
                ((accordion.data !== null) && (accordion.data[10] !== 0)) ? (
                  
                    <Accordion.Item eventKey={accordionIndex}>
                      <Accordion.Header>
                        <div className='loyalty-product-accordion-header-container'>
                          <div className='loyalty-product-accordion-header-container__head'>
                            <div>{accordion.GlobalSkuName}</div>
                            <div>{accordion.percentage === null ? 0 : accordion.percentage}%</div>
                          </div>
                          <div className='loyalty-product-other-accordion-container__bar'>
                            {
                              accordion?.data.map((totalItem, totalIindex) => (
                                <span key={totalIindex} >{totalItem}</span>
                              ))
                            }
                          <div className="loyalty-product-other-percent-hidden-bar"></div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                          <div className='loyalty-product-other-container'>
                            <div className='loyalty-product-other-container__item'>
                                {
                                  accordion?.Profile?.map((profileValues, profileIndex) => (
                                    <>
                                      {
                                        profileValues.data !== null ? (
                                        <div>
                                          <div className='loyalty-product-other-container__header'>
                                            <div className='loyalty-profilename' title={profileValues.Profile}>{profileValues.Profile}</div>
                                            <div>{profileValues.percentage === null ? 0 : profileValues.percentage}%</div>
                                          </div>
                                          <div className="loyalty-product-other-container__bar" >
                                            { 
                                              profileValues?.data?.map((data, dataIndex) => (
                                                <span id={profileValues.IndicationId} key={dataIndex} onClick={(event) => handleClick(event, dataIndex * 10, accordionIndex, profileIndex, data, profileValues.ProfileId)}>{data}</span>
                                              ))
                                            }
                                          </div>
                                          <div className="loyalty-other-percent-hidden-bar" ></div>
                                          <div className='loyalty-quantity'>{t("estimated number of")} {profileValues.quantity} {t("boxes")}</div>
                                        </div>
                                        ) : <div style={{display: "none"}}></div>
                                      }
                                    </>
                                  ))
                                }
                            </div>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item>
                ) : <div style={{display: "none"}}>
                      <div className='loyalty-product-other-container__item'></div>
                      <div className="loyalty-product-other-percent-hidden-bar"></div>
                    </div>
              }
            </>
          ))
        }
        </Accordion>
      </div>
    </div>
  )
}

export default Other;