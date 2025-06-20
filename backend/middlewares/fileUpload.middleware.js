//     import multer from 'multer';

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   // Accept only PDFs or images (adjust as needed)
//   if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF or image files are allowed'), false);
//   }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit, adjust as needed
// });

// export const uploadAadhaarAndPan = upload.fields([
//   { name: 'aadhaarFile', maxCount: 1 },
//   { name: 'panFile', maxCount: 1 },
// ]);

export const fileSizeCheckMiddleware = (req, res, next) => {
  // multer limits file size automatically, but let's double check or add custom logic if needed
  const aadhaar = req.files?.aadhaarFile?.[0];
  const pan = req.files?.panFile?.[0];

  if (!aadhaar || !pan) {
    return res.status(400).json({ message: 'Both Aadhaar and PAN files are required' });
  }

  // Example: Custom check, if you want to enforce stricter size than multer
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (aadhaar.size > maxSize) {
    return res.status(400).json({ message: 'Aadhaar file size exceeds 5MB limit' });
  }
  if (pan.size > maxSize) {
    return res.status(400).json({ message: 'PAN file size exceeds 5MB limit' });
  }
  next();
};

import multer from 'multer';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype.startsWith('image/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});

// Common upload middleware
export const uploadAadhaarAndPan = upload.fields([
  { name: 'aadhaarFile', maxCount: 1 },
  { name: 'panFile', maxCount: 1 },
]);

// File size and presence checker
export const validateFiles = ({ requireBoth = false } = {}) => {
  return (req, res, next) => {
    const aadhaar = req.files?.aadhaarFile?.[0];
    const pan = req.files?.panFile?.[0];

    if (requireBoth && (!aadhaar || !pan)) {
      return res.status(400).json({ message: 'Both Aadhaar and PAN files are required' });
    }

    if (aadhaar && aadhaar.size > MAX_SIZE) {
      return res.status(400).json({ message: 'Aadhaar file size exceeds 5MB limit' });
    }

    if (pan && pan.size > MAX_SIZE) {
      return res.status(400).json({ message: 'PAN file size exceeds 5MB limit' });
    }

    next();
  };
};


export const uploadImagesMiddleware = upload.fields([
  { name: 'images', maxCount: 10 }, // field name must match the one sent from frontend
]);
