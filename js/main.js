

const links = ["Week1 notes", "week2 Notes"]

for(var i=0; i<links.length; i++) {

    document.getElementById("my-list").innerHTML+=
        '<li class="list"><a href="week' + (i+1) + 'index.html>' + links[i] +  '</a> </li>';

    }