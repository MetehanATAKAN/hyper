import React, { useState } from 'react'
import ProductMixTable from './ProductMixTable'

const ProductMixIndex = () => {

  const [tableData, setTableData] = useState([
    // {id:1,company:'Uzbekistan RO',position:'PM',zz:'metehan',businessUnıte:'ALPHA',sharePercent:20,product:"metehan",share:<input onChange={(e)=>changeShare(e,1)}  type={'number'}/>},
    // {id:2,company:'Uzbekistan RO',position:'PM',zz:'atakan',businessUnıte:'ALPHA',sharePercent:20,product:"atakan",share:<input  onChange={(e)=>changeShare(e,2)} type={'number'}/>},
    // {id:3,company:'Uzbekistan RO',position:'PM',zz:'aaaa',businessUnıte:'ALPHA',sharePercent:20,product:"sada",share:<input onChange={(e)=>changeShare(e,1)}  type={'number'}/>},
    // {id:4,company:'Uzbekistan RO',position:'PM',zz:'bbbb',businessUnıte:'ALPHA',sharePercent:20,product:"as",share:<input  onChange={(e)=>changeShare(e,2)} type={'number'}/>},
  ])

  const [backUpTableData, setBackUpTableData] = useState();


  console.log(tableData);

  const changeShare = (e,id) => {
    console.log(e.target.value);
    console.log(e.target.id);
    console.log(id);

    console.log(backUpTableData);

       tableData?.map(data=>(
          data.id === id 
          ? data.sharePercent = Number(e.target.value)
          : null
        ))

        console.log(tableData);
  }


  
  return (
    <div>
      <ProductMixTable tableData={tableData} setTableData={setTableData} changeShare={changeShare} backUpTableData={backUpTableData} setBackUpTableData={setBackUpTableData} />
    </div>
  )
}

export default ProductMixIndex