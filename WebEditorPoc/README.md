<h2>Introduction</h2>
<ul>
<li>Proof of concept for web editor like wix , can be useful for easily creating UI for web sites</li>
<li>This POC was GREAT for creating the design of the system</li>
</ul>

<h2>Editor operations</h2>
Client side
<ul>
<li>Add element</li>
<li>Delete element</li>
<li>Update element</li>
<li>Delete element</li>
<li>Move element - TBD (is it needed)</li>
<li>Undo elements operations</li>
<li>Redo elements operations</li>
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
<li>state management : redux -> TBD very easy for undo redo which might be useful in GUI edit</li>
</ol>

Remark : i am _deliberately_ not using common tools like express and mongoose in this project because i want to get a feeling which headache exists 

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
</table>

<h2>To Do</h2>
<ol>
<li>Share constants between client and server e.g. port , ...</li>
</ol>
