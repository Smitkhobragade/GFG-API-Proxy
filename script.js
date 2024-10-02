document.getElementById('job-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const skills = document.getElementById('skills').value.trim().replace(/\s+/g, '');
    if (skills) {
      fetchJobs(skills);
    }
  });
  
  function fetchJobs(skills) {
    const apiUrl = `https://practiceapi.geeksforgeeks.org/api/latest/jobs/skills/?skills=${encodeURIComponent(skills),}`;
    
    fetch(apiUrl)
    
      .then(response => response.json())
      .then(data => {
        displayJobs(data.results);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }
  
  function displayJobs(jobs) {
    const jobsList = document.getElementById('jobs-list');
    jobsList.innerHTML = ''; // Clear previous results
    if (jobs.length > 0) {
      jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job-item');
        jobItem.innerHTML = `
          <h3>${job.designation.text}</h3>
          <p><strong>Company:</strong> ${job.organization.name}</p>
          <p><strong>Location:</strong> ${job.location.join(', ')}</p>
          <p><strong>Salary:</strong> ${job.salary}</p>
          <p><strong>Experience:</strong> ${job.experience}</p>
          <a href="${job.organization.website}" target="_blank">Visit Company Website</a>
        `;
        jobsList.appendChild(jobItem);
      });
    } else {
      jobsList.innerHTML = '<p>No jobs found for the given skills.</p>';
    }
  }
  