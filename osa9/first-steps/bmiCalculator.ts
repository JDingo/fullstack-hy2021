interface biometricValues {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (args: Array<string>): biometricValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) ^ 2);
  let message;

  if (bmi < 16) {
    message = 'Underweight (severe thinness)';
  } else if (bmi < 17) {
    message = 'Underweight (moderate thinness)';
  } else if (bmi < 18.5) {
    message = 'Underweight (mild thinness)';
  } else if (bmi < 25) {
    message = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    message = 'Overweight (pre-obese)';
  } else if (bmi < 35) {
    message = 'Obese (class I)';
  } else if (bmi < 40) {
    message = 'Obese (class II)';
  } else {
    message = 'Obese (class III)'
  }

  console.log(message)
}

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  calculateBmi(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}