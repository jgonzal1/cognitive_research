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
    } else if (figure_selector == 3) {
        figure = "■";
    } else if (figure_selector == 4) {
        figure = "◯";
    } else if (figure_selector == 5) {
        figure = "△";
    } else {
        figure = "▭";
    }
    return figure;
}

function assign_random_direction() {
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
    return direction
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
        postHtmlToFillInCells = ' style=\
        "color:' + color + ';font-size:100px;font-weight:bolder;width:120px;height:120px;"\
        >' + Math.floor(10 * Math.random()) + '</td>';
        htmlToFillContentsInMatrices += '<td ' + postHtmlToFillInCells;
    } else if (element_selection === "Figuras") {
        const elements_number = parseInt(document.getElementById("elements_number").innerText);
        const figure = assign_n_figures(elements_number);
        postHtmlToFillInCells = ' style=font-size:100px;font-weight:bolder;width:120px;height:120px;"\
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
        postHtmlToFillInCells = ' style=\
            "width:120px;height:120px;border:2px solid #282a2e;"\
            ></td>';
    } else {
        postHtmlToFillInCells = ' style=\
            "width:120px;height:120px;"></td>';
    }
    return postHtmlToFillInCells;
}

function fill_row(counter, htmlToFillContentsInMatrices, postHtmlToFillInCells) {
    const elements_number = parseInt(document.getElementById("elements_number").innerText);
    const p_fill = (1 - (elements_number / 18 /*(matrix_size ^ 2) * 2*/ ));
    if (Math.random() > p_fill) {
        htmlToFillContentsInMatrices = fill_occupied_cell(htmlToFillContentsInMatrices, postHtmlToFillInCells)
        counter += 1
    } else {
        postHtmlToFillInCells = fill_blank_cell(element_selection)
        htmlToFillContentsInMatrices += '<td ' + postHtmlToFillInCells;
    }
    return [counter, htmlToFillContentsInMatrices]
}

function fill_matrix(rows_size, cols_size = rows_size, callback) {
    let counter = 0;
    let htmlToFillContentsInMatrices;
    const element_selection = document.getElementById("element_selection").value;
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1));
    const elements_number = parseInt(document.getElementById("elements_number").innerText);
    let postHtmlToFillInCells;
    if (element_selection === "Matrices") {
        postHtmlToFillInCells = ' style=\
        "width:120px;height:120px;border:2px solid #282a2e;"\
        ></td>';
    }
    while (counter < elements_number) {
        counter = 0;
        htmlToFillContentsInMatrices = "";
        for (i = 0; i < rows_size; i++) {
            htmlToFillContentsInMatrices += '<tr>';
            for (j = 0; j < cols_size; j++) {
                console.log(`Atrapado`);
                [counter, htmlToFillContentsInMatrices] = fill_row(counter, htmlToFillContentsInMatrices, postHtmlToFillInCells);
            }
            htmlToFillContentsInMatrices += '</tr>';
        }
        if (counter === elements_number) {
            callback(htmlToFillContentsInMatrices)
        }
    }
}

function generate_matrix(rows_size, cols_size = rows_size, callback) {
    let htmlToFillInMatrices = '<td align="center" valign="middle">';
    htmlToFillInMatrices += '<table id="matrix_table">';
    fill_matrix(rows_size, cols_size, function(htmlToFillContentsInMatrices) {
        console.log(`terminado fill_matrix`)
        htmlToFillInMatrices += htmlToFillContentsInMatrices;
        htmlToFillInMatrices += '</table>';
        htmlToFillInMatrices += '</td>';
        document.getElementById('exercise_placeholder').innerHTML = htmlToFillInMatrices
        const exposition_milliseconds = parseInt(document.getElementById("exposition_seconds_placeholder").innerText * 1000)
        document.getElementById("run_simulation_button").disabled = true;
        setTimeout(() => {
            document.getElementById('exercise_placeholder').innerHTML = "";
            document.getElementById("run_simulation_button").disabled = false;
            callback(true)
        }, exposition_milliseconds);
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
    if (exercise_selection === "Memoria") {
        document.getElementById("title_placeholder").innerText = "";
        generate_matrix(matrix_size, function() {});
    } else if (exercise_selection === "Aritmética") {
        document.getElementById("title_placeholder").innerText = "";
        if (element_selection === "Números") {
            generate_matrix(matrix_size, function() {});
        } else {
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else if (exercise_selection === "Puzzle visual") {
        if (element_selection === "Figuras") {
            generate_matrix(matrix_size, function() {
                const elements_number = parseInt(document.getElementById("elements_number").innerText);
                const figure = assign_n_figures(elements_number);
                const direction = assign_random_direction();
                document.getElementById("title_placeholder").innerText = figure + " " + direction;
            });
        } else {
            document.getElementById("title_placeholder").innerText = "";
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else {
        document.getElementById("title_placeholder").innerText = "";
        inform_option_not_implemented(exercise_selection, element_selection)
    }
    // console.log(`exercise_selection === ${exercise_selection}, element_selection === ${element_selection})`)
}