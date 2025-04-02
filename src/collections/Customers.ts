import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: false, // Since authentication is handled by Clerk
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => !!req.user, // Only allow authenticated users
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'clerkId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
