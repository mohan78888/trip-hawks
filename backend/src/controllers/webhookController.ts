import { Webhook } from 'svix';
import { Request, Response } from 'express';
import { User } from '../models/User.js';

export const clerkWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Please set CLERK_WEBHOOK_SECRET' });
  }

  // Get the headers from the request
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occured -- no svix headers' });
  }

  // We required express.raw() in server.ts to get the unparsed Buffer in req.body
  const payload = req.body.toString('utf8');
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying Clerk webhook:', err);
    return res.status(400).json({ error: 'Error verifying webhook signature' });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`🔔 Webhook received! ID: ${id}, Type: ${eventType}`);

  // Sync user creation to MongoDB
  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      const email = evt.data.email_addresses?.[0]?.email_address || '';
      
      const firstName = evt.data.first_name || '';
      const lastName = evt.data.last_name || '';
      const name = `${firstName} ${lastName}`.trim() || 'Unknown User';

      // Use updateOne with upsert true to handle both creation and updates automatically
      await User.updateOne(
        { clerkId: id },
        { 
          $set: { 
            name, 
            email 
          } 
        },
        { upsert: true }
      );
      
      console.log(`✅ Success: User ${email} synced to MongoDB Data!`);
    } catch (dbError) {
      console.error('❌ Failed to sync user to MongoDB:', dbError);
      return res.status(500).json({ error: 'Failed to sync user to Database' });
    }
  }

  if (eventType === 'user.deleted') {
     try {
       await User.deleteOne({ clerkId: id });
       console.log(`🗑️ Success: User ${id} deleted from MongoDB Data!`);
     } catch (dbError) {
       console.error('❌ Failed to delete user from MongoDB:', dbError);
     }
  }

  return res.status(200).json({ success: true, message: 'Webhook synced' });
};
