import * as express from 'express';
import { CdnService } from '../../services';
import { Repository } from '../../core';

const cdnService = new CdnService();

export async function UpdateProfilePictureController(req: express.Request, res: express.Response) {
  const user = await Repository.User().getById(req.user._id);
  if(!user) {
    return res.status(404).send('User Not Found');
  }

  const oldPicture = user.getProfilePicture();
  let newProfilePicture: string | null;

  if(oldPicture) {
    try {
      await cdnService.deleteFile(oldPicture);
    } catch (err) {
      console.error('Error deleting old profile picture:', err);
      return res.status(500).send('Error deleting old profile picture');
    }
  }

  try {
    newProfilePicture = await cdnService.uploadFile(req, res);
  } catch (err) {
    console.error('Error uploading new profile picture:', err);
    return res.status(400).send('Error uploading new profile picture');
  }

  try {
    user.buildProfilePicture(newProfilePicture);
    await Repository.User().update(user);

    return res.status(200).send('Profile picture updated successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
