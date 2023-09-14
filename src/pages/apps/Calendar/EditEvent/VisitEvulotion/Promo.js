import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function VisitEvulation({ setVisitEvolationsPromo , visitEvolationsPromo, setButtonDisable}) {
  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);
  useEffect(() => {
    let addPromo=0;

    visitEvolationsPromo.forEach((item, index) => {
    if (item.productPercent !== null) {
      addPromo++
      if (item.productPercent === 0) {
        changeColor(
          index,
          0,
          "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
        );
      }else if (item.productPercent === 20) {
        changeColor(
          index,
          1,
          "repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)"
        );
      }else if (item.productPercent === 40) {
        changeColor(
          index,
          2,
          "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
        );
      } else if (item.productPercent === 60) {
        changeColor(
          index,
          3,
          "repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)"
        );
      } else if (item.productPercent === 80) {
        changeColor(
          index,
          4,
          "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
        );
      } else if (item.productPercent === 100) {
        changeColor(
          index,
          5,
          "repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)"
        );
      }
    }
    })
    // Next Button Disabled Condition
    const visitEvolationsPromoLength=visitEvolationsPromo.length;
    if(addPromo === visitEvolationsPromoLength) {
      setButtonDisable({ disable:false, message: null})
    }
    else {
      setButtonDisable({ disable:true, message: t('All promos need to be selected.')})
    }
  }, [visitEvolationsPromo])
  

  const changeColor = (row, column, color) => {
        let element = document.getElementsByClassName("visit-evulotion-promo-percent-hidden-bar");
        element[row].style.backgroundImage = color;
        element[row].style.borderTopRightRadius = "0px";
        element[row].style.borderBottomRightRadius = "0px";
        if (column === 5) {
          element[row].style.width = `99.8%`
          element[row].style.borderTopRightRadius = "4px";
          element[row].style.borderBottomRightRadius = "4px";
        } else {
          element[row].style.width = `${(100 / 6) * (column + 1)}%`;
          element[row].style.borderTopRightRadius = "0px";
          element[row].style.borderBottomRightRadius = "0px";
        }
        let span = document.getElementsByClassName("visit-evulotion-promo-percent-hidden-bar")[row].parentNode.children[1].children
        for (let i = 0; i <= 5; i++) {
          if(i <= column){
            span[i].style.color = '#F8FEFC';
          }else{
            span[i].style.color = '#6C757D';
          }
        }
  }

  const handleClick = (event, percent) => {
    if(appStatus !== 4){
      visitEvolationsPromo.forEach((item) => {
        if(item.productId === Number(event.target.id)){
          let arr = visitEvolationsPromo;
          arr?.map((data)=>(
            data.productId===Number(event.target.id)
            ?data.productPercent=percent
            :null
          ))
          setVisitEvolationsPromo([...arr])
        }
      })
    }
  }
  return (
      <div className='visit-evulotion'>
        <div className='visit-evulotion__headers nav-tabs'>
          <div className='nav-item nav-link active ' aria-selected="true" role="tab" aria-controls="home">{t('Promo')}</div>
          <div className='nav-item'>{t('Non- Promo')}</div>
          <div className='nav-item'>{t('Other')}</div>
        </div>
        <div className='visit-evulotion-container'>
          {
            visitEvolationsPromo?.map((item, index) => (
              <div className='visit-evulotion-container__item' key={index}>
                <div className='visit-evulotion-container__header'>{item.productName}</div>
                <div className="visit-evulotion-container__bar" >
                  <span id={item.productId} onClick={(event)=> handleClick(event, 0)}>0%</span>
                  <span id={item.productId} onClick={(event)=> handleClick(event, 20)}>20%</span>
                  <span id={item.productId} onClick={(event)=> handleClick(event, 40)}>40%</span>
                  <span id={item.productId} onClick={(event)=> handleClick(event, 60)}>60%</span>
                  <span id={item.productId} onClick={(event)=> handleClick(event, 80)}>80%</span>
                  <span id={item.productId} onClick={(event)=> handleClick(event, 100)}>100%</span>
                </div>
                <div className="visit-evulotion-promo-percent-hidden-bar"></div>
              </div>
            ))
          }
        </div>
      </div>
  );
}

export default VisitEvulation;