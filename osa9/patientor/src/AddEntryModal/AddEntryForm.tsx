import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField, TypeOption, TypeSelectField } from "../components/FormField";
import { Entry } from "../types";
import { useStateValue } from "../state";

export type NewEntry = NewHealthCheck |
  NewHospital |
  NewOccupationalHealthcare;

type NewHealthCheck = Omit<Extract<Entry, { type: 'HealthCheck' }>, "id">;
type NewHospital = Omit<Extract<Entry, { type: 'Hospital' }>, "id">;
type NewOccupationalHealthcare = Omit<Extract<Entry, { type: 'OccupationalHealthcare' }>, "id">;

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: TypeOption[] = [
  { value: "healthCheck", label: "Health Check" },
  { value: "hospital", label: "Hospital" },
  { value: "occupationalHealthcare", label: "Occupational Healthcare" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const diagnosisCodes: string[] = [];
  const [formType, setFormType] = React.useState("healthCheck");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(e.target.value);
    console.log(formType, e.target.value);
  };

  const selectForm = () => {
    if (formType === "healthCheck") {
      return HealthCheckForm();
    } else if (formType === "hospital") {
      return HospitalForm();
    } else if (formType === "occupationalHealthcare") {
      return OccupationalHealthcareForm();
    } else {
      return null;
    }
  };

  const setInitialValues = (): NewEntry => {
    console.log(formType);
    if (formType === "healthCheck") {
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating: 0
      };
    } else if (formType === "hospital") {
      return {
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      };
    } else {
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: diagnosisCodes,
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      };
    }
  };
  console.log(setInitialValues());

  const initialValues = setInitialValues();

  console.log(initialValues);

  return (
    <Formik
      enableReinitialize
      initialValues={setInitialValues()}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formatError = "Field is incorrectly formatted";

        const dateRegex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\d');

        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        }
        if (!dateRegex.test(values.date)) {
          errors.date = formatError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (formType === "hospital") {
          const hospitalValues = values as NewHospital;
          if (!hospitalValues.discharge.date) {
            errors.dischargeDate = requiredError;
          }
          if (!dateRegex.test(hospitalValues.discharge.date)) {
            errors.dischargeDate = formatError;
          }
          if (!hospitalValues.discharge.criteria) {
            errors.criteria = requiredError;
          }
        }

        if (formType === "occupationalHealthcare") {
          const occupatinalValues = values as NewOccupationalHealthcare;
          if (!occupatinalValues.employerName) {
            errors.employerName = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryForm
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            {selectForm()}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface EntryProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void,
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void,
}

const BaseEntryForm = ({ handleChange, setFieldValue, setFieldTouched }: EntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <TypeSelectField
        label="Entry Type"
        name="entryType"
        options={entryTypeOptions}
        onChange={handleChange}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnoses)}
      />
    </>
  );
};

const HealthCheckForm = () => (
  <Field
    label="Health Check Rating"
    name="healthCheckRating"
    component={NumberField}
    min={0}
    max={3}
  />
);

const HospitalForm = () => (
  <>
    <Field
      label="Discharge Date"
      placeholder="YYYY-MM-DD"
      name="dischargeDate"
      component={TextField}
    />
    <Field
      label="Criteria"
      placeholder="Criteria"
      name="criteria"
      component={TextField}
    />
  </>
);

const OccupationalHealthcareForm = () => (
  <>
    <Field
      label="Employer"
      placeholder="Employer Name"
      name="employerName"
      component={TextField}
    />
    <Field
      label="Sick Leave Start Date"
      placeholder="YYYY-MM-DD"
      name="sickStart"
      component={TextField}
    />
    <Field
      label="Sick Leave End Date"
      placeholder="YYYY-MM-DD"
      name="sickEnd"
      component={TextField}
    />
  </>
);
export default AddEntryForm;