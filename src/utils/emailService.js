// This is a mock service for sending emails
// In a real implementation, this would connect to a backend API

export const sendResults = async (email, hrType, scores, badQuestions) => {
  try {
    console.log(`Sending results to ${email}`);
    console.log('HR Type:', hrType);
    console.log('Scores:', scores);
    console.log('Areas to improve:', badQuestions);
    
    // Simulate API call with 1 second delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would be:
    // const response = await fetch('/api/sendResults', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, hrType, scores, badQuestions })
    // });
    // return await response.json();
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};