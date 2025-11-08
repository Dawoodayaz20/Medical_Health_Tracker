import * as Notifications from "expo-notifications"

// This notification scheduling function is for IOS devices
export const scheduleNotificationforIOS = async (title: string, body: string, hour: number, minute:number) => 
  {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `⏰${title}!`,
          body: body,
          sound: true,
        },
        trigger: { 
          type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
          hour,
          minute,
          repeats: true,
         },
      });
      return id;
    };

// This notification scheduling function is for android devices
export const scheduleNotification = async (
  title: string,
  body: string,
  hour: number,
  minute: number
) => {
  const now = new Date();
  const target = new Date();

  target.setHours(hour);
  target.setMinutes(minute);
  target.setSeconds(0);

  // If the selected time has already passed today, schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  // Calculate seconds until the next trigger time
  const seconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `⏰ ${title}!`,
      body,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: true, // repeats every same interval (24h effectively)
    },
  });

  return id;
};


export const cancelNotification = async (id:string) :Promise<{ success: boolean, message: string }> => {
    try{
      const result = await Notifications.cancelScheduledNotificationAsync(id);
      return { success: true, message: "Reminder cancelled successfully" };
    }
    catch(err){
      return { success: false, message: "Error cancelling reminder" };
    }
}