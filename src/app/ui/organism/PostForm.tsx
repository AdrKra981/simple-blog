"use client";
import { BlogPost, PostFormValues, Tags } from "@/app/types/BlogPost";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FunctionComponent } from "react";
import FormInput from "../atoms/FormInput";
import TextEditor from "../molecules/TextEditor";
import { Grid } from "@mui/material";
import Button from "../atoms/Button";
import FormMultipleSelect from "../atoms/FormMultipleSelect";
import { useSelector } from "react-redux";

interface PostFormProps {
  handleSubmit: (values: Omit<BlogPost, "_id">) => void;
}

const PostForm: FunctionComponent<PostFormProps> = ({ handleSubmit }) => {
  const { currentUser } = useSelector((state: any) => state.users);

  const BlogPostCreateValidationSchema = Yup.object().shape({
    title: Yup.string().required("Post title is required"),
    content: Yup.string().required("Content of the post is required"),
    tags: Yup.array().min(1, "You should choose min. one tag!"),
  });

  const onSubmit = (values: PostFormValues) => {
    handleSubmit({ ...values, author: currentUser.username });
  };

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        meta_description: "",
        tags: [],
      }}
      validationSchema={BlogPostCreateValidationSchema}
      onSubmit={onSubmit}
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
                  <FormMultipleSelect
                    label="Tags"
                    handleChange={handleChange}
                    values={values.tags}
                    id="tags"
                    name="tags"
                    options={Tags}
                    fullWidth
                    error={Boolean(errors.tags && touched.tags)}
                    helperText={touched.tags && errors.tags}
                  />
                </Grid>
                <Grid xs={6} item>
                  <TextEditor
                    id="content"
                    error={Boolean(errors.content && touched.content)}
                    helperText={touched.content && errors.content}
                  />
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
