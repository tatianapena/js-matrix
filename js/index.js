const errorDiv = document.querySelector(".js-error");
const table = document.querySelector(".js-myTable");


function go() {
    const row = document.querySelector(".js-row").value;
    const col = document.querySelector(".js-col").value;
    createTable(row, col);
}


function createTable(rows, columns) {
    table.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < columns; j++) {
            createCell(row, i, j);
        }

        const lastCol = row.insertCell(columns);
        lastCol.innerText = "0";
    }

    // Row to show results
    const lastRow = table.insertRow(rows);
    for (let i = 0; i < columns; i++) {
        const col = lastRow.insertCell(i);
        col.innerText = "0";
    }
}

function createCell(row, rowIndex, colIndex) {
    const cell = row.insertCell(colIndex);
    cell.append(createInputCell(rowIndex, colIndex));
}

function createInputCell(rowIndex, colIndex) {
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.placeholder = "Ingrese un numero para la suma";
    inputElement.id = `${rowIndex}-${colIndex}`;
    inputElement.className = "input"
    inputElement.value = "0"
    inputElement.addEventListener('input', updateCellValue);

    return inputElement;
}

function updateCellValue(e) {
    const id = e.target.id;
    const [rowIndex, colIndex] = id.split('-');

    const rowsLength =  table.rows.length;
    const columnsLength = table.rows[0].cells.length;

    let sumRow = 0;
    const row = table.rows[rowIndex];
    for (let i = 0; i < columnsLength - 1; i++) {
        const input = row.cells[i].querySelector("input")
        sumRow += parseInt(input.value);
    }

    let sumCol = 0;
    for (let i = 0; i < rowsLength - 1; i++) {
        const row = table.rows[i];
        const input = row.cells[colIndex].querySelector("input")
        sumCol += parseInt(input.value);
    }

    const lastCellRow = row.cells[columnsLength - 1];
    lastCellRow.innerHTML = sumRow;


    const lastCellCol = table.rows[rowsLength - 1].cells[colIndex];
    lastCellCol.innerHTML = sumCol;

    validateSum(rowsLength, columnsLength);
}

function validateSum(rowsLength, colsLength) {
    for (let i = 0; i < rowsLength - 1; i++) {
        const row = table.rows[i];
        const lastCell = row.cells[colsLength - 1];
        const value = parseInt(lastCell.innerHTML);
        const errorMsg = `la fila ${i} excede el maximo de 100`;
        const id = `row-${i}`;
        
        checkValue(errorMsg, id, value);
    }

    const row = table.rows[rowsLength - 1];
    for (let i = 0; i < colsLength - 1; i++) {
        const lastCell = row.cells[i];
        const value = parseInt(lastCell.innerHTML);
        const errorMsg = `la columna ${i} excede el maximo de 100`;
        const id = `col-${i}`;
        
        checkValue(errorMsg, id, value);
    }

}

function checkValue(errorMsg, id, value) {
    if (value > 100) {
        addError(errorMsg, id);
    } else {
        deleteError(id);
    }
}

function addError(msg, id) {
    const elem = document.querySelector(`#${id}`);
    if (elem) {
        return;
    }

    const p = document.createElement("p");
    p.innerText = msg;
    p.id = id;

    errorDiv.appendChild(p);
}

function deleteError(id) {
    const elem = document.querySelector(`#${id}`);
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}

function printError(msg) {
    errorDiv.innerHTML = msg;
}