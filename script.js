var API_URL = "https://cdn.unicity.com/api/countries.json";
var PAGE_ITEMS_LIMIT = 10;

var list = document.getElementById('list');
var countries = null;

var pageNumber = 0;

function getArrayPart(array, start, count) {
    var result = [];

    for (var i = 0; i < count; i++) {
        var element = array[start++];
        result.push(element);
    }

    return result;
}

document.addEventListener('DOMContentLoaded', function () {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            countries = response.items;

            var firstPage = getArrayPart(countries, 0, PAGE_ITEMS_LIMIT);

            for (var i = 0; i < firstPage.length; i++) {
                list.innerHTML += '<li>' + firstPage[i].name + '</li>';
            }
        }
    };

    request.open('GET', API_URL, true);
    request.send();
});


var paginationButtons = document.querySelectorAll('[data-page]');

for (var i = 0; i < paginationButtons.length; i++) {
    paginationButtons[i].addEventListener('click', function (e) {
        e.preventDefault();

        pageNumber = e.target.getAttribute('data-page') - 1;
        console.log(pageNumber);
        setContent();

    });

}

function setContent() {
    var pageContent = getArrayPart(countries, pageNumber * PAGE_ITEMS_LIMIT, PAGE_ITEMS_LIMIT);

    list.innerHTML = '';

    for (var i = 0; i < pageContent.length; i++) {
        list.innerHTML += '<li>' + pageContent[i].name + '</li>';
    }
};

var next = document.getElementById('next');

var prev = document.getElementById('prev');


next.addEventListener('click', function () {
    pageNumber = pageNumber+1;
    setContent();
    if (pageNumber >= paginationButtons.length){
        pageNumber = pageNumber-1;
        return;
    }
    console.log(pageNumber);
});

prev.addEventListener('click', function () {
    pageNumber = pageNumber-1;

    if (pageNumber < 0) {
        pageNumber = pageNumber+1;
        return;
    }
    setContent();
    console.log(pageNumber);
});






