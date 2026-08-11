async function loadMeta() {
  try {
    const response = await fetch('/api/info');
    const data = await response.json();
    document.getElementById('environment').textContent = data.environment;
    document.getElementById('version').textContent = data.version;
  } catch (error) {
    console.error('Unable to load app metadata', error);
  }
}

loadMeta();
