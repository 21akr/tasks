import * as express from 'express';
import { CdnService } from '../../services';
import { Repository } from '../../core';

const cdnService = new CdnService();

export async function UploadProfilePictureController(req: express.Request, res: express.Response) {
  // Check if user exists
  const user = await Repository.User().getById(req.user._id);
  if(!user) {
    return res.status(404).send('User Not Found');
  }

  if(user.getProfilePicture()) {
    return res.status(400).send('Profile picture already exists. Update instead!');
  }

  // File upload handling
  let profilePicture: string | null;
  try {
    profilePicture = await cdnService.uploadFile(req, res); // Upload the profile picture
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    return res.status(400).send('Error uploading profile picture');
  }

  try {
    // Update user with new profile picture
    user.buildProfilePicture(profilePicture);
    await Repository.User().update(user);

    return res.status(200).send('Profile picture uploaded successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
