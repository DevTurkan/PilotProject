import React, { useEffect, useState, useRef } from "react";
import { Button } from 'antd';
import 'react-tabulator/lib/styles.css';
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
// import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from 'react-tabulator'
import { utils, read } from "xlsx"
import "react-tabulator/css/tabulator_simple.min.css";
import PieChart from "../charts/piechart"
import BarChart from "../charts/barchart"
import ModalComponent from "../modal/modal"

function Tabulator() {
    const [excelData, setExcelData] = useState([]);
    const [pieChart, setPieChart] = useState(false);
    const [barChart, setBarChart] = useState(false);
    const [npenrow, setnpenrow] = useState(null);

    const [penrow, setpenrow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectData, setSelectData] = useState(null);
    const [inputData, setInputData] = useState(null)


    const handleCancel = () => {
        setIsModalOpen(false);
        setInputData(null);
        setSelectData(null);
        setpenrow(null)
    };


    const showModal = () => {
        if (excelData.length) {
            setIsModalOpen(true);
        }
    };

    const handleChange = (e) => {
        setInputData(e.target.value)
    }

    const handleSelect = (value) => {
        setSelectData(value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setExcelData([...excelData, { id: excelData[0].id + 1, len: Number(inputData), wkt: "LINESTRING(50.5346543456789 40.434546446475, 50.5325434545654 40.9876543567654345)", status: Number(selectData) }])
        handleCancel();
    };

    const editModal = (rowid) => {
        let editrow = excelData?.filter((info) => info.id == rowid);
        setSelectData(`${editrow?.map((rr) => rr.status)}`)
        setInputData(`${editrow?.map((rr) => rr.len)}`)
        setpenrow(rowid);
        setIsModalOpen(true)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setExcelData(
            excelData?.map((row) => {
                if (row.id != penrow) {
                    return row
                }
                else {
                    return { ...row, len: Number(inputData), status: Number(selectData) };

                }
            })
        )
        handleCancel();
    }
    const deleteRow = (rowid) => {
        let updateData = excelData?.filter((info) => info.id !== rowid);
        setExcelData(updateData)
    }

    const fileInput = useRef(null);
    const handleButtonClick = () => {
        fileInput.current.click();
    };

    const file_type = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    const handleImport = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && file_type.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const workbook = read(e.target.result);
                    const sheet = workbook.SheetNames;
                    if (sheet.length) {
                        const data = utils.sheet_to_json(workbook.Sheets[sheet[0]])
                        setExcelData(data)
                    }
                }
                reader.readAsArrayBuffer(selectedFile)
            } else {
                console.log("Not EXCEL file")
            }

        }
    }
    var locButton = function (cell, formatterParams, onRendered) {
        return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
    };

    var deleteButton = function (cell, formatterParams, onRendered) {
        return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>'
    };
    var editButton = function (cell, formatterParams, onRendered) {
        return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>';
    };
    const columns = [
        { title: "id", field: "id", width: 150, headerFilter: "input", headerFilterPlaceholder: "Ara.." },
        { title: "len", field: "len", width: 150, headerFilter: "input", headerFilterPlaceholder: "Ara.." },
        { title: "wkt", field: "wkt", width: 150, headerFilter: "input", headerFilterPlaceholder: "Ara.." },
        { title: "status", field: "status", width: 150, headerFilter: "input", headerFilterPlaceholder: "Ara.." },
        { formatter: locButton, headerSort: false, hozAlign: "center", cellClick: (e, cell) => { deleteRow(cell.getRow().getData().id) } },
        { formatter: deleteButton, headerSort: false, hozAlign: "center", cellClick: (e, cell) => { deleteRow(cell.getRow().getData().id) } },
        { formatter: editButton, headerSort: false, hozAlign: "center", cellClick: (e, cell) => { editModal(cell.getRow().getData().id) } },
    ];

    useEffect(() => {
        excelData.sort((p1, p2) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0);
    }, [excelData])


    return (
        <>
            <div className="site-container">
                <div className="buttons">
                    <div className="import-section">
                        <input ref={fileInput} className="file-inp" type={"file"} onChange={handleImport} />
                        <Button className="load-btn" type="primary" onClick={handleButtonClick}>
                            Load Excel File
                        </Button>
                    </div>
                    <Button className="add-btn" type="primary" onClick={showModal}>
                        Add New Data
                    </Button>
                </div>
                <div className="data">
                    {
                        excelData.length ?
                            <ReactTabulator
                                data={excelData}
                                columns={columns}
                                options={{ pagination: "local", paginationSizeSelector: [5, 10, 15], paginationSize: 10, paginationCounter: "rows" }}
                            />
                            : "Not data"
                    }

                </div>

                {excelData.length ?

                    <div className="buttons">
                        <Button className="analysis1" type="primary" onClick={() => { setPieChart(true); setBarChart(false) }}>
                            Analiz 1
                        </Button>
                        <Button type="primary" onClick={() => { setBarChart(true); setPieChart(false) }}>
                            Analiz 2
                        </Button>
                    </div>
                    : ""

                }

                <div className="charts">
                    {
                        pieChart ? <PieChart excelData={excelData} /> : barChart ? <BarChart excelData={excelData} /> : ""
                    }
                </div>
                {/* 
                    
                */}
            </div>


            <ModalComponent
                isModalOpen={isModalOpen}
                penrow={penrow}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                inputData={inputData}
                handleChange={handleChange}
                handleSelect={handleSelect}
                selectData={selectData}
            />
        </>
    );
}

export default Tabulator;
