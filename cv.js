document.getElementById('downloadCvBtn').addEventListener('click', () => {
    // Show loading state
    const btn = document.getElementById('downloadCvBtn');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Downloading CV...';
    btn.disabled = true;
    
    // Trigger download
    window.location.href = 'http://localhost:4000/download-cv';
    
    // Reset button after 3 seconds
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });