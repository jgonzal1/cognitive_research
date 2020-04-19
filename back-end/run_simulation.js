function generate_matrix(rows_size, cols_size = rows_size) {
    const htmlToFillInCells = '<td style=\
    "background-color:#f0c674;width:5px;height:5px"\
    ></td>';
    let htmlToFillInMatrices = '<td align="center" valign="middle">';
    htmlToFillInMatrices += '<table id="matrix_table">';
    for (i = 0; i < rows_size; i++) {
        htmlToFillInMatrices += '<tr style="">';
        for (j = 0; j < cols_size; j++) {
            htmlToFillInMatrices += '<td>' + htmlToFillInCells + '</td>';
        }
        htmlToFillInMatrices += '</tr>'
    }
    htmlToFillInMatrices += '</table>';
    htmlToFillInMatrices += '</td>';
    document.getElementById('exercise_placeholder').innerHTML = htmlToFillInMatrices;
}

function runSimulation() {
    const exercise_selection = document.getElementById("exercise_selection").value;
    const element_selection = document.getElementById("element_selection").value;
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1));
    const elements_number = parseInt(document.getElementById("elements_number").innerText);
    console.log("Exercise selection: " + exercise_selection);
    console.log("Element selection: " + element_selection);
    console.log("matrix_size selection: " + matrix_size);
    console.log("elements_number selection: " + elements_number);
    if (exercise_selection === "Memoria rápida") {
        if (element_selection === "Matrices") {
            generate_matrix(matrix_size);
        }
    }
}