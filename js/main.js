
//Array of assignments
const links = ["how is this working", "Week2 Notes"]

for(var i=0; i<links.length; i++) {

    document.getElementById("my-list").innerHTML+=
        '<li class="list"><a href="week'  + 'index.html">' + links[i] +  '</a></li>';

    }