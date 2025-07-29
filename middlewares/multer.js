const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Sanitize name for safe file naming
const sanitizeFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Brand logo storage configuration
const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/brands');
        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const brandName = req.body.name ? sanitizeFileName(req.body.name) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `brand-${brandName}-${uniqueSuffix}`);
    },
});

// User profile image storage configuration
const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/users');
        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const username = req.body.username ? sanitizeFileName(req.body.username) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `user-${username}-${uniqueSuffix}`);
    },
});

// Organization logo storage configuration
const organizationStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/organizations');
        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const orgName = req.body.name ? sanitizeFileName(req.body.name) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `organization-${orgName}-${uniqueSuffix}`);
    },
});

// Instrument picture storage configuration
const instrumentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/instruments');
        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const instrumentNumber = req.body.number ? sanitizeFileName(req.body.number) : 'unknown';
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, `instrument-${instrumentNumber}-${uniqueSuffix}`);
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

    multerSingle(req, res, (err) => {
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

    multerSingle(req, res, (err) => {
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

    multerSingle(req, res, (err) => {
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

    multerSingle(req, res, (err) => {
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
        next();
    });
};

module.exports = { uploadBrandLogo, uploadUserProfileImage, uploadOrganizationLogo, uploadInstrumentPicture };