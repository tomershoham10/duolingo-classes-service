import { model, Schema } from 'mongoose';

const organizationSchema: Schema = new Schema<OrganizationType>({
  organization_name: { type: String, required: true },
  country: { type: String, required: true, ref: 'countries' },
});

const OrganizationModel = model<OrganizationType>(
  'organizations',
  organizationSchema
);

export default OrganizationModel;
