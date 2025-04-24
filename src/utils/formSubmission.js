import supabase from './supabaseClient';

/**
 * Submit form data to Supabase contact_submissions table
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - Result of the Supabase insert operation
 */
export const submitFormToSupabase = async (formData) => {
  try {
    // Format the data according to the contact_submissions table structure
    const submissionData = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || null, // Handle optional fields
      project_type: formData.projectType,
      description: formData.description,
      budget: formData.budget || null, // Handle optional fields
      timeline: formData.timeline || null, // Handle optional fields
      source: formData.source || null, // Handle optional fields
      // created_at will be automatically set by Supabase
    };

    // Insert data into the contact_submissions table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData]);

    if (error) {
      console.error('Error submitting form to Supabase:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in submitFormToSupabase:', error);
    throw error;
  }
};

/**
 * Fallback function to save submission locally if Supabase fails
 * @param {Object} formData - The form data to save
 */
export const saveLocalFallback = (formData) => {
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
      allSubmissions = [];
    }
    
    // Add new submission to the array
    allSubmissions.push(submissionData);
    
    // Store the updated array
    localStorage.setItem('all_form_submissions', JSON.stringify(allSubmissions));
    
    return { success: true, key: submissionKey };
  } catch (error) {
    console.error('Error saving form data locally:', error);
    return { success: false, error };
  }
};

/**
 * Export locally stored form submissions as a downloadable JSON file
 */
export const exportSubmissionsAsJson = () => {
  try {
    // Get all locally stored submissions
    const storedSubmissions = localStorage.getItem('all_form_submissions');
    if (!storedSubmissions) {
      alert('No form submissions to export');
      return;
    }
    
    const submissions = JSON.parse(storedSubmissions);
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