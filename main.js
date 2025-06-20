document.querySelector('#art').addEventListener('submit', async (e) => {
  e.preventDefault();
  // your fetch code here
let name = document.querySelector("#name23").value;
let email = document.querySelector("#email").value;
let phonenumber = document.querySelector("#phonenumber").value;
let feedback = document.querySelector("#feedback").value;

if (name === "" || email === "" || phonenumber==="" || feedback==="") {
  alert("Please enter the details");
} else {
  const response = await fetch('https://portfolio-1-9o90.onrender.com/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email ,
      phonenumber : phonenumber ,
      feedback : feedback 
    })
  });
  const data = await response.json(); // If the response is JSON
  if (response.ok) {
  // Login successful, redirect to your main site
    console.log("form submited"); 
    alert("Form has been submitted :) ");
    document.querySelector('#art').reset();
} else {
  // Success logic here
    alert(data.error || "DATA does not saved");
}
}
});
