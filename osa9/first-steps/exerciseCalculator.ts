interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseArray: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseArray.length;
  const trainingDays = dailyExerciseArray.reduce((exerciseDays, currentDay) => currentDay == 0 ? exerciseDays : exerciseDays + 1, 0);
  const average = dailyExerciseArray.reduce((exerciseDays, currentDay) => currentDay == 0 ? exerciseDays : exerciseDays + currentDay) / periodLength;
  const success = target < average ? true : false;
  const rating = average < target * 0.75 ? 1 : 
                  average > target * 1.25 ? 3 : 
                  2;
  const ratingDescription = rating == 1 ? 'Room to improve' : 
                              rating == 2 ? 'Doing good' :
                              'Excellent work'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))