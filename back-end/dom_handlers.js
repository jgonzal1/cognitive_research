$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
const exposition_seconds_slider = document.getElementById("exposition_seconds_slider");
const exposition_seconds = document.getElementById("exposition_seconds_placeholder");
exposition_seconds.innerText = 2; // initial value (defaults 50)
exposition_seconds_slider.oninput = function() {
    exposition_seconds.innerText = (this.value / 25) + 0.001;
}

const matrix_size_dropdown = document.getElementById("matrix_size_dropdown");
matrix_size_dropdown.onmouseout = function() {
    const matrix_size = parseInt(document.getElementById("matrix_size").innerText.substring(0, 1), 10);
    if (matrix_size < 5) {
        document.getElementById("elements_number_dropdown_span").style.display = "inline"
        document.getElementById("elements_number_slider_span").style.display = "none"
    } else {
        document.getElementById("elements_number_dropdown_span").style.display = "none"
        document.getElementById("elements_number_slider_span").style.display = "inline"
    }
}

const elements_number_slider = document.getElementById("elements_number_slider");
const elements_number = document.getElementById("elements_number_placeholder");
elements_number.innerText = 25; // initial value (defaults 50)
elements_number_slider.oninput = function() {
    elements_number.innerText = this.value / 2;
}

const milliseconds_in_a_day = 1000 * 60 * 60 * 24;
new Date(new Date() - new Date(2020, 2, 3)) / (1000 * 60 * 60 * 24); // diferencia en días
var myTags = dummy_list.map(function(el) {
    return {
        text: el["name"],
        weight: Math.round(new Date(el["endDate"] - el["startDate"]) / milliseconds_in_a_day)
    }
});
/*word_cloud $("#dummy_list_word_cloud_placeholder").jQCloud(
    myTags, {
        //Assuming 20 days the most for a task
        fontSize: Array.from({
            length: 20
        }, (v, i) => 21 - i)
    }
);*/