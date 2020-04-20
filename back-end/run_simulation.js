function fill_matrix(rows_size, cols_size = rows_size, callback) {
    let counter = 0;
    let htmlToFillColorsInMatrices;
    const prevHtmlToFillInCells = '<td ';
    const element_selection = document.getElementById("element_selection").value;
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1));
    const elements_number = parseInt(document.getElementById("elements_number").innerText);
    let postHtmlToFillInCells;
    if (element_selection === "Matrices") {
        postHtmlToFillInCells = 'style=\
        "width:120px;height:120px;border:2px solid #282a2e;"\
        ></td>';
    }
    const p_fill = (1 - (elements_number / 18 /*(matrix_size ^ 2) * 2*/ ));
    console.log(matrix_size + " " + p_fill)
    while (counter < elements_number) {
        counter = 0;
        htmlToFillColorsInMatrices = "";
        for (i = 0; i < rows_size; i++) {
            htmlToFillColorsInMatrices += '<tr>';
            for (j = 0; j < cols_size; j++) {
                if (Math.random() > p_fill) {
                    if (element_selection === "Matrices") {
                        htmlToFillColorsInMatrices += prevHtmlToFillInCells + 'class="blue"' + postHtmlToFillInCells;
                    } else if (element_selection === "Números") {
                        let color;
                        if (Math.random() < 0.5) {
                            color = "#A54242"
                        } else {
                            color = "#5E8D87"
                        }
                        postHtmlToFillInCells = 'style=\
                        "color:' + color + ';font-size:100px;font-weight:bolder;width:120px;height:120px;"\
                        >' + Math.floor(10 * Math.random()) + '</td>';
                        htmlToFillColorsInMatrices += prevHtmlToFillInCells + postHtmlToFillInCells;
                    }
                    counter += 1
                } else {
                    if (element_selection === "Matrices") {
                        postHtmlToFillInCells = 'style=\
                            "width:120px;height:120px;border:2px solid #282a2e;"\
                            ></td>';
                    } else {
                        postHtmlToFillInCells = 'style=\
                            "width:120px;height:120px;"></td>';
                    }
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

function inform_option_not_implemented(exercise_selection, element_selection) {
    document.getElementById('exercise_placeholder').innerText =
        "Opción de ejercicio " + exercise_selection +
        " con los elementos " + element_selection +
        " aún no implementada.";
}

function runSimulation() {
    const exercise_selection = document.getElementById("exercise_selection").value;
    const element_selection = document.getElementById("element_selection").value;
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1));
    if (exercise_selection === "Memoria rápida") {
        if (element_selection === "Matrices") {
            generate_matrix(matrix_size);
        } else {
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else if (exercise_selection === "Aritmética") {
        if (element_selection === "Figuras") {
            console.log(1)
        } else if (element_selection === "Números") {
            generate_matrix(matrix_size);
        } else {
            console.log(3)
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else {
        console.log(4)
        inform_option_not_implemented(exercise_selection, element_selection)
    }
    console.log(`exercise_selection === ${exercise_selection}, element_selection === ${element_selection})`)
}