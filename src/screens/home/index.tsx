import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useActivity from '../../hooks/useActivity';
import {RouteNames} from '../../navigation/screenHelper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {activities, deleteActivity, rehydrateState} = useActivity();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const _handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      rehydrateState();
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {activities.length ? (
        activities.map((activity, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(RouteNames.CALENDAR, {activity})
              }>
              <View style={styles.activityItem}>
                <Text>{activity.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteActivity(activity.name)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No activities added</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(RouteNames.ADD_ACTIVITY)}>
        <Text style={styles.addButtonText}>Add Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={_handleRefresh}>
        {isRefreshing ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.addButtonText}>Refresh</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  activityItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityItem: {
    padding: 15,
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 18,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 100,
    height: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default HomeScreen;
