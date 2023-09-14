import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const WantsPercent = ({ wantsName, setWantsName, setButtonDisable, setPostWants }) => {

  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);

  
  useEffect(() => {
    let addWants = 0;
    wantsName.forEach((item, index) => {
      if (item.percent !== null) {
        addWants++;
        if (item.percent === 0) {
          changeColor(
            index,
            0,
            "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
          );
        } else if (item.percent === 10) {
          changeColor(
            index,
            1,
            "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
          );
        } else if (item.percent === 20) {
          changeColor(
            index,
            2,
            "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
          );
        } else if (item.percent === 30) {
          changeColor(
            index,
            3,
            "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
          );
        } else if (item.percent === 40) {
          changeColor(
            index,
            4,
            "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
          );
        } else if (item.percent === 50) {
          changeColor(
            index,
            5,
            "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
          );
        } else if (item.percent === 60) {
          changeColor(
            index,
            6,
            "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
          );
        } else if (item.percent === 70) {
          changeColor(
            index,
            7,
            "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
          );
        } else if (item.percent === 80) {
          changeColor(
            index,
            8,
            "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
          );
        } else if (item.percent === 90) {
          changeColor(
            index,
            9,
            "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
          );
        } else if (item.percent === 100) {
          changeColor(
            index,
            10,
            "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
          );
        }
      }
      else {
        changeColor(
          index,
          0,
          "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
        );
      }
    })
    // Next Button Disabled Condition
    if (addWants >= 0) {
      setButtonDisable({ disable: false, message: null })
    }
   
  }, [wantsName])

  // useEffect(() => {
  //   document.querySelector('.wants-product-container__bar > span:first-of-type').style.backgroundImage= "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)";
  // }, [])
  

  const changeColor = (row, column, color) => {
    let element = document.getElementsByClassName("wants-percent-hidden-bar");
    element[row].style.backgroundImage = color;
    element[row].style.borderTopRightRadius = "0px";
    element[row].style.borderBottomRightRadius = "0px";
    if (column === 10) {
      element[row].style.width = `99.9%`
      element[row].style.borderTopRightRadius = "4px";
      element[row].style.borderBottomRightRadius = "4px";
    } else {
      element[row].style.width = `${(100 / 11) * (column + 1)}%`;
      element[row].style.borderTopRightRadius = "0px";
      element[row].style.borderBottomRightRadius = "0px";
    }
    let span = document.getElementsByClassName("wants-percent-hidden-bar")[row].parentNode.children[1].children
    for (let i = 0; i <= 10; i++) {
      if (i <= column) {
        span[i].style.color = '#F8FEFC';
      } else {
        span[i].style.color = '#6C757D';
      }
    }
  }
  const handleClick = (e, percent) => {
    if(appStatus !== 4){
      const targetId = Number(e.target.id)
      wantsName.forEach((item) => {
        if (item.id === targetId) {
          let arr = wantsName;
          arr?.map((data) => (
            data.id === targetId ? (data.percent = percent) : null
          ))
          setWantsName([...arr]);
        }
      })
    }
  }
  return (
    <div className='wants-product'>
      <div className='wants-product-container'>
        {
          wantsName?.map((data, index) => (
            <div className='wants-product-container__item' key={index}>
              <div className='wants-product-container__header'>{data.name}</div>
              <div className='wants-product-container__bar'>
                {
                  data.percentNumber?.map((percent, index) => (
                    <span 
                    className={index === 0 ? 'wants-first-child' : ''} 
                    key={index} 
                    id={data.id} 
                    onClick={(e) => handleClick(e, percent)} 
                    >
                      {percent}
                    </span>
                  ))
                }
              </div>
              <div className="wants-percent-hidden-bar"></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default WantsPercent