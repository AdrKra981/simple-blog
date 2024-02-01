"use client";
import { Categories, PostFormValues } from "@/app/types/BlogPost";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FunctionComponent } from "react";
import FormInput from "../atoms/FormInput";
import TextEditor from "../molecules/TextEditor";
import { Grid } from "@mui/material";
import Button from "../atoms/Button";

interface PostFormProps {
  handleSubmit: (values: PostFormValues) => void;
}

const PostForm: FunctionComponent<PostFormProps> = ({ handleSubmit }) => {
  const BlogPostCreateValidationSchema = Yup.object().shape({
    title: Yup.string().required("Post title is required"),
    content: Yup.string().required("Content of the post is required"),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        meta_description: "",
        category: Categories.Programming,
      }}
      validationSchema={BlogPostCreateValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange }) => {
        return (
          <div className="flex w-full my-8">
            <Form style={{ width: "100%" }}>
              <Grid container spacing={8}>
                <Grid xs={6} item>
                  <FormInput
                    label="Post title"
                    fullWidth
                    margin="dense"
                    variant="filled"
                    id="title"
                    error={Boolean(errors.title && touched.title)}
                    helperText={touched.title && errors.title}
                    value={values.title}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Meta description"
                    fullWidth
                    margin="dense"
                    variant="filled"
                    id="meta_description"
                    error={Boolean(
                      errors.meta_description && touched.meta_description
                    )}
                    helperText={
                      touched.meta_description && errors.meta_description
                    }
                    value={values.meta_description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid xs={6} item>
                  <TextEditor />
                </Grid>
              </Grid>
              <Button type="submit">Create Post</Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default PostForm;
