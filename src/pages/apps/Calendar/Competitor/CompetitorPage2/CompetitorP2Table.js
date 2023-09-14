import React from 'react';

const CompetitorP2Table = (props) => {
    const { data, index, changeInput, deleteCompetitor } = props;
    return (
        <tr key={index}>
            <td>{data.competitorBrandName}</td>
            <td>
                <input
                    className="form-control-add-pharmacy"
                    min="1"
                    max="100"
                    type="number"
                    id={`${index} ${data.competitorBrandId}`}
                    name="quantity"
                    value={`${data.competitorBrandPercent}`}
                    onChange={changeInput}
                />
            </td>
            <td>
                <button className="delete-cmp" onClick={deleteCompetitor}>
                    <i className="fas fa-trash" id={`${index} ${data.competitorBrandId}`}></i>
                </button>
            </td>
        </tr>
    );
};

export default React.memo(CompetitorP2Table);
