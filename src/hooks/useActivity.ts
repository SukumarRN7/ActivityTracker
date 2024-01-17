import {useEffect, useReducer} from 'react';
import {ACTIVITY_TYPE} from '../enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_STORAGE_KEYS} from '../store/keys';
import {RouteNames} from '../navigation/screenHelper';
import {useNavigation} from '@react-navigation/native';

const ActivityReducer = (state, action) => {
  console.log('ActivityReducer', state, action);
  switch (action.type) {
    case ACTIVITY_TYPE.ADD:
      return {activities: [...state?.activities, action.newActivity]};
    case ACTIVITY_TYPE.DELETE:
      return {
        activities: state.activities.filter(
          activity => activity.name !== action.activityName,
        ),
      };
    case ACTIVITY_TYPE.UPDATE: {
      const activityName = action.updatedActivity.activityName;
      const selectedDate = action.updatedActivity.selectedDate;
      const selectedOptions = action.updatedActivity.selectedOptions;

      const existingIndex = state.activities.findIndex(
        activity => activity.name === activityName,
      );

      if (existingIndex !== -1) {
        const existingActivity = state.activities[existingIndex];
        const existingDates = existingActivity.data.dates || [];
        const existingDateIndex = existingDates.findIndex(
          date => Object.keys(date)[0] === selectedDate,
        );

        if (existingDateIndex !== -1) {
          existingDates[existingDateIndex][selectedDate] = selectedOptions;
        } else {
          existingDates.push({[selectedDate]: selectedOptions});
        }
        existingActivity.data.dates = existingDates;

        return {
          activities: [
            ...state.activities.slice(0, existingIndex),
            existingActivity,
            ...state.activities.slice(existingIndex + 1),
          ],
        };
      }

      return state;
    }

    case ACTIVITY_TYPE.REHYDRATE:
      return {activities: action.activities};

    default:
      break;
  }
};

const initialState = {
  activities: [],
};

const useActivity = () => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);
  const navigation = useNavigation();
  const activities = state?.activities ?? [];

  const rehydrateState = async () => {
    const values = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.ACTIVITIES);
    const storedActivities = JSON.parse(values ?? '[]');
    dispatch({type: ACTIVITY_TYPE.REHYDRATE, activities: storedActivities});
  };

  const updateAsyncStorage = async newActivity => {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.ACTIVITIES,
      JSON.stringify([...activities, newActivity]),
    );
  };

  const addActivity = (activityName: string) => {
    if (activityName.trim() !== '') {
      try {
        if (activities.find(activity => activity.name === activityName)) {
          alert('Activity already exists!');
          return;
        }
        const newActivity = {name: activityName, data: {dates: []}};
        dispatch({type: ACTIVITY_TYPE.ADD, newActivity});
        navigation.navigate(RouteNames.CALENDAR, {activity: newActivity});
        updateAsyncStorage(newActivity);
      } catch (error) {
        console.error('Error adding activity:', error);
      }
    }
  };

  const deleteAsyncStorage = async activityName => {
    const storedActivities = activities.filter(
      activity => activity.name !== activityName,
    );
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(storedActivities),
    );
  };

  const deleteActivity = (activityName: string) => {
    try {
      dispatch({type: ACTIVITY_TYPE.DELETE, activityName});
      deleteAsyncStorage(activityName);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const updateActivity = updatedActivity => {
    dispatch({type: ACTIVITY_TYPE.UPDATE, updatedActivity});
  };

  const syncActivity = async () => {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(activities),
    );
  };

  useEffect(() => {
    rehydrateState();
  }, []);

  console.log('useActivity activities', activities);

  return {
    activities,
    rehydrateState,
    addActivity,
    deleteActivity,
    updateActivity,
    syncActivity,
  };
};

export default useActivity;
