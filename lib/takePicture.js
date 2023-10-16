 //function to request access to user's camera:
  
 const handleCaptureImage = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");

      video.srcObject = mediaStream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImageUrl = canvas.toDataURL("image/jpeg");

      setCapturedImage(capturedImageUrl);
      
      // Stop capturing and close the camera
      mediaStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };