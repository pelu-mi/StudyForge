import nodeCron from "node-cron";
import sendMail from "../utils/sendMail.js";
import StudyAlert from "../models/studyAlert.js";

const job = nodeCron.schedule("* * * * *", async () => {
  try {
    const currentTime = new Date()
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
      .toLowerCase();

    const normalizedTime = currentTime.replace(/\s+/g, "");

    // Get current day
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    const alerts = await StudyAlert.find({
      time: normalizedTime,
      day: { $in: [currentDay] },
      status: "active",
    });

    

    if (alerts.length > 0) {
      for (const alert of alerts) {
        const messagePayload = {
          to: alert.userEmail,
          subject: "Study Alert 📚",
        };

        await sendMail.sendScheduledMail(messagePayload);
      }
    }
  } catch (error) {
    console.error("Error in scheduled job:", error);
  }
});

export default job;
