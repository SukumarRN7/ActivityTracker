import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AttendanceModal from './AttendanceModal';
import useActivity from '../../hooks/useActivity';
import AttendanceViewer from './AttendanceViewer';

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

const SelectCalendarScreen = ({...props}) => {
  const {activity} = props.route?.params;
  const activityName = activity?.name;

  const {updateActivity, syncActivity, activities} = useActivity();
  const [currentCalendar, setCurrentCalendar] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const currentDate = new Date();
  const currentActivityDates =
    activities.find(each => each.name === activityName)?.data?.dates ?? [];

  const valueForCurrentDate = currentActivityDates.find(
    obj => obj[selectedDate],
  );

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    setCurrentCalendar([{month: month + 1, year}]);
  }, []);

  const saveMarkedDates = selectedOptions => {
    try {
      updateActivity({activityName, selectedDate, selectedOptions});
    } catch (error) {
      console.error(
        `Error saving attendance data for ${activity.name}:`,
        error,
      );
    }
  };

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    setShowModal(true);
  };

  const onSaveModal = selectedOptions => {
    if (selectedDate) {
      saveMarkedDates(selectedOptions);
    }
    setShowModal(false);
  };

  const _handleOnMonthChange = months => {
    setCurrentCalendar(months);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activity.name}</Text>
      <Calendar
        onDayPress={onDayPress}
        onVisibleMonthsChange={_handleOnMonthChange}
        maxDate={currentDate.toISOString().split('T')[0]}
        minDate="2024-01-07"
        markingType={'multi-dot'}
        markedDates={{
          [currentDate.toISOString().split('T')[0]]: {
            dots: [{key: 'currentDate', color: 'green'}],
          },
        }}
      />
      <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
        <AttendanceModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSave={selectedOptions => onSaveModal(selectedOptions)}
          initialOptions={{...valueForCurrentDate?.[selectedDate]}}
        />
      </TouchableWithoutFeedback>
      <View flex={0.9}>
        {currentCalendar ? (
          <AttendanceViewer
            dates={currentActivityDates}
            currentCalendar={currentCalendar}
          />
        ) : (
          <></>
        )}
      </View>
      <View flex={0.1}>
        <TouchableOpacity style={styles.addButton} onPress={syncActivity}>
          <Text style={styles.addButtonText}>Save Updates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SelectCalendarScreen;
