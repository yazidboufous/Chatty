
function send(){

    const data= { 
        alias: document.getElementById('Alias').value,
        message:  document.getElementById('Message').value
    }

    /* sending a post request and including the data in the body,
     I used JSON because it is compatible and has same structure as records in Monodb so it will be easier to 
     retrieve when storing in the server side*/

    fetch('/chats/post' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    
    .then( () => {
      console.log('Successfully sending chat');
    })

    .catch(error => {
            console.log('there was a problem sending chat',error);
    });

    //clearing the input fields once sending to the server
    let alias= document.getElementById("Alias");
    alias.value='';
    let msg= document.getElementById("Message");
    msg.value='';

}

function getchat() {
    let url = '/chats';
  
    let p=fetch(url);

    p.then(
      (response) => {
        return response.json();
      }
    )
    .then((data) => { 

      /*loop through JSON object and create a new_ div for every element, create two spans and give them classes to style them,
      and appending both to the new div, and then appending the new_div to the main div where the chat is going to be displayed
       and append it to the chat div to display it.*/

      var chat = document.getElementById("chat");
      chat.innerHTML = ""; // clear the chat div

      for (var i = 0; i < data.length; i++) {

        var new_div = document.createElement("div");
        new_div.className="newdiv";

        var name= document.createElement("span");
        name.className="name";
        name.innerHTML=data[i].alias;

        var colon= document.createElement("span");
        colon.innerHTML=":";

        var message= document.createElement("span");
        message.className="message";
        message.innerHTML=data[i].message;

        new_div.appendChild(name);
        new_div.appendChild(colon);
        new_div.appendChild(message);
        chat.appendChild(new_div);

      }
    })
  
    .catch( (error) => {
      console.error('Problem fetching', error)
    }) ;
}

//sending a request to clear the database once the webpage is closed to allow new conversations.
window.onunload = function() {

  let p= fetch('/drop_database',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

}


