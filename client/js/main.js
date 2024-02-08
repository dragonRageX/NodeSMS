const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
let button = document.getElementById("button");
let response = document.querySelector(".response");

button.addEventListener("click", send, false);

const socket = io();
socket.on("smsStatus", (data) => {   //catch 'data' (response) sent from server-side when the event 'smsStatus' occurs
    response.innerHTML = `<h5>Text message sent to ${data.number}</h5>`;
    numberInput.value = "";
    textInput.value = "";
})

function send()
{
    if(!(numberInput.value) || !(textInput.value))   //validation
    {
        response.innerHTML = "Please enter a valid Phone Number and Text Message!";
    }
    else
    {
        const number = numberInput.value.replace(/\D/g, '');   //regex to remove all non-numeric characters from the input
        const text = textInput.value;
        if((number.length > 0) && (number.length <= 10))
        {
            response.innerHTML = "Please include a valid Country Code along with the Phone Number!";
            return;
        }
    
        fetch("/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ number: number, text: text })
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
    }
}