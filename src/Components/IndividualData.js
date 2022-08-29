import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.ProductID}</th>
            <th>{individualExcelData.ProductName}</th>
            <th>{individualExcelData.Price}</th>
            <th>{individualExcelData.Instock}</th>
            <th>{individualExcelData.Discontinued}</th>
        </>
    )
}