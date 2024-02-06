import cloudinary from "../../../../utils/cloudinary";

export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;

   
    const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET || "");
    
    return Response.json({ signature });
  }