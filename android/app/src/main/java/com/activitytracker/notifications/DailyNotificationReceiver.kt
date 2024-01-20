package com.activitytracker

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import android.util.Log
import android.os.Build

class DailyNotificationReceiver : BroadcastReceiver() {
    private val NOTIFICATION_CHANNEL_ID = "MyNotificationChannel"

    override fun onReceive(context: Context, intent: Intent) {
        Log.d("DailyNotificationReceiver", "Received broadcast")
        createNotificationChannel(context);
        showNotification(context)
    }

    private fun createNotificationChannel(context: Context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "Daily Notification Channel",
                NotificationManager.IMPORTANCE_HIGH
            )
            channel.description = "Activity Tracker Check"
            val notificationManager =
                context.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun showNotification(context: Context) {
    try {
        // Create a notification channel (ensure it's created)
        Log.d("showNotification", "called")
        // Create a notification
        val builder = NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("Daily Reminder")
            .setContentText("Check your Activity Tracker - Cook Attendance")
            .setPriority(NotificationCompat.PRIORITY_HIGH)

        // Show the notification
        val notificationManager = NotificationManagerCompat.from(context)
        notificationManager.notify(System.currentTimeMillis().toInt(), builder.build())
    } catch (e: Exception) {
        Log.e("Notification", "Error showing notification: ${e.message}", e)
    }
}
}
