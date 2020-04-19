function fill_matrix(rows_size, cols_size = rows_size, callback) {
    let counter = 0;
    let htmlToFillColorsInMatrices;
    const prevHtmlToFillInCells = '<td ';
    const postHtmlToFillInCells = 'style=\
    "width:120px;height:120px;border:2px solid #282a2e;"\
    ></td>';
    const elements_number = parseInt(document.getElementById("elements_number").innerText);
    const p_fill = (1 - (elements_number / 18));
    while (counter < elements_number) {
        counter = 0;
        htmlToFillColorsInMatrices = "";
        for (i = 0; i < rows_size; i++) {
            htmlToFillColorsInMatrices += '<tr>';
            for (j = 0; j < cols_size; j++) {
                if (Math.random() > p_fill) {
                    htmlToFillColorsInMatrices += prevHtmlToFillInCells + 'class="blue" ' + postHtmlToFillInCells;
                    counter += 1
                } else {
                    htmlToFillColorsInMatrices += prevHtmlToFillInCells + postHtmlToFillInCells;
                }
            }
            htmlToFillColorsInMatrices += '</tr>';
        }
        if (counter === elements_number) {
            callback(htmlToFillColorsInMatrices)
        }
    }
}

function generate_matrix(rows_size, cols_size = rows_size) {
    let htmlToFillInMatrices = '<td align="center" valign="middle">';
    htmlToFillInMatrices += '<table id="matrix_table">';
    fill_matrix(rows_size, cols_size, function(htmlToFillColorsInMatrices) {
        htmlToFillInMatrices += htmlToFillColorsInMatrices;
        htmlToFillInMatrices += '</table>';
        htmlToFillInMatrices += '</td>';
        document.getElementById('exercise_placeholder').innerHTML = ""
        setTimeout(() => {
            document.getElementById('exercise_placeholder').innerHTML = htmlToFillInMatrices;
        }, 50);
    })
}

function runSimulation() {
    const exercise_selection = document.getElementById("exercise_selection").value;
    const element_selection = document.getElementById("element_selection").value;
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1));
    // const elements_number = parseInt(document.getElementById("elements_number").innerText);
    // console.log("Exercise selection: " + exercise_selection);
    // console.log("Element selection: " + element_selection);
    // console.log("matrix_size selection: " + matrix_size);
    // console.log("elements_number selection: " + elements_number);
    if (exercise_selection === "Memoria rápida") {
        if (element_selection === "Matrices") {
            generate_matrix(matrix_size);
        }
    }
}