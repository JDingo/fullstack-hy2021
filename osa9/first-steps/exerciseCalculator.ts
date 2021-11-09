interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyExerciseArray: Array<number>;
}

const parseArgumentsExercise = (args: Array<string>): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const numberArray = args.slice(2);
  const tempArray: number[] = [];

  numberArray.forEach(value => {
    if (!isNaN(Number(value))) {
      tempArray.push(Number(value));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  const target = tempArray[0];
  const dailyExerciseArray = tempArray.slice(1);

  return {
    target,
    dailyExerciseArray
  };
};

const calculateExercises = (target: number, dailyExerciseArray: Array<number>) => {
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

  console.log(result);
};

try {
  const { target, dailyExerciseArray } = parseArgumentsExercise(process.argv);
  calculateExercises(target, dailyExerciseArray);
} catch (error: unknown) {
  let errorMessage = 'Error!';
  if (error instanceof Error) {
    errorMessage += ' Error:' + error.message;
  }
  console.log(errorMessage);
}