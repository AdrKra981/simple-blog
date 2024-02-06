'use server'

import cloudinary from "../../utils/cloudinary";

export async function get_all_cloudinary_images() {
    "use server";
    try {
      return cloudinary.v2.api.resources(
        {
          type: "upload",
          prefix: "blog-app",
        },
        (err, result) => {
          if (err) {
            throw new Error(err);
          }
  
          return result.resources;
        }
      )
    } catch (error) {
      console.log("error", error);
    }
  }
  