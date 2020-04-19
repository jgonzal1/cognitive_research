function setOptionToDom(option, dom_element_name) {
    const dom_element = document.getElementById(dom_element_name);
    dom_element.innerText = option;
}