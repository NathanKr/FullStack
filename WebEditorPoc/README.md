<h2>Introduction</h2>
Proof of concept for web editor like wix , can be useful for easily creating UI for web sites

<h2>Implementation</h2>
<ol>
<li>client : react</li>
<li>server : node.js </li>
<li>data base : MongoDb</li>
</ol>

Remark : i am _deliberately_ not using common tools like express and mongoose in this project because i want to get a feeling which headache exists 

<h2>Points of interest</h2>
<table>
  <tr>
    <th>Point</th>
    <th>Description</th>
    <th>Remark</th>
  </tr>
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
