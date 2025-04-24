/**
 * Utility functions for managing form submissions locally
 * This is a temporary solution to store form data as JSON instead of using Google Sheets
 */

/**
 * Save a form submission to localStorage
 * @param {Object} formData - The form data to save
 * @returns {string} - The key used to store the submission
 */
export const saveFormSubmission = (formData) => {
  try {
    // Add timestamp to the form data
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    // Generate a unique key for this submission
    const submissionKey = `form_submission_${Date.now()}`;
    
    // Store individual submission
    localStorage.setItem(submissionKey, JSON.stringify(submissionData));
    
    // Get all current submissions
    let allSubmissions = [];
    try {
      const storedSubmissions = localStorage.getItem('all_form_submissions');
      if (storedSubmissions) {
        allSubmissions = JSON.parse(storedSubmissions);
      }
    } catch (parseError) {
      console.error('Error parsing stored submissions:', parseError);
      // If there's an error parsing, start with empty array
      allSubmissions = [];
    }
    
    // Add new submission to the array
    allSubmissions.push(submissionData);
    
    // Store the updated array
    localStorage.setItem('all_form_submissions', JSON.stringify(allSubmissions));
    
    return submissionKey;
  } catch (error) {
    console.error('Error saving form data:', error);
    throw new Error('Failed to save form data');
  }
};

/**
 * Get all form submissions from localStorage
 * @returns {Array} - Array of all form submissions
 */
export const getAllFormSubmissions = () => {
  try {
    const storedSubmissions = localStorage.getItem('all_form_submissions');
    if (storedSubmissions) {
      return JSON.parse(storedSubmissions);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving form submissions:', error);
    return [];
  }
};

/**
 * Export all form submissions as a downloadable JSON file
 */
export const exportSubmissionsAsJson = () => {
  try {
    const submissions = getAllFormSubmissions();
    if (submissions.length === 0) {
      alert('No form submissions to export');
      return;
    }
    
    // Create a Blob with the JSON data
    const jsonData = JSON.stringify(submissions, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `form_submissions_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error exporting submissions:', error);
    alert('Failed to export submissions');
  }
};