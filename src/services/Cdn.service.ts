import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export class CdnService {
  private storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => {
      const fileName = path.parse(file.originalname).name;
      const ext = path.extname(file.originalname);
      cb(null, fileName + '-' + Date.now() + ext);
    },
  });

  private upload = multer({ storage: this.storage });

  public async uploadFile(req: any, res: any): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.upload.single('file')(req, res, (err: any) => {
        if(err) {
          console.error('Error uploading file:', err);
          reject('Internal server error');
        }

        const file = req.file;
        if(!file) {
          reject('No file uploaded');
        }

        resolve(file.filename);
      });
    });
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.join('uploads/', filename);
    fs.unlink(filePath, err => {
      if(err) {
        console.error(`Failed to delete file ${filename}:`, err);
      }
    });
  }
}
