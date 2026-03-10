import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { loadWorkouts, saveWorkouts } from '@/storage/workoutStorage';
import type { NewWorkoutInput, Workout } from '@/types/workout';

type WorkoutState = {
  workouts: Workout[];
  isLoading: boolean;
  storageError: string | null;
  hasHydrated: boolean;
};

type WorkoutContextValue = {
  workouts: Workout[];
  isLoading: boolean;
  storageError: string | null;
  addWorkout: (input: NewWorkoutInput) => Workout;
  deleteWorkout: (workoutId: string) => void;
};

type WorkoutAction =
  | { type: 'HYDRATE_SUCCESS'; payload: Workout[] }
  | { type: 'HYDRATE_ERROR'; payload: string }
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: string }
  | { type: 'SET_STORAGE_ERROR'; payload: string }
  | { type: 'CLEAR_STORAGE_ERROR' };

const initialState: WorkoutState = {
  workouts: [],
  isLoading: true,
  storageError: null,
  hasHydrated: false,
};

const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined);

const workoutReducer = (state: WorkoutState, action: WorkoutAction): WorkoutState => {
  switch (action.type) {
    case 'HYDRATE_SUCCESS':
      return {
        ...state,
        workouts: action.payload,
        isLoading: false,
        storageError: null,
        hasHydrated: true,
      };
    case 'HYDRATE_ERROR':
      return {
        ...state,
        workouts: [],
        isLoading: false,
        storageError: action.payload,
        hasHydrated: true,
      };
    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout.id !== action.payload),
      };
    case 'SET_STORAGE_ERROR':
      return {
        ...state,
        storageError: action.payload,
      };
    case 'CLEAR_STORAGE_ERROR':
      return {
        ...state,
        storageError: null,
      };
    default:
      return state;
  }
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected storage error.';
};

const createWorkout = (input: NewWorkoutInput): Workout => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  activityType: input.activityType.trim(),
  durationMinutes: input.durationMinutes,
  intensity: input.intensity,
  date: input.date,
  notes: input.notes?.trim() || undefined,
  createdAt: new Date().toISOString(),
});

export const WorkoutProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const workouts = await loadWorkouts();

        if (isMounted) {
          dispatch({ type: 'HYDRATE_SUCCESS', payload: workouts });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'HYDRATE_ERROR', payload: getErrorMessage(error) });
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!state.hasHydrated) {
      return;
    }

    let isCancelled = false;

    const persist = async () => {
      try {
        await saveWorkouts(state.workouts);

        if (!isCancelled && state.storageError) {
          dispatch({ type: 'CLEAR_STORAGE_ERROR' });
        }
      } catch (error) {
        if (!isCancelled) {
          dispatch({ type: 'SET_STORAGE_ERROR', payload: getErrorMessage(error) });
        }
      }
    };

    persist();

    return () => {
      isCancelled = true;
    };
  }, [state.hasHydrated, state.storageError, state.workouts]);

  const value = useMemo<WorkoutContextValue>(
    () => ({
      workouts: state.workouts,
      isLoading: state.isLoading,
      storageError: state.storageError,
      addWorkout: (input) => {
        const workout = createWorkout(input);
        dispatch({ type: 'ADD_WORKOUT', payload: workout });
        return workout;
      },
      deleteWorkout: (workoutId) => {
        dispatch({ type: 'DELETE_WORKOUT', payload: workoutId });
      },
    }),
    [state.isLoading, state.storageError, state.workouts]
  );

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider.');
  }

  return context;
};
