const geometric_shapes = "■□▢▣▤▥▦▧▨▩▪▫▬▭▮\
▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇\
◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠\
◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹\
◺◻◼◽◾◿";

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

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function fill_occupied_cell(htmlToFillContentsInMatrices, postHtmlToFillInCells, nCell) {
    console.log(`filling occupied cell with...`);
    const element_selection = document.getElementById("element_selection").value;
    if (element_selection === "Matrices") {
        htmlToFillContentsInMatrices += '<td id="cell' + nCell + '" class="blue"' + postHtmlToFillInCells;
    } else if (element_selection === "Colores") {
        const color = assign_n_colors(4);
        htmlToFillContentsInMatrices += '<td id="cell' + nCell + '" class="' + color + '"' + postHtmlToFillInCells;
    } else if (element_selection === "Números") {
        const color = assign_n_colors(2);
        postHtmlToFillInCells = ' style=\
            "color:' + color + ';font-size:100px;font-weight:bolder;width:120px;height:120px;"\
            >' + Math.floor(10 * Math.random()) + '</td>';
        htmlToFillContentsInMatrices += '<td id="cell' + nCell + '" ' + postHtmlToFillInCells;
    } else if (element_selection === "Figuras") {
        const elements_number = parseInt(document.getElementById("elements_number").innerText, 10);
        const figure = assign_n_figures(elements_number);
        postHtmlToFillInCells = ' style=font-size:100px;font-weight:bolder;width:120px;height:120px;"\
            >' + figure + '</td>';
        htmlToFillContentsInMatrices += '<td id="cell' + nCell + '" ' + postHtmlToFillInCells;
    }
    console.log(`htmlToFillContentsInMatrices ${htmlToFillContentsInMatrices}`)
    return htmlToFillContentsInMatrices;
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

async function fill_matrix(cols_size, rows_size) {
    return new Promise(async function(resolve, reject) {
        let counter = 0;
        let htmlToFillContentsInMatrices;
        const element_selection = document.getElementById("element_selection").value;
        const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1), 10);
        const elements_number = parseInt(document.getElementById("elements_number").innerText, 10);
        let postHtmlToFillInCells;
        if (element_selection === "Matrices") {
            postHtmlToFillInCells = ' style=\
            "width:120px;height:120px;border:2px solid #282a2e;"\
            ></td>';
        }
        let rows_count = 0;
        const n_cells = cols_size * rows_size;

        let cellsRef = Array.from({ length: n_cells }, (v, i) => i)
        shuffle(cellsRef)
        htmlToFillContentsInMatrices = "";

        Array.from({ length: n_cells }, (v, i) => i).map(async function(nCellsRef) {
            if (nCellsRef % cols_size === 0) {
                htmlToFillContentsInMatrices += '<tr>';
            }
            if (nCellsRef < elements_number) {
                htmlToFillContentsInMatrices += fill_occupied_cell(htmlToFillContentsInMatrices, postHtmlToFillInCells, cellsRef[nCellsRef]);
                counter += 1;
                console.log(`filling occupied cell; counter = ${counter}; cell = ${cellsRef[nCellsRef]}`);
            } else {
                postHtmlToFillInCells = fill_blank_cell(element_selection);
                htmlToFillContentsInMatrices += '<td id="cell' + cellsRef[nCellsRef] + '" ' + postHtmlToFillInCells;
            }
            if (nCellsRef % cols_size === 0) {
                htmlToFillContentsInMatrices += '</tr>';
            }
            if (counter === elements_number) {
                resolve(htmlToFillContentsInMatrices);
            }
        });
    });
}

async function generate_matrix(cols_size, rows_size, callback) {
    return new Promise(async function(resolve, reject) {
        let htmlToFillInMatrices = '<td align="center" valign="middle">';
        htmlToFillInMatrices += '<table id="matrix_table">';
        const htmlToFillContentsInMatrices = await fill_matrix(cols_size, rows_size);
        console.log(`htmlToFillContentsInMatrices ${htmlToFillContentsInMatrices}`)
        htmlToFillInMatrices += htmlToFillContentsInMatrices;
        htmlToFillInMatrices += '</table>';
        htmlToFillInMatrices += '</td>';
        document.getElementById('exercise_placeholder').innerHTML = htmlToFillInMatrices
        const exposition_milliseconds = parseInt(
            document.getElementById("exposition_seconds_placeholder").innerText * 1000, 10
        )
        document.getElementById("run_simulation_button").disabled = true;
        //setTimeout(() => {
        //    document.getElementById('exercise_placeholder').innerHTML = "";
        //    document.getElementById("run_simulation_button").disabled = false;
        //    resolve(true)
        //}, exposition_milliseconds);
    })

}

function inform_option_not_implemented(exercise_selection, element_selection) {
    document.getElementById('exercise_placeholder').innerText =
        "Opción de ejercicio " + exercise_selection +
        " con los elementos " + element_selection +
        " aún no implementada.";
}

async function run_simulation() {
    const exercise_selection = document.getElementById("exercise_selection").value;
    const element_selection = document.getElementById("element_selection").value;
    const cols_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1), 10);
    const rows_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1), 10);
    if (exercise_selection === "Memoria") {
        document.getElementById("title_placeholder").innerText = "";
        await generate_matrix(cols_size, rows_size);
    } else if (exercise_selection === "Aritmética") {
        document.getElementById("title_placeholder").innerText = "";
        if (element_selection === "Números") {
            await generate_matrix(cols_size, rows_size);
        } else {
            inform_option_not_implemented(exercise_selection, element_selection)
        }
    } else if (exercise_selection === "Puzzle visual") {
        if (element_selection === "Figuras") {
            await generate_matrix(cols_size, rows_size)
            const elements_number = parseInt(document.getElementById("elements_number").innerText, 10);
            const figure = assign_n_figures(elements_number);
            const direction = assign_random_direction();
            document.getElementById("title_placeholder").innerText = figure + " " + direction;
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