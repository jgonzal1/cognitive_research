const geometric_shapes = "■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ \
▯ ▰ ▱ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◆ ◇ \
◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ \
◡ ◢ ◣ ◤ ◥ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ◰ ◱ ◲ ◳ ◴ ◵ ◶ ◷ ◸ ◹ \
◺ ◻ ◼ ◽ ◾ ◿";

function assign_n_colors(n) {
    const color_selector = Math.floor(n * Math.random());
    if (color_selector == 0) {
        color = "blue";
    } else if (color_selector == 1) {
        color = "red";
    } else if (color_selector == 2) {
        color = "yellow";
    } else if (color_selector == 3) {
        color = "purple";
    } else {
        color = "black";
    }
    return color;
}

function assign_n_figures(n) {
    let figure;
    const figure_selector = Math.floor(n * Math.random());
    if (figure_selector == 1) {
        figure = "◉";
    } else if (figure_selector == 2) {
        figure = "▲";
    } else {
        figure = "■";
    }
    return figure;
}

function fill_occupied_cell(htmlToFillContentsInMatrices, postHtmlToFillInCells) {
    const element_selection = document.getElementById("element_selection").value;
    if (element_selection === "Matrices") {
        htmlToFillContentsInMatrices += '<td class="blue"' + postHtmlToFillInCells;
    } else if (element_selection === "Colores") {
        const color = assign_n_colors(4);
        htmlToFillContentsInMatrices += '<td class="' + color + '"' + postHtmlToFillInCells;
    } else if (element_selection === "Números") {
        const color = assign_n_colors(2);
        postHtmlToFillInCells = 'style=\
        "color:' + color + ';font-size:100px;font-weight:bolder;width:120px;height:120px;"\
        >' + Math.floor(10 * Math.random()) + '</td>';
        htmlToFillContentsInMatrices += '<td ' + postHtmlToFillInCells;
    } else if (element_selection === "Figuras") {
        const figure = assign_n_figures(3);
        postHtmlToFillInCells = 'style=font-size:100px;font-weight:bolder;width:120px;height:120px;"\
        >' + figure + '</td>';
        htmlToFillContentsInMatrices += '<td ' + postHtmlToFillInCells;
    }
    return htmlToFillContentsInMatrices
}

function fill_blank_cell(element_selection) {
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
    return postHtmlToFillInCells;
}

function fill_matrix(rows_size, cols_size = rows_size, callback) {
    let counter = 0;
    let htmlToFillContentsInMatrices;
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
        htmlToFillContentsInMatrices = "";
        for (i = 0; i < rows_size; i++) {
            htmlToFillContentsInMatrices += '<tr>';
            for (j = 0; j < cols_size; j++) {
                if (Math.random() > p_fill) {
                    htmlToFillContentsInMatrices = fill_occupied_cell(htmlToFillContentsInMatrices, postHtmlToFillInCells)
                    counter += 1
                } else {
                    postHtmlToFillInCells = fill_blank_cell(element_selection)
                    htmlToFillContentsInMatrices += prevHtmlToFillInCells + postHtmlToFillInCells;
                }
            }
            htmlToFillContentsInMatrices += '</tr>';
        }
        if (counter === elements_number) {
            callback(htmlToFillContentsInMatrices)
        }
    }
}

function generate_matrix(rows_size, cols_size = rows_size) {
    let htmlToFillInMatrices = '<td align="center" valign="middle">';
    htmlToFillInMatrices += '<table id="matrix_table">';
    fill_matrix(rows_size, cols_size, function(htmlToFillContentsInMatrices) {
        htmlToFillInMatrices += htmlToFillContentsInMatrices;
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

function run_simulation() {
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