import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY, ctpClientRegistration } from './BuildClientRegistration.ts';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRootRegistration = createApiBuilderFromCtpClient(
  ctpClientRegistration,
).withProjectKey({
  projectKey: PROJECT_KEY,
});
