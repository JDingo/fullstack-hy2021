import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import ReviewForm from "./ReviewForm";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .max(100, "Rating must be between 0 to 100")
    .min(0, "Rating must be between 0 to 100"),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, text } = values;
    console.log({
      repositoryOwnerName,
      repositoryName,
      rating,
      text,
    });

    try {
      const data = await createReview({
        repositoryOwnerName,
        repositoryName,
        rating: parseInt(rating),
        text,
      });

      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}></ReviewForm>}
    </Formik>
  );
};

export default CreateReview;
