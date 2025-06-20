
  const { register, handleSubmit, reset, setValue, formState: { errors , isSubmitting}, watch } = useForm({
    defaultValues:{
          defaultValues: {
      aadhaarFileUrl: "",
      panFileUrl: "",
    },
    }
  });


  const aadhaarFile = watch("aadhaarFile")?.[0];
  const panFile = watch("panFile")?.[0];

 
  // Set initial values from props (if any)
  useEffect(() => {
    if (defaultValues) {
      setValue("aadhaarFileUrl", defaultValues.aadhaarFile);
      setValue("panFileUrl", defaultValues.panFile);
  }, [defaultValues, setValue]);

  // Generate preview URL dynamically (without useState)
  const aadhaarPreview = aadhaarFile
    ? URL.createObjectURL(aadhaarFile)
    : defaultValues?.aadhaarFile;

  const panPreview = panFile
    ? URL.createObjectURL(panFile)
    : defaultValues?.panFile;


    
{/* Aadhaar Upload */}
      <div className="mb-4">
        <label className="block font-medium">Aadhaar File:</label>
        {aadhaarPreview && (
          <img
            src={aadhaarPreview}
            alt="Aadhaar Preview"
            className="h-24 mt-2"
          />
        )}
        <input
          type="file"
          accept="image/*,.pdf"
          {...register("aadhaarFile")}
        />
        <input type="hidden" {...register("aadhaarFileUrl")} />
      </div>

      {/* PAN Upload */}
      <div className="mb-4">
        <label className="block font-medium">PAN File:</label>
        {panPreview &&
          (panPreview.endsWith(".pdf") ? (
            <a
              href={panPreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block"
            >
              View PAN PDF
            </a>
          ) : (
            <img src={panPreview} alt="PAN Preview" className="h-24 mt-2" />
          ))}
        <input type="file" accept="image/*,.pdf" {...register("panFile")} />
        <input type="hidden" {...register("panFileUrl")} />
      </div>
