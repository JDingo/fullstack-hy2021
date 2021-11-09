import express, { Request } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArgumentsExercise } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);

  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send({
      height: Number(height),
      weight: Number(weight),
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req: Request<unknown, unknown, { daily_exercises: Array<number>, target: number }>, res) => {

  try {
    const { dailyExerciseArray, target } = parseArgumentsExercise(req.body.target, req.body.daily_exercises);
    const result = calculateExercises(target, dailyExerciseArray);

    res.json(result);
  } catch (e) {
    res.status(400).send(e);
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});