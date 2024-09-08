import * as express from 'express';
import { CdnService } from '../../services';
import { Repository } from '../../core';

const cdnService = new CdnService();

export async function UploadProfilePictureController(req: express.Request, res: express.Response) {
  const user = await Repository.User().getById(req.user._id);
  if(!user) {
    return res.status(404).send('User Not Found');
  }

  if(user.getProfilePicture()) {
    return res.status(400).send('Profile picture already exists. Update instead!');
  }

  let profilePicture: string | null;
  try {
    profilePicture = await cdnService.uploadFile(req, res);
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    return res.status(400).send('Error uploading profile picture');
  }

  try {
    user.buildProfilePicture(profilePicture);
    await Repository.User().update(user);

    return res.status(200).send('Profile picture uploaded successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
