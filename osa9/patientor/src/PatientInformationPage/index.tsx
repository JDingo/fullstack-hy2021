import React from "react";
import axios from "axios";

import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { Button, Icon, Segment } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { NewEntry } from "../AddEntryModal/AddEntryForm";

const EntryIcon = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Icon name="hospital" />;
    case "OccupationalHealthcare":
      return <Icon name="doctor" />;
    case "HealthCheck":
      return <Icon name="clipboard check" />;
    default:
      return null;
  }
};

const HealthIcon = ({ entry }: { entry: Entry }) => {
  if (entry.type === "HealthCheck") {
    switch (entry.healthCheckRating) {
      case 0:
        return <Icon color="green" name="heart" />;
      case 1:
        return <Icon color="yellow" name="heart" />;
      case 2:
        return <Icon color="orange" name="heart" />;
      case 3:
        return <Icon color="red" name="heart" />;
      default:
        return <Icon color="black" name="heart" />;
    }
  } else {
    return null;
  }
};

const PatientInformationPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [selectedPatient, setSelectedPatient] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      console.log(values);
      const { data: newEntry } = await axios.post<NewEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const newPatient = selectedPatient as Patient;
      const entry = newEntry as Entry;
      newPatient.entries.push(entry);

      dispatch(updatePatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatientData = async (): Promise<Patient | undefined> => {
      try {
        const { data: fetchedPatientList } = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
        return fetchedPatientList[0];
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
      }
    };

    if (!patients[id]?.ssn) {
      fetchPatientData().then(patient => {
        if (!patient) {
          setSelectedPatient(patient);
        } else {
          setSelectedPatient(patient);
          dispatch(updatePatient(patient));
        }
      }).catch((e) => {
        console.error(e.response?.data);
      });
    } else {
      setSelectedPatient(patients[id]);
    }
  }, []);

  if (!selectedPatient) {
    return (
      <div className="App">
        <h2>Not Found</h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h2>
          {selectedPatient.name} <Icon name={selectedPatient.gender === "male" ? 'mars' : 'venus'} />
        </h2>
        <div>
          ssn: {selectedPatient.ssn} <br />
          occupation: {selectedPatient.occupation}
        </div>
        <h3>Entries</h3>
        <Segment>
          {selectedPatient.entries.map(entry => {

            return (
              <div key={entry.date}>
                <h4>{entry.date} <EntryIcon entry={entry} /> </h4>
                {entry.description}
                <ul>
                  {entry.diagnosisCodes?.map(diagnosis => {
                    return (<li key={diagnosis}>
                      {diagnosis} {diagnoses[diagnosis].name}
                    </li>
                    );
                  })}
                </ul>
                <HealthIcon entry={entry} />
              </div>);
          }
          )}
        </Segment>
        <AddEntryModal 
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    );
  }
};

export default PatientInformationPage;