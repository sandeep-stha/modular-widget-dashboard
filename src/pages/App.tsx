import { getReport, scan } from 'react-scan';

import { useDisableDevTools } from '@/shared/hooks';
import { Layout } from '@/shared/layouts';

scan({
  enabled: import.meta.env.DEV,
  log: true,
  trackUnnecessaryRenders: true,
});

getReport();

function App() {
  useDisableDevTools();

  return <Layout />;
}

export default App;
