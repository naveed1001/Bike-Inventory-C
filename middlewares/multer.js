const multer = require('multer');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multerS3 = require('multer-s3');
const path = require('path');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Sanitize name for safe file naming
const sanitizeFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Generate pre-signed URL for an S3 object
const generatePresignedUrl = async (bucket, key) => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        return await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL expires in 1 hour
    } catch (error) {
        console.error(`Failed to generate pre-signed URL for ${key}:`, error);
        throw new Error('Failed to generate pre-signed URL');
    }
};

// Brand logo storage configuration
const brandStorage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const brandName = req.body.name ? sanitizeFileName(req.body.name) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `brands/brand-${brandName}-${uniqueSuffix}`);
    },
});

// User profile image storage configuration
const userStorage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const username = req.body.username ? sanitizeFileName(req.body.username) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `users/user-${username}-${uniqueSuffix}`);
    },
});

// Organization logo storage configuration
const organizationStorage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const orgName = req.body.name ? sanitizeFileName(req.body.name) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `organizations/organization-${orgName}-${uniqueSuffix}`);
    },
});

// Instrument picture storage configuration
const instrumentStorage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const instrumentNumber = req.body.number ? sanitizeFileName(req.body.number) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `instruments/instrument-${instrumentNumber}-${uniqueSuffix}`);
    },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only PNG, JPEG, and JPG files are allowed'), false);
};

// Multer instance for brand logo uploads (single file only)
const uploadBrandLogo = (req, res, next) => {
    const multerSingle = multer({
        storage: brandStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: fileFilter,
    }).single('logo');

    multerSingle(req, res, async (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Only one logo file is allowed',
            });
        }
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        // Generate pre-signed URL if a file was uploaded
        if (req.file) {
            try {
                req.file.presignedUrl = await generatePresignedUrl(process.env.AWS_S3_BUCKET, req.file.key);
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    code: 500,
                    message: 'Failed to generate pre-signed URL',
                });
            }
        }
        next();
    });
};

// Multer instance for user profile image uploads (single file only)
const uploadUserProfileImage = (req, res, next) => {
    const multerSingle = multer({
        storage: userStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: fileFilter,
    }).single('profile_image');

    multerSingle(req, res, async (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Only one profile image file is allowed',
            });
        }
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        // Generate pre-signed URL if a file was uploaded
        if (req.file) {
            try {
                req.file.presignedUrl = await generatePresignedUrl(process.env.AWS_S3_BUCKET, req.file.key);
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    code: 500,
                    message: 'Failed to generate pre-signed URL',
                });
            }
        }
        next();
    });
};

// Multer instance for organization logo uploads (single file only)
const uploadOrganizationLogo = (req, res, next) => {
    const multerSingle = multer({
        storage: organizationStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: fileFilter,
    }).single('logo');

    multerSingle(req, res, async (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Only one logo file is allowed',
            });
        }
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        // Generate pre-signed URL if a file was uploaded
        if (req.file) {
            try {
                req.file.presignedUrl = await generatePresignedUrl(process.env.AWS_S3_BUCKET, req.file.key);
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    code: 500,
                    message: 'Failed to generate pre-signed URL',
                });
            }
        }
        next();
    });
};

// Multer instance for instrument picture uploads (single file only)
const uploadInstrumentPicture = (req, res, next) => {
    const multerSingle = multer({
        storage: instrumentStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: fileFilter,
    }).single('picture');

    multerSingle(req, res, async (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Only one picture file is allowed',
            });
        }
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        // Generate pre-signed URL if a file was uploaded
        if (req.file) {
            try {
                req.file.presignedUrl = await generatePresignedUrl(process.env.AWS_S3_BUCKET, req.file.key);
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    code: 500,
                    message: 'Failed to generate pre-signed URL',
                });
            }
        }
        next();
    });
};

module.exports = { uploadBrandLogo, uploadUserProfileImage, uploadOrganizationLogo, uploadInstrumentPicture };