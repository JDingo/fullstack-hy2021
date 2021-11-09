interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArgumentsExercise = (targetValue: unknown, numberArray: Array<unknown>) => {
  if (!targetValue || !numberArray) {
    throw { "error": "parameters missing" };
  }

  let target: number;

  if (!isNaN(Number(targetValue))) {
    target = Number(targetValue);
  } else {
    throw { "error": "malformatted parameters" };
  }

  const dailyExerciseArray: number[] = [];
  numberArray.forEach(value => {
    if (!isNaN(Number(value))) {
      dailyExerciseArray.push(Number(value));
    } else {
      throw { "error": "malformatted parameters" };
    }
  });

  return {
    target,
    dailyExerciseArray
  };
};

export const calculateExercises = (target: number, dailyExerciseArray: Array<number>) => {
  const periodLength = dailyExerciseArray.length;
  const trainingDays = dailyExerciseArray.reduce((exerciseDays, currentDay) => currentDay == 0 ? exerciseDays : exerciseDays + 1, 0);
  const average = periodLength == 0 ? 0 : dailyExerciseArray.reduce((exerciseDays, currentDay) => currentDay == 0 ? exerciseDays : exerciseDays + currentDay, 0) / periodLength;
  const success = target < average ? true : false;
  const rating = average < target * 0.75 ? 1 :
    average > target * 1.25 ? 3 :
      2;
  const ratingDescription = rating == 1 ? 'Room to improve' :
    rating == 2 ? 'Doing good' :
      'Excellent work';

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

/* try {
  const { target, dailyExerciseArray } = parseArgumentsExercise(process.argv);
  calculateExercises(target, dailyExerciseArray);
} catch (error: unknown) {
  let errorMessage = 'Error!';
  if (error instanceof Error) {
    errorMessage += ' Error:' + error.message;
  }
  console.log(errorMessage);
} */