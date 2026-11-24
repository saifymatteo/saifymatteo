import { withPayload } from '@payloadcms/next/withPayload';

export default withPayload({
  // Separate app; never shares the portfolio's .next output. Standalone
  // output is what the production Docker image runs (see Dockerfile).
  output: 'standalone',
});
