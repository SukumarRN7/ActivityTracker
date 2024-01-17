import moment from 'moment';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
const AttendanceViewer = ({dates, currentCalendar}) => {
  const month =
    currentCalendar?.[0]?.month < 10
      ? `0${currentCalendar?.[0]?.month}`
      : currentCalendar?.[0]?.month;

  const calendarFilter = `${currentCalendar?.[0]?.year}-${month}`;

  const validDates = dates.filter(each => {
    const date = Object.keys(each)[0];
    return date.includes(calendarFilter);
  });

  if (!currentCalendar) {
    return <></>;
  }
  return (
    <>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>
        {' '}
        ATTENDANCE ({validDates?.length})
      </Text>
      <FlatList
        data={validDates}
        renderItem={({item, index}) => {
          const date = Object.keys(item)?.[0];
          const val = item?.[date];
          const formattedDate = moment(date).format('MMMM DD');
          return (
            <View style={{marginVertical: 5}}>
              <Text style={{fontWeight: '500'}}>
                {index + 1}. {formattedDate} -{' '}
                {val?.day && val?.night
                  ? 'Full Present'
                  : val?.day
                  ? 'Day'
                  : val?.night
                  ? 'Night'
                  : ''}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default AttendanceViewer;
