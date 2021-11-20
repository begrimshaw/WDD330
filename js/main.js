//Array of assignments
const links = [
  "Week 1 Notes",
  "Week2 Notes",
  "Week 3 Notes",
  "Week 4 Notes",
  "Week 5 Notes",
  "Week 6 Notes (nothing here)",
  "Week 7 notes",
  "Week 8 Notes",
  "Week 9 Notes",
  "Week 10 Notes",
];

for (var i = 0; i < links.length; i++) {
  j = i + 1;
  document.getElementById("my-list").innerHTML +=
    '<li class="list"><a href="week' + j + '/">' + links[i] + "</a></li>";
}
