import * as express from 'express';
import { CdnService } from '../../services';
import { Repository } from '../../core';

const cdnService = new CdnService();

export async function DeleteProfilePictureController(req: express.Request, res: express.Response) {
  const user = await Repository.User().getById(req.user._id);
  if(!user) {
    return res.status(404).send('User Not Found');
  }

  const oldPicture = user.getProfilePicture();

  if(oldPicture) {
    try {
      await cdnService.deleteFile(oldPicture);

      user.buildProfilePicture(null);
      await Repository.User().update(user);

      return res.status(200).send('Profile picture deleted successfully');
    } catch (err) {
      console.error('Error deleting profile picture:', err);
      return res.status(500).send('Error deleting profile picture');
    }
  } else {
    return res.status(400).send('No profile picture to delete');
  }
}
