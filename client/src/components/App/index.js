import * as React from 'react';
var textbooks = [
  {
    author: "Wandschneider, Marc",
    title: "Learning Node.js. Second Edition",
    year: "2017",
    url: "https://learn.uwaterloo.ca/d2l/le/content/809883/viewContent/4383004/View"
  },
  {
    author: "Wieruch, Robin",
    title: "The Road to React. Second edition",
    year: "2021",
    url: "https://learn.uwaterloo.ca/d2l/le/content/809883/viewContent/4383008/View"
  }
];

function getTitle(text) {
  for (var i = 0; i<text.length; i++){
    return text[i].title
  } 
}

function App() {
return (
<div>
<h1>
Hello {getTitle(textbooks)}
</h1>
<Books />
<label htmlFor="search">Search: </label>
<input id="search" type="text" />
</div>
);
}

function Books(){
  return(
    <div>
      <ul>
        {textbooks.map(obj => 
        <li> 
          {obj.title},
          {obj.author}
          <a href={obj.url}> link</a>
        </li>)}
      </ul>
    </div>
  );
}
export default App;


