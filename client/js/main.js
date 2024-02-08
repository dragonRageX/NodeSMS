const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
let button = document.getElementById("button");
let response = document.querySelector(".response");

button.addEventListener("click", send, false);

function send()
{
    if(!(numberInput.value) || !(textInput.value))   //validation
    {
        response.innerHTML = "Please enter a valid Phone Number and Text Message!";
    }
    else if((numberInput.value.length > 0) && (numberInput.value.length <= 10))
    {
        response.innerHTML = "Please include a valid Country Code along with the Phone Number!"
    }
    else
    {
        const number = numberInput.value.replace(/\D/g, '');   //regex to remove all non-numeric characters from the input
        const text = textInput.value;
    
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