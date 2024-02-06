import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import Button from "../atoms/Button";
import AddIcon from "@mui/icons-material/Add";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { get_all_cloudinary_images } from "@/app/server_actions";

interface MediaLibraryModalProps {
  open: boolean;
  onClose: () => void;
}

const MediaLibraryModal: FunctionComponent<MediaLibraryModalProps> = ({
  open,
  onClose,
}) => {
  const [images, setImages] = useState([]);

  const getAllImages = async () => {
    if (open) {
      const updatedImages = await get_all_cloudinary_images();
      setImages(updatedImages.resources);
    }
  };

  if (images.length === 0) {
    getAllImages();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Media library</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item>
            <CldUploadWidget
              options={{
                folder: "blog-app",
              }}
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(_, { widget }) => {
                widget.close();
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  open();
                }
                return (
                  <Button onClick={handleOnClick}>
                    <AddIcon />
                    Image
                  </Button>
                );
              }}
            </CldUploadWidget>
          </Grid>
          <Grid item xs={12}>
            {images.map((image: any) => {
              return (
                <CldImage
                  width={150}
                  height={150}
                  alt="media"
                  src={image.url}
                />
              );
            })}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button>Select</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediaLibraryModal;
