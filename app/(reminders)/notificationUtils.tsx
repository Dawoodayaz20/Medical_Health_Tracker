import * as Notifications from "expo-notifications"

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


export const cancelNotification = async (id:string) => {
    try{
      await Notifications.cancelScheduledNotificationAsync(id);
      console.log("Your reminder notification has been cancelled")
    }
    catch(err){
      console.log("There was an error cancelling your reminder notification", err)
    }
}