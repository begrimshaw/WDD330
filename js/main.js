

const links = ["Week1 notes", "Week2 Notes"]

for(var i=0; i<links.length; i++) {

    document.getElementById("my-list").innerHTML+=
        '<li class="list">checking</li>';
        //'<li class="list">checking<a href="week'  + 'index.html">' + links[i] +  '</a></li>';

    }