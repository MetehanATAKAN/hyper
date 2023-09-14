import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import TableLayout from '../../../../../components/Tables/TableAccordion';

const Body = () => {
    const { t } = useTranslation();

    const [tableData, setTableData] = useState([
        {
            id: 1,
            placeType: 'Hospital',
            placeName: 'Beylikdüzü Hsopital',
        },
        {
            id: 2,
            placeType: 'Hospital',
            placeName: 'Beylikdüzü Hsopital',
        }
    ]);
    const [loader, setLoader] = useState(false);

    const columns = [
        {
            id: 'To',
            header: t('To'),
            columns: [
                {
                    header: t('Place Type'),
                    accessorKey: 'placeType',
                    muiTableBodyCellProps: {
                        align: 'center',
                    }
                },
                {
                    header: t('Place Name'),
                    accessorKey: 'placeName',
                    muiTableBodyCellProps: {
                        align: 'center',
                    }
                }
            ],
        }
    ];

    return (
        // <div className='work-place-table'>
        //     <table>
        //         <tbody>
        //             <tr>
        //                 <td>&nbsp;</td>
        //                 <th>To</th>
        //                 <th></th>
        //             </tr>
        //             <tr>
        //                 <td>&nbsp;</td>
        //                 <td>Place Type</td>
        //                 <td>Place Name</td>
        //             </tr>
        //             <tr>
        //                 <td className='work-place-table__checkbox'>
        //                     {
        //                         <Form.Check 
        //                             type="checkbox"
        //                         />
        //                     }
        //                 </td>
        //                 <td>16</td>
        //                 <td>9</td>
        //             </tr>
        //             <tr>
        //                 <td className='work-place-table__checkbox'>
        //                     {
        //                         <Form.Check 
        //                             type="checkbox"
        //                         />
        //                     }
        //                 </td>
        //                 <td>Mother-in-law</td>
        //                 <td>Me</td>
        //             </tr>
        //             <tr>
        //                 <td className='work-place-table__checkbox'>
        //                     {
        //                         <Form.Check 
        //                             type="checkbox"
        //                         />
        //                     }
        //                 </td>
        //                 <td>Eats everyone's leftovers</td>
        //                 <td>Nibbles at food</td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
        <>
        <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={false}
                // handleDropDownItemClick={statusClick}
                // dropdownOptions={statusOptions}
                // columnPinningRight={['action']}
                // handleNewButton={() => setWorkPlaceAddModal(true)}
                isLoading={loader}
                // filterShow={filterShow}
                // setFilterShow={setFilterShow}
                // handlApplyBtn={getFilterData}
                // handlClearBtn={deleteFilter}
                // handleDeleteBtn={handleDeleteBtn}
                // filter={
                //     <Filter
                //         filterComponentsData={filterComponentsData}
                //         isFilterBtn={false}
                //     />
                // }
            />
        </>
    );
};

export default Body;
