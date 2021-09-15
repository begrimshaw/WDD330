//Array of assignments
const links = ["Week 1 Notes", "Week2 Notes"]

for(var i=0; i<links.length; i++) {

    j = i + 1; 
    document.getElementById("my-list").innerHTML+=
        '<li class="list"><a href="week' + j  + '/">' + links[i] +  '</a></li>';
    }