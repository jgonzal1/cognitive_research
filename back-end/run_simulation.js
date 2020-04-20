const geometric_shapes = "■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ \
▯ ▰ ▱ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◆ ◇ \
◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ \
◡ ◢ ◣ ◤ ◥ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ◰ ◱ ◲ ◳ ◴ ◵ ◶ ◷ ◸ ◹ \
◺ ◻ ◼ ◽ ◾ ◿";

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
                    } else if (element_selection === "Colores") {
                        let color;
                        const color_selector = Math.random()
                        if (color_selector < 0.25) {
                            color = "red"
                        } else if (color_selector >= 0.25 & color_selector < 0.5) {
                            color = "yellow"
                        } else if (color_selector >= 0.5 & color_selector < 0.75) {
                            color = "blue"
                        } else if (color_selector >= 0.75 & color_selector < 1) {
                            color = "purple"
                        } else {
                            color = "white"
                        }
                        htmlToFillColorsInMatrices += prevHtmlToFillInCells + 'class="' + color + '"' + postHtmlToFillInCells;
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
                    } else if (element_selection === "Figuras") {
                        let figure;
                        const figure_selector = Math.random()
                        if (figure_selector < 0.33) {
                            figure = "▲"
                        } else if (figure_selector > 0.66) {
                            figure = "◉"
                        } else {
                            figure = "■"
                        }
                        postHtmlToFillInCells = 'style=font-size:100px;font-weight:bolder;width:120px;height:120px;"\
                        >' + figure + '</td>';
                        htmlToFillColorsInMatrices += prevHtmlToFillInCells + postHtmlToFillInCells;
                    }
                    counter += 1
                } else {
                    if (
                        element_selection === "Colores" ||
                        element_selection === "Matrices"
                    ) {
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
        document.getElementById("title_placeholder").innerText = "";
        generate_matrix(matrix_size);
    } else if (exercise_selection === "Aritmética") {
        document.getElementById("title_placeholder").innerText = "";
        if (element_selection === "Números") {
            generate_matrix(matrix_size);
        } else {
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else if (exercise_selection === "Habilidad visioespacial") {
        if (element_selection === "Figuras") {
            let direction;
            const direction_selector = Math.random()
            if (direction_selector < 0.25) {
                direction = "→"
            } else if (direction_selector >= 0.25 & direction_selector < 0.5) {
                direction = "↓"
            } else if (direction_selector >= 0.5 & direction_selector < 0.75) {
                direction = "←"
            } else if (direction_selector >= 0.75 & direction_selector < 1) {
                direction = "↑"
            } else {
                direction = "→"
            }
            let figure;
            const figure_selector = Math.random()
            if (figure_selector < 0.33) {
                figure = "▲"
            } else if (figure_selector > 0.66) {
                figure = "◉"
            } else {
                figure = "■"
            }
            document.getElementById("title_placeholder").innerText = figure + " " + direction;
            generate_matrix(matrix_size);
        } else {
            document.getElementById("title_placeholder").innerText = "";
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else {
        document.getElementById("title_placeholder").innerText = "";
        inform_option_not_implemented(exercise_selection, element_selection)
    }
    console.log(`exercise_selection === ${exercise_selection}, element_selection === ${element_selection})`)
}