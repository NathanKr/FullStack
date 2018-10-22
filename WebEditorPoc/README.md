<h2>Introduction</h2>
<ul>
<li>Proof of concept for web editor like wix , can be useful for easily creating UI for web sites</li>
<li>This POC was GREAT for creating the design of the system</li>
<li>i am NOT using here advanced tools like : redux , express , mongoose because i want to get a feeling of a project without it. I.e. see the need for them</li>
</ul>

<h2>Editor operations</h2>
Client side
<ul>
<li>Add element</li>
<li>Delete element</li>
<li>Update element</li>
<li>Delete element</li>
<li>Move element</li>
<li>Undo elements operations (not implement here because i need redux for it)</li>
<li>Redo elements operations (not implement here because i need redux for it)</li>
</ul>

Client \ Server side
<ul>
<li>Save elements on server</li>
<li>Get elements from server</li>
</ul>



<h2>Implementation</h2>
<ol>
<li>client : react</li>
<li>server : node.js </li>
<li>data base : MongoDb</li>
<li>state management : state as field in component</li>
</ol>


<h2>Data Base issues</h2>
<table>
  <tr>
    <th>Point</th>
    <th>Description</th>
    <th>Remark</th>
  </tr>
  <tr>
    <td>Save elements on server algorithm</td>
    <td>
<p>option 1 - save all</p>
<ul>
<li>Saving all array on server for dirty (any crud) collection</li>
<li>pro - the most simple solution</li>
<li>con - it cost is server bandwidth. but edit it not frequent operating so server can tolerate it</li>
<li> it remind me replacing the whole state in react and not changing it</li>
</ul>
<p>option 2 - save some</p>
<ul>
<li>save only dirty (any crud) elements</li>
<li>pro - ideal for server bandwidth</li>
<li>con - very complicated to implement: require extra state for storing change . how do you handle move of element ?</li>
</ul>
</td>
<td>I have chosen option 1 at least for this POC</td>
  </tr>
  <tr>
    <td>Element style</td>
    <td>DOM elements such as p element are saved with style as in JSX using camel notation on mongdb e.g. {"text" : "p1" , "style" : {"fontSize" : "12px"}}</td>
<td>This allow to use it as it on the react component</td>
  </tr>
 <tr>
    <td>Element order</td>
    <td>Order of p elements e.g. for about page is done by storing them as array</td>
<td>I saw no indication in MongoDb documentation that indicate that documents stored in some order will keep this order when retrieved. storing in array is the solution i came with</td>
  </tr>
</table>



<h2>Points of interest</h2>
<table>
  <tr>
    <th>Point</th>
    <th>Description</th>
    <th>Remark</th>
  </tr>
  <tr>
<tr>
    <td>Access-Control-Allow-Origin error</td>
    <td>This happens when client try to access the server while both on the same machine. it is solved by removing all origin restrictions on node.js using response.setHeader("Access-Control-Allow-Origin", "*")</td>
<td>This should be done on development server ONLY</td>
  </tr>
<tr>
    <td>Handling Up\Down without redux</td>
    <td>This became a bit problematic :
<ul>
<li>For testing up\down with jest i was force to export MoveUp\MoveDown function or put  it on Utils class and export it. Using redux\reducer function would be easier because it is public anyway</li>
<li>MoveUp\MoveDown are not handling state so i need another layer doing this (and they are not because i wanted it to be small. Using redux\reducer change the state by nature which make it easier to manage</li>
</ul>
</td>
<td></td>
  </tr>
</table>

<h2>To Do</h2>
<ol>
<li>Share constants between client and server e.g. port , ...</li>
<li>disable up and down arrow of bootstrap icons on edit when operation is not possible e.g. up when current index is 0</li>

</ol>

<h2>required installation</h2>
<ul>
<li>npm intall axios</li>
</ul>
