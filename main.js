document.querySelector('#art').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form values
  let name = document.querySelector("#name23").value;
  let email = document.querySelector("#email").value;
  let phonenumber = document.querySelector("#phonenumber").value;
  let feedback = document.querySelector("#feedback").value;

  // Show loading and disable button
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('sub').disabled = true;
  document.getElementById('message').classList.add('hidden');

  if (name === "" || email === "" || phonenumber === "" || feedback === "") {
    // Hide loading and re-enable button
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('sub').disabled = false;
    alert("Please enter the details");
    return;
  }

  try {
    const response = await fetch('https://portfolio-1-9o90.onrender.com/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phonenumber: phonenumber,
        feedback: feedback
      })
    });
    const data = await response.json();

    if (response.ok) {
      // Show success message
      const message = document.getElementById('message');
      message.textContent = "Form has been submitted :)";
      message.className = 'message success';
      message.classList.remove('hidden');
      // Reset form
      document.querySelector('#art').reset();
    } else {
      // Show error message
      const message = document.getElementById('message');
      message.textContent = data.error || "Data could not be saved.";
      message.className = 'message error';
      message.classList.remove('hidden');
    }
  } catch (error) {
    // Show error message
    const message = document.getElementById('message');
    message.textContent = "An error occurred. Please try again.";
    message.className = 'message error';
    message.classList.remove('hidden');
  } finally {
    // Hide loading and re-enable button
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('sub').disabled = false;
    // Hide message after 3 seconds
    setTimeout(() => {
      document.getElementById('message').classList.add('hidden');
    }, 3000);
  }
});

