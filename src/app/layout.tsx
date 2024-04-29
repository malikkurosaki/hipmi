import MqttLoader from '@/util/mqtt_loader';
import RootStyleRegistry from './emotion';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootStyleRegistry>
      <MqttLoader />
      {children}</RootStyleRegistry>
  );
}
