//helper function to send emails
export async function sendEmail(data) {
    console.log("data to send:", data)
    try {
      const response = await fetch("/api/mailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data), 
      }, { cache: 'no-store' });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const responseData = await response.json();
      return responseData
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; 
    }
  }
  