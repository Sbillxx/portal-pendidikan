import { base_url } from "../utils/variable";

export const sendNotification = async (token, data, topic, page) => {

  try {
    const requestBody = {
      message: {
        topic: topic,
        notification: {
          title: data.title,
          body: data.message,
          image: data.image,
          // image: "https://bacaini.id/wp-content/uploads/2025/01/gus-iqdam-terima-hummer.jpg",
        },
        data: {
          url: `${base_url}/${page}/${topic}/${data.message
            .toLowerCase()
            .replace(/\s+/g, "-")
            .trim()}`,
        },
      },
    };

    const response = await fetch(
      "https://fcm.googleapis.com/v1/projects/idrisiyyah-bapli/messages:send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", text);
      throw new Error("Failed to send notification");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

export const submitToNotif = async (data, setStatus, topic) => {

  if (!data.title || !data.message) {
    setStatus("Please fill in all fields.");
    return false; // Return false if validation fails
  }

  try {
    const response = await fetch(`${base_url}/get-server-token`);
    if (!response.ok) {
      throw new Error("Failed to fetch server token");
    }

    const { token } = await response.json();
    await sendNotification(token, data, topic);
    setStatus("Notification sent successfully!");
    return true; // Return true if notification sent successfully
  } catch (error) {
    console.error("Error sending notification:", error);
    setStatus("Failed to send notification. Try again.");
    return false; // Return false if there's an error
  }

};

export const sendPushNotification = async (data, token) => {
  try {
    const requestBody = {
      message: {
        topic: 'push-notif',
        notification: {
          title: data.title,
          body: data.message,
        },
      },
    };

    const response = await fetch(
      "https://fcm.googleapis.com/v1/projects/idrisiyyah-bapli/messages:send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Error response:", text);
      throw new Error("Failed to send notification");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

export const submitPushNotif = async (data, setStatus) => {

  if (!data.title || !data.message) {
    setStatus("Please fill in all fields.");
    return false; // Return false if validation fails
  }

  try {
    const response = await fetch(`${base_url}/get-server-token`);
    if (!response.ok) {
      throw new Error("Failed to fetch server token");
    }

    const { token } = await response.json();
    await sendPushNotification(data ,token);
    setStatus("Notification sent successfully!");
    return true; // Return true if notification sent successfully
  } catch (error) {
    console.error("Error sending notification:", error);
    setStatus("Failed to send notification. Try again.");
    return false; // Return false if there's an error
  }

};