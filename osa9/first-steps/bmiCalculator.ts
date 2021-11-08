const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / ((height / 100)^2);
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

  return message;
}

console.log(calculateBmi(180, 74))